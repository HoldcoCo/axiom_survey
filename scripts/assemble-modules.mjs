/**
 * Assembles modular component/screen files from App.tsx line slices.
 * Run: node scripts/assemble-modules.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const app = fs
  .readFileSync(path.join(root, "src/App.tsx"), "utf8")
  .split(/\r?\n/);

function slice(a, b) {
  return app.slice(a - 1, b).join("\n");
}

function write(rel, content) {
  const p = path.join(root, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content.replace(/\r\n/g, "\n"));
  console.log("wrote", rel);
}

write(
  "src/components/icons/iconColors.ts",
  `/** Background/stroke pairs for IconShape names. */\n${slice(1852, 1893).replace(/^const ICON_COLORS/, "export const ICON_COLORS")}\n`,
);

write(
  "src/components/icons/iconPaths.tsx",
  `import React from "react";\n\n/** SVG path fragments keyed by option/icon name. */\n${slice(1895, 2183).replace(/^const ICON_PATHS/, "export const ICON_PATHS")}\n`,
);

write(
  "src/components/icons/IconShape.tsx",
  `import React from "react";
import { ICON_COLORS } from "./iconColors";
import { ICON_PATHS } from "./iconPaths";

/** Colored rounded square with a stroke SVG icon inside. */
export default function IconShape({ name, size = 48 }: { name: string; size?: number }) {
  const colors = ICON_COLORS[name] ?? { bg: "#F1F5F9", stroke: "#64748B" };
  const paths = ICON_PATHS[name];
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.29,
        flexShrink: 0,
        background: colors.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        width={size * 0.52}
        height={size * 0.52}
        viewBox="0 0 24 24"
        fill="none"
        stroke={colors.stroke}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {paths}
      </svg>
    </div>
  );
}
`,
);

write(
  "src/components/layout/LogoPair.tsx",
  `import React from "react";
import axiomLogo from "@/assets/Axiom_erp_.png";
import holdcoLogo from "@/assets/Holdco_corp_logo.png";
import { BORDER } from "@/theme/tokens";

/** Holdco + Axiom logos side by side with a divider. */
export default function LogoPair({
  height = 34,
  invert = false,
}: {
  height?: number;
  invert?: boolean;
}) {
  const filter = invert ? "brightness(0) invert(1)" : undefined;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <img
        src={holdcoLogo}
        alt="Holdco Corp"
        style={{ height, width: "auto", objectFit: "contain", filter }}
      />
      <div
        style={{
          width: 1,
          height: height * 0.85,
          background: invert ? "rgba(255,255,255,0.25)" : BORDER,
        }}
      />
      <img
        src={axiomLogo}
        alt="Axiom ERP"
        style={{
          height: height * 0.82,
          width: "auto",
          objectFit: "contain",
          filter,
        }}
      />
    </div>
  );
}
`,
);

write(
  "src/components/layout/TopBanner.tsx",
  `import React from "react";
import holdcoLogo from "@/assets/Holdco_corp_logo.png";
import { inner } from "@/theme/styles";
import { BORDER, CARD, T3 } from "@/theme/tokens";

/** Compact header with Holdco logo and a subtitle. */
export default function TopBanner({
  subtitle,
  fontFamily,
}: {
  subtitle: string;
  fontFamily?: string;
}) {
  return (
    <div
      style={{
        background: CARD,
        padding: "20px 24px 18px",
        flexShrink: 0,
        borderBottom: \`1px solid \${BORDER}\`,
      }}
    >
      <div style={{ ...inner, display: "flex", justifyContent: "center" }}>
        <img
          src={holdcoLogo}
          alt="Holdco Corp"
          style={{ height: 34, width: "auto", objectFit: "contain" }}
        />
      </div>
      <p
        style={{
          color: T3,
          fontSize: 13,
          marginTop: 10,
          textAlign: "center",
          fontFamily: fontFamily ?? "'Inter', sans-serif",
        }}
      >
        {subtitle}
      </p>
    </div>
  );
}
`,
);

/**
 * @param {string} rel
 * @param {string} fnName
 * @param {number} start
 * @param {number} end
 * @param {string} header
 */
function wrapFn(rel, fnName, start, end, header) {
  let body = slice(start, end);
  body = body.replace(/^\/\/ ─+[^\n]*\n+/gm, "");
  body = body.replace(
    new RegExp(`^(function ${fnName})\\b`, "m"),
    "export default $1",
  );
  // Also export interfaces that precede ReportScreen
  body = body.replace(/^interface ReportProps\b/m, "export interface ReportProps");
  write(rel, `${header}\n${body}\n`);
}

const commonUi = `import React, { useEffect, useState } from "react";
import type { Lang, LeadFormData, Option, QuestionData, AnswerMap } from "@/types";
import { UI } from "@/i18n";
import { getQuestions } from "@/data";
import { getLevel } from "@/lib/scoring";
import { hexRgba } from "@/theme/utils";
import { ws, inner, innerWide } from "@/theme/styles";
import { NAVY, TEAL, PAGE, CARD, BORDER, T1, T2, T3, fontFor } from "@/theme/tokens";
import { useIsTablet } from "@/hooks/useIsTablet";
import IconShape from "@/components/icons/IconShape";
import LogoPair from "@/components/layout/LogoPair";
import TopBanner from "@/components/layout/TopBanner";
import { COUNTRIES } from "@/data/countries";
`;

wrapFn(
  "src/components/ui/OptionCard.tsx",
  "OptionCard",
  2219,
  2351,
  `import React from "react";
import type { Lang, Option } from "@/types";
import { BORDER, CARD, T1, TEAL } from "@/theme/tokens";
import IconShape from "@/components/icons/IconShape";
`,
);

wrapFn(
  "src/components/ui/ProgressBar.tsx",
  "ProgressBar",
  2353,
  2463,
  `import React from "react";
import type { Lang } from "@/types";
import { BORDER, CARD, NAVY, T1, T2, T3, TEAL } from "@/theme/tokens";
`,
);

wrapFn(
  "src/components/ui/PhoneInput.tsx",
  "PhoneInput",
  2913,
  3131,
  `import React, { useState } from "react";
import type { Lang } from "@/types";
import { COUNTRIES } from "@/data/countries";
import { BORDER, CARD, PAGE, T1, T3, TEAL } from "@/theme/tokens";
`,
);

wrapFn(
  "src/screens/HookScreen.tsx",
  "HookScreen",
  639,
  1213,
  commonUi,
);

wrapFn(
  "src/screens/LangScreen.tsx",
  "LangScreen",
  1215,
  1659,
  commonUi,
);

wrapFn(
  "src/screens/QuestionScreen.tsx",
  "QuestionScreen",
  2465,
  2878,
  `${commonUi}
import OptionCard from "@/components/ui/OptionCard";
import ProgressBar from "@/components/ui/ProgressBar";
`,
);

wrapFn(
  "src/screens/FormScreen.tsx",
  "FormScreen",
  3135,
  3660,
  `${commonUi}
import ProgressBar from "@/components/ui/ProgressBar";
import PhoneInput from "@/components/ui/PhoneInput";
`,
);

wrapFn(
  "src/screens/LoadingScreen.tsx",
  "LoadingScreen",
  3664,
  3846,
  commonUi,
);

wrapFn(
  "src/screens/RevealScreen.tsx",
  "RevealScreen",
  3850,
  4489,
  commonUi,
);

wrapFn(
  "src/screens/ReportScreen.tsx",
  "ReportScreen",
  4493,
  5716,
  commonUi,
);

console.log("assemble complete");
