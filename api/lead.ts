/**
 * Vercel serverless function: Digital Health Check → ERPNext Lead + Opportunity.
 * Credentials stay server-side (ERPNEXT_* / FRAPPE_*).
 */
import type { VercelRequest, VercelResponse } from "@vercel/node";

/** Lazy-imported handler — defers module loading into the try-catch. */
let _handleLeadRequest: typeof import("../server/erpnextLead").handleLeadRequest | null = null;

async function getHandler(): Promise<typeof import("../server/erpnextLead").handleLeadRequest> {
  if (_handleLeadRequest === null) {
    const mod = await import("../server/erpnextLead");
    _handleLeadRequest = mod.handleLeadRequest;
  }
  return _handleLeadRequest;
}

/** Simple in-memory rate limit: max N requests per IP per window. */
const RATE_LIMIT_MAX = 8;
const RATE_LIMIT_WINDOW_MS = 60_000;
const hits = new Map<string, number[]>();

/**
 * Returns true if this IP is within the rate limit.
 * @param ip - Client IP
 */
function allowRequest(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  if (recent.length >= RATE_LIMIT_MAX) {
    hits.set(ip, recent);
    return false;
  }
  recent.push(now);
  hits.set(ip, recent);
  return true;
}

/**
 * Resolves client IP from common proxy headers.
 */
function clientIp(req: VercelRequest): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }
  if (Array.isArray(forwarded) && forwarded[0]) {
    return forwarded[0];
  }
  return req.socket?.remoteAddress ?? "unknown";
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "method" });
    return;
  }

  const ip = clientIp(req);
  if (!allowRequest(ip)) {
    res.status(429).json({ ok: false, error: "rate_limit" });
    return;
  }

  try {
    const handleLeadRequest = await getHandler();
    const result = await handleLeadRequest(req.body);
    res.status(result.status).json(result.body);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    const stack = err instanceof Error ? err.stack : undefined;
    console.error("[api/lead] Unhandled error", message, stack);
    res.status(502).json({ ok: false, error: "upstream", detail: message });
  }
}
