import React from "react";
import type { Lang, QuestionData } from "@/types";
import { UI } from "@/i18n";
import OptionCard from "@/components/ui/OptionCard";
import ProgressBar from "@/components/ui/ProgressBar";
import LogoPair from "@/components/layout/LogoPair";
import { useIsTablet } from "@/hooks/useIsTablet";
import { ws, inner } from "@/theme/styles";
import { BORDER, CARD, NAVY, PAGE, T1, T2, T3, TEAL } from "@/theme/tokens";

export default function QuestionScreen({
  step,
  question,
  selected,
  otherText,
  lang,
  onSelect,
  onOtherText,
  onContinue,
  onBack,
  canContinue,
}: {
  step: number;
  question: QuestionData;
  selected: number | number[] | null;
  otherText: string;
  lang: Lang;
  onSelect: (i: number) => void;
  onOtherText: (v: string) => void;
  onContinue: () => void;
  onBack: () => void;
  canContinue: boolean;
}) {
  const ui = UI[lang];
  const multiHintText = question.maxSelect
    ? lang === "ar"
      ? `اختر حتى ${question.maxSelect}`
      : `Select up to ${question.maxSelect}`
    : ui.multiHint;
  const otherIdx = question.options.findIndex((o) => o.isOther);
  const otherSelected =
    otherIdx >= 0 &&
    (question.type === "multi"
      ? Array.isArray(selected) && selected.includes(otherIdx)
      : selected === otherIdx);

  function isSel(i: number): boolean {
    if (question.type === "multi") {
      return Array.isArray(selected) && selected.includes(i);
    }
    return selected === i;
  }

  const isTablet = useIsTablet();
  const ff = lang === "ar" ? "'Cairo', sans-serif" : "'Inter', sans-serif";
  const isAr = lang === "ar";
  const pct = Math.round((step / 7) * 100);

  const optionGrid = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: isTablet ? 12 : 10,
      }}
    >
      {question.options.map((opt, i) => (
        <OptionCard
          key={i}
          opt={opt}
          selected={isSel(i)}
          lang={lang}
          isMulti={question.type === "multi"}
          onClick={() => onSelect(i)}
        />
      ))}
    </div>
  );

  const otherInput = otherSelected && (
    <div style={{ marginTop: 14 }}>
      <input
        type="text"
        value={otherText}
        onChange={(e) => onOtherText(e.target.value)}
        placeholder={ui.otherPlaceholder}
        autoFocus
        style={{
          width: "100%",
          padding: "13px 16px",
          borderRadius: 13,
          border: `2px solid ${TEAL}`,
          background: CARD,
          fontSize: isTablet ? 16 : 14,
          fontFamily: ff,
          color: T1,
          outline: "none",
          direction: isAr ? "rtl" : "ltr",
        }}
      />
    </div>
  );

  if (isTablet) {
    return (
      <div style={{ ...ws(lang), minHeight: "100vh", flexDirection: "column" }}>
        {/* Tablet top bar */}
        <div
          style={{
            background: CARD,
            borderBottom: `1px solid ${BORDER}`,
            padding: "16px 40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
          }}
        >
          <button
            onClick={onBack}
            style={{
              background: "none",
              border: `1.5px solid ${BORDER}`,
              borderRadius: 12,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              color: T2,
              fontSize: 14,
              fontWeight: 600,
              fontFamily: ff,
              padding: "8px 16px",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <path
                d={isAr ? "M7 4.5L12 9L7 13.5" : "M11 4.5L6 9L11 13.5"}
                stroke={T2}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {isAr ? "\u0631\u062c\u0648\u0639" : "Back"}
          </button>
          <LogoPair height={28} />
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ display: "flex", gap: 5 }}>
              {[1, 2, 3, 4, 5, 6, 7].map((s) => (
                <div
                  key={s}
                  style={{
                    width: 28,
                    height: 5,
                    borderRadius: 999,
                    background: s <= step ? TEAL : "#E4E9F0",
                    transition: "background 0.3s",
                  }}
                />
              ))}
            </div>
            <span
              style={{
                fontSize: 16,
                fontWeight: 900,
                color: TEAL,
                fontFamily: ff,
                background: "#EEF9F8",
                padding: "3px 10px",
                borderRadius: 999,
              }}
            >
              {pct}%
            </span>
          </div>
        </div>

        {/* Split body */}
        <div
          style={{
            flex: 1,
            display: "flex",
            overflow: "hidden",
            minHeight: "calc(100vh - 73px)",
          }}
        >
          {/* Left panel */}
          <div
            style={{
              width: "40%",
              background: NAVY,
              padding: "52px 48px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                bottom: -80,
                right: -80,
                width: 260,
                height: 260,
                borderRadius: "50%",
                border: "40px solid rgba(255,255,255,0.04)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: -40,
                left: -40,
                width: 160,
                height: 160,
                borderRadius: "50%",
                border: "30px solid rgba(13,148,136,0.1)",
                pointerEvents: "none",
              }}
            />
            <span
              className="fade-up"
              style={{
                display: "inline-block",
                fontSize: 13,
                color: TEAL,
                fontWeight: 700,
                marginBottom: 22,
                background: "rgba(13,148,136,0.15)",
                padding: "5px 14px",
                borderRadius: 999,
                width: "fit-content",
                fontFamily: ff,
              }}
            >
              {ui.qBadge(step)} / 6
            </span>
            <h2
              className="fade-up"
              style={{
                fontSize: 36,
                fontWeight: 800,
                color: "white",
                lineHeight: 1.3,
                marginBottom: 18,
                fontFamily: ff,
                letterSpacing: -0.5,
              }}
            >
              {question.title}
            </h2>
            {(question.subtitle || question.type === "multi") && (
              <p
                className="fade-up"
                style={{
                  fontSize: 15,
                  color: "rgba(255,255,255,0.5)",
                  fontFamily: ff,
                  lineHeight: 1.7,
                }}
              >
                {question.subtitle ?? multiHintText}
              </p>
            )}
            <div style={{ display: "flex", gap: 8, marginTop: 48 }}>
              {[1, 2, 3, 4, 5, 6, 7].map((s) => (
                <div
                  key={s}
                  style={{
                    width: s === step ? 28 : 8,
                    height: 8,
                    borderRadius: 999,
                    background:
                      s === step
                        ? TEAL
                        : s < step
                          ? "rgba(255,255,255,0.35)"
                          : "rgba(255,255,255,0.12)",
                    transition: "all 0.3s",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right panel */}
          <div
            style={{
              flex: 1,
              background: PAGE,
              padding: "48px 52px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
            className="scrollbar-hide"
          >
            <div className="fade-up">
              {optionGrid}
              {otherInput}
              <div style={{ marginTop: 32 }}>
                <button
                  onClick={onContinue}
                  disabled={!canContinue}
                  style={{
                    padding: "18px 52px",
                    borderRadius: 16,
                    fontWeight: 700,
                    fontSize: 17,
                    border: "none",
                    cursor: canContinue ? "pointer" : "default",
                    background: canContinue ? NAVY : "#DDE3EC",
                    color: canContinue ? "white" : "#A4B4C4",
                    boxShadow: canContinue
                      ? "0 6px 22px rgba(27,44,75,0.28)"
                      : "none",
                    fontFamily: ff,
                    transition: "all 0.2s",
                  }}
                >
                  {ui.nextBtn} {isAr ? "\u2190" : "\u2192"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Mobile layout
  return (
    <div style={{ ...ws(lang), position: "relative" }}>
      <ProgressBar
        step={step}
        label={ui.stepOf(step)}
        lang={lang}
        onBack={onBack}
      />
      <div
        style={{
          ...inner,
          flex: 1,
          overflowY: "auto",
          padding: "26px 20px 130px",
        }}
        className="scrollbar-hide"
      >
        <div className="fade-up">
          <span
            style={{
              display: "inline-block",
              fontSize: 12,
              color: TEAL,
              fontWeight: 700,
              marginBottom: 12,
              background: "#EEF9F8",
              padding: "3px 11px",
              borderRadius: 999,
            }}
          >
            {ui.qBadge(step)}
          </span>
          <h2
            style={{
              fontSize: 21,
              fontWeight: 800,
              color: T1,
              lineHeight: 1.45,
              marginBottom: 4,
            }}
          >
            {question.title}
          </h2>
          <p style={{ fontSize: 13, color: T3, marginBottom: 22 }}>
            {question.subtitle ??
              (question.type === "multi" ? ui.multiHint : " ")}
          </p>
          {optionGrid}
          {otherInput}
        </div>
      </div>
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: 430,
          padding: "16px 20px 32px",
          background: `linear-gradient(to top, ${PAGE} 60%, transparent)`,
          pointerEvents: "none",
        }}
      >
        <button
          onClick={onContinue}
          disabled={!canContinue}
          style={{
            width: "100%",
            padding: "17px",
            borderRadius: 16,
            fontWeight: 700,
            fontSize: 16,
            border: "none",
            cursor: canContinue ? "pointer" : "default",
            background: canContinue ? NAVY : "#DDE3EC",
            color: canContinue ? "white" : "#A4B4C4",
            boxShadow: canContinue ? "0 6px 22px rgba(27,44,75,0.28)" : "none",
            fontFamily: ff,
            transition: "all 0.2s",
            pointerEvents: "auto",
          }}
        >
          {ui.nextBtn}
        </button>
      </div>
    </div>
  );
}
