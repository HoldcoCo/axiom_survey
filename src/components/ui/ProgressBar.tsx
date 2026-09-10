import React from "react";
import type { Lang } from "@/types";
import { inner } from "@/theme/styles";
import { BORDER, CARD, T1, T2, TEAL } from "@/theme/tokens";

export default function ProgressBar({
  step,
  label,
  lang,
  onBack,
}: {
  step: number;
  label: string;
  lang: Lang;
  onBack: () => void;
}) {
  const pct = Math.round((step / 7) * 100);
  const backPath = lang === "ar" ? "M7 4.5L12 9L7 13.5" : "M11 4.5L6 9L11 13.5";
  const ff = lang === "ar" ? "'Cairo', sans-serif" : "'Inter', sans-serif";
  const milestones = [1, 2, 3, 4, 5, 6, 7];
  return (
    <div style={{ ...inner, padding: "18px 20px 0" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 12,
        }}
      >
        <button
          type="button"
          onClick={onBack}
          aria-label={lang === "ar" ? "رجوع" : "Back"}
          style={{
            width: 38,
            height: 38,
            borderRadius: 12,
            border: `1.5px solid ${BORDER}`,
            background: CARD,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            outline: "none",
            transition: "box-shadow 0.15s",
          }}
        >
          <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
            <path
              d={backPath}
              stroke={T1}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <span
              style={{
                fontSize: 12,
                color: T2,
                fontWeight: 600,
                fontFamily: ff,
              }}
            >
              {label}
            </span>
            <span
              style={{
                fontSize: 18,
                fontWeight: 900,
                color: TEAL,
                fontFamily: ff,
                background: "#EEF9F8",
                padding: "2px 10px",
                borderRadius: 999,
                lineHeight: 1.4,
              }}
            >
              {pct}%
            </span>
          </div>
          {/* Segmented dot progress */}
          <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
            {milestones.map((s) => (
              <div
                key={s}
                style={{
                  flex: 1,
                  height: 5,
                  borderRadius: 999,
                  background: s <= step ? TEAL : "#E4E9F0",
                  transition: "background 0.3s ease",
                  boxShadow:
                    s === step ? `0 0 0 2px rgba(13,148,136,0.2)` : "none",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Question Screen ───────────────────────────────────────────────────────────
