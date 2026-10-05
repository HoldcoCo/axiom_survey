import React from "react";
import LogoPair from "@/components/layout/LogoPair";
import { inner } from "@/theme/styles";
import { BORDER, CARD, T3 } from "@/theme/tokens";

/** Compact header with Holdco + Axiom logos and a subtitle. */
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
        padding: "14px 20px 13px",
        flexShrink: 0,
        borderBottom: `1px solid ${BORDER}`,
      }}
    >
      <div style={{ ...inner, display: "flex", justifyContent: "flex-start" }}>
        <LogoPair height={34} />
      </div>
      {subtitle ? (
        <p
          style={{
            ...inner,
            color: T3,
            fontSize: 11,
            marginTop: 7,
            textAlign: "left",
            fontFamily: fontFamily ?? "'Inter', sans-serif",
            letterSpacing: 0.2,
          }}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
