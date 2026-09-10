import React from "react";
import type { Lang, Option } from "@/types";
import { BORDER, CARD, T1, TEAL } from "@/theme/tokens";
import IconShape from "@/components/icons/IconShape";

export default function OptionCard({
  opt,
  selected,
  lang,
  isMulti,
  onClick,
}: {
  opt: Option;
  selected: boolean;
  lang: Lang;
  isMulti: boolean;
  onClick: () => void;
}) {
  const selColor = opt.isNone ? "#16A34A" : TEAL;
  const selBg = opt.isNone ? "#F0FFF4" : "#EEF9F8";
  const selBorder = opt.isNone ? "#86EFAC" : "#5EEAD4";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`option-card${selected ? " selected" : ""}`}
      aria-pressed={selected}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "14px 16px",
        borderRadius: 18,
        background: selected ? selBg : CARD,
        border: `2px solid ${selected ? selBorder : BORDER}`,
        boxShadow: selected
          ? `0 4px 18px rgba(13,148,136,0.15), inset 0 0 0 1px ${selBorder}`
          : "0 1px 6px rgba(27,44,75,0.06)",
        cursor: "pointer",
        fontFamily:
          lang === "ar" ? "'Cairo', sans-serif" : "'Inter', sans-serif",
        outline: "none",
        textAlign: lang === "ar" ? "right" : "left",
      }}
    >
      {/* Icon */}
      <div
        style={{
          transform: selected ? "scale(1.08)" : "scale(1)",
          transition: "transform 0.2s",
          boxShadow: selected ? `0 0 0 3px rgba(13,148,136,0.12)` : "none",
          borderRadius: 14,
          flexShrink: 0,
        }}
      >
        <IconShape name={opt.emoji} size={48} />
      </div>

      <span
        style={{
          flex: 1,
          fontWeight: selected ? 700 : 500,
          fontSize: 14,
          color: selected ? "#0F766E" : T1,
          lineHeight: 1.45,
        }}
      >
        {opt.label}
      </span>

      {/* Checkbox (multi) or Radio (single) */}
      {isMulti ? (
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: 7,
            flexShrink: 0,
            background: selected ? selColor : "transparent",
            border: `2px solid ${selected ? selColor : "#D1D9E6"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s",
            boxShadow: selected ? `0 2px 8px rgba(13,148,136,0.3)` : "none",
          }}
        >
          {selected && (
            <svg
              width="11"
              height="9"
              viewBox="0 0 11 9"
              fill="none"
              className="bounce-in"
            >
              <path
                d="M1 4.5L4 7.5L10 1"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      ) : (
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: "50%",
            flexShrink: 0,
            background: "transparent",
            border: `2px solid ${selected ? selColor : "#D1D9E6"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s",
            boxShadow: selected ? `0 2px 8px rgba(13,148,136,0.3)` : "none",
          }}
        >
          {selected && (
            <div
              className="bounce-in"
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: selColor,
              }}
            />
          )}
        </div>
      )}
    </button>
  );
}

// ── Progress Bar ──────────────────────────────────────────────────────────────
