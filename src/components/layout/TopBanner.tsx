import React from "react";
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
        borderBottom: `1px solid ${BORDER}`,
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
