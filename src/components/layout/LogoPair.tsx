import React from "react";
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
