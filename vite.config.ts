/**
 * Production Vite config for Vercel hosting, plus a local /api/lead proxy
 * so Digital Health Check submissions work in `vite` the same way they do on Vercel.
 */
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "node:fs";
import path from "node:path";
import type { IncomingMessage, ServerResponse } from "node:http";
import { handleLeadRequest } from "./server/erpnextLead";

const SERVER_ENV_KEYS = [
  "ERPNEXT_BASE_URL",
  "ERPNEXT_API_KEY",
  "ERPNEXT_API_SECRET",
  "ERPNEXT_LEAD_SOURCE",
  "ERPNEXT_COMPANY",
  "ERPNEXT_OPPORTUNITY_TYPE",
  "FRAPPE_URL",
  "FRAPPE_API_KEY",
  "FRAPPE_API_SECRET",
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "SMTP_FROM",
  "SMTP_FROM_NAME",
  "VITE_BOOKING_URL",
] as const;

/**
 * Minimal .env parser. Vite 8's loadEnv uses node:util parseEnv, which
 * treats a blank line plus comments as part of the next key name, so
 * ERPNEXT_BASE_URL / SMTP_HOST never land in process.env.
 */
function parseDotEnv(content: string): Record<string, string> {
  const parsed: Record<string, string> = {};
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (line.length === 0 || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq <= 0) continue;
    const key = line.slice(0, eq).trim();
    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(key)) continue;
    let value = line.slice(eq + 1).trim();
    if (!value.startsWith('"') && !value.startsWith("'")) {
      const commentAt = value.indexOf("#");
      if (commentAt >= 0) value = value.slice(0, commentAt).trimEnd();
    }
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    parsed[key] = value;
  }
  return parsed;
}

/** Reads `.env`, `.env.local`, and mode-specific files from envDir. */
function loadServerEnvFiles(
  envDir: string,
  mode: string,
): Record<string, string> {
  const files = [
    ".env",
    ".env.local",
    `.env.${mode}`,
    `.env.${mode}.local`,
  ];
  const merged: Record<string, string> = {};
  for (const file of files) {
    const filePath = path.join(envDir, file);
    if (!fs.existsSync(filePath)) continue;
    Object.assign(merged, parseDotEnv(fs.readFileSync(filePath, "utf8")));
  }
  return merged;
}

/**
 * Copies server-only .env values into process.env for the local API route.
 * @param env - Parsed .env values
 */
function applyServerEnv(env: Record<string, string>): void {
  for (const key of SERVER_ENV_KEYS) {
    const value = env[key];
    if (typeof value === "string" && value.trim().length > 0) {
      process.env[key] = value.trim();
    }
  }
}

function readRequestBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk: Buffer) => {
      chunks.push(chunk);
    });
    req.on("end", () => {
      resolve(Buffer.concat(chunks).toString("utf8"));
    });
    req.on("error", reject);
  });
}

/** Local dev middleware that mirrors the Vercel /api/lead serverless route. */
function leadApiDevPlugin(): Plugin {
  return {
    name: "lead-api-dev",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const urlPath = req.url?.split("?")[0];
        if (urlPath !== "/api/lead") {
          next();
          return;
        }

        const response = res as ServerResponse;

        if (req.method === "OPTIONS") {
          response.statusCode = 204;
          response.end();
          return;
        }

        if (req.method !== "POST") {
          response.statusCode = 405;
          response.setHeader("Content-Type", "application/json");
          response.end(JSON.stringify({ ok: false, error: "method" }));
          return;
        }

        try {
          const rawBody = await readRequestBody(req);
          const parsedBody: unknown =
            rawBody.length > 0 ? (JSON.parse(rawBody) as unknown) : {};
          const result = await handleLeadRequest(parsedBody);
          response.statusCode = result.status;
          response.setHeader("Content-Type", "application/json");
          response.end(JSON.stringify(result.body));
        } catch (err) {
          console.error("[api/lead] Dev middleware error", err);
          response.statusCode = 502;
          response.setHeader("Content-Type", "application/json");
          response.end(JSON.stringify({ ok: false, error: "upstream" }));
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const isDev = mode === "development";
  const envDir = path.resolve(__dirname);
  applyServerEnv(loadServerEnvFiles(envDir, mode));

  return {
    base: "/",
    build: {
      sourcemap: isDev,
      minify: !isDev,
    },
    plugins: [react(), tailwindcss(), leadApiDevPlugin()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      host: process.env.FIGMA_DEV_SERVER_HOST || "0.0.0.0",
      port: parseInt(process.env.PORT || "8443", 10),
      strictPort: true,
      watch: { ignored: ["**/.figma/**"] },
    },
    preview: {
      host: process.env.FIGMA_DEV_SERVER_HOST || "0.0.0.0",
      port: parseInt(process.env.PORT || "8443", 10),
    },
    test: {
      environment: "node",
      include: ["src/**/*.test.ts"],
    },
  };
});
