import React from "react";
import type { Lang } from "@/types";
import { UI } from "@/i18n";
import IconShape from "@/components/icons/IconShape";
import LogoPair from "@/components/layout/LogoPair";
import { useIsTablet } from "@/hooks/useIsTablet";
import { getLevel } from "@/lib/scoring";
import { ws, inner, innerWide } from "@/theme/styles";
import { BORDER, CARD, NAVY, T1, T2, T3, TEAL } from "@/theme/tokens";

export default function RevealScreen({
  score,
  displayScore,
  email,
  ticketNumber,
  lang,
  emailStatus,
  onViewReport,
  onRetake,
  onResend,
}: {
  score: number;
  displayScore: number;
  email: string;
  ticketNumber: string;
  lang: Lang;
  /** Whether the lead/email POST succeeded. */
  emailStatus: "idle" | "pending" | "sent" | "failed";
  onViewReport: () => void;
  onRetake: () => void;
  onResend: () => void;
}) {
  const ui = UI[lang];
  const level = getLevel(score, lang);
  const r = 72;
  const circ = 2 * Math.PI * r;
  const offset = circ - (displayScore / 100) * circ;
  const ff = lang === "ar" ? "'Cairo', sans-serif" : "'Inter', sans-serif";

  // Confetti particles — IconShape names, matching the rest of the UI
  const confetti = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    icon: ["star", "zap", "gift", "trophy", "target", "check"][i % 6] ?? "star",
    left: `${5 + ((i * 5.5) % 90)}%`,
    delay: `${(i * 0.15) % 2}s`,
    duration: `${2.5 + ((i * 0.2) % 1.5)}s`,
    size: 18 + (i % 3) * 4,
  }));

  const isTablet = useIsTablet();

  const gaugeEl = (size: number, strokeW: number, fontSize: number) => (
    <div
      className="pop-in"
      style={{ position: "relative", width: size, height: size }}
    >
      <div
        style={{
          position: "absolute",
          inset: size * 0.05,
          borderRadius: "50%",
          background: `radial-gradient(circle at center, ${level.gaugeColor}22, transparent 70%)`,
          filter: "blur(12px)",
        }}
      />
      <svg viewBox="0 0 200 200" width={size} height={size}>
        <circle
          cx="100"
          cy="100"
          r={r}
          fill="none"
          stroke="#E8EEF5"
          strokeWidth={strokeW}
        />
        <circle
          cx="100"
          cy="100"
          r={r}
          fill="none"
          stroke={level.gaugeColor}
          strokeWidth={strokeW}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{
            transform: "rotate(-90deg)",
            transformOrigin: "center",
            transition: "stroke-dashoffset 0.04s linear",
            filter: `drop-shadow(0 0 6px ${level.gaugeColor}88)`,
          }}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize,
            fontWeight: 900,
            color: T1,
            lineHeight: 1,
            fontFamily: ff,
            letterSpacing: -2,
          }}
        >
          {displayScore}
        </span>
        <span
          style={{
            fontSize: 12,
            color: T3,
            fontWeight: 600,
            marginTop: 2,
            letterSpacing: 1,
            textTransform: "uppercase",
            fontFamily: ff,
          }}
        >
          {ui.gaugeOf}
        </span>
      </div>
    </div>
  );

  const ctaPanel = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        width: "100%",
      }}
    >
      {ticketNumber.length > 0 && (
        <div
          style={{
            padding: isTablet ? "18px 22px" : "16px 18px",
            borderRadius: 16,
            background: "#F4F8FC",
            border: `1px solid ${BORDER}`,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: TEAL,
              fontWeight: 800,
              letterSpacing: 1,
              textTransform: "uppercase",
              marginBottom: 7,
              fontFamily: ff,
            }}
          >
            {lang === "ar" ? "رقم تذكرة السحب" : "Giveaway Ticket Number"}
          </div>
          <div
            dir="ltr"
            style={{
              fontSize: isTablet ? 26 : 23,
              color: T1,
              fontWeight: 900,
              letterSpacing: 3,
              fontVariantNumeric: "tabular-nums",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {ticketNumber}
          </div>
          <p
            style={{
              fontSize: 11,
              color: T3,
              marginTop: 6,
              fontFamily: ff,
            }}
          >
            {lang === "ar"
              ? "احتفظ بهذا الرقم للمشاركة في السحب."
              : "Keep this number for the giveaway draw."}
          </p>
        </div>
      )}
      <button
        onClick={onViewReport}
        style={{
          width: "100%",
          padding: isTablet ? "17px" : "16px",
          borderRadius: 16,
          fontWeight: 700,
          fontSize: isTablet ? 16 : 15,
          border: `2px solid ${BORDER}`,
          cursor: "pointer",
          background: CARD,
          color: T1,
          fontFamily: ff,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
        }}
      >
        <IconShape name="document" size={24} />
        {ui.viewReport} {ui.arrow}
      </button>
      {emailStatus === "sent" && email.length > 0 && (
        <p
          style={{
            fontSize: 12,
            color: T3,
            textAlign: "center",
            fontFamily: ff,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          <IconShape name="mail" size={20} />
          <span>
            {ui.emailSentPrefix}{" "}
            <span style={{ color: TEAL, fontWeight: 600 }}>{email}</span>
          </span>
        </p>
      )}
      {emailStatus === "pending" && (
        <p
          style={{
            fontSize: 12,
            color: T3,
            textAlign: "center",
            fontFamily: ff,
          }}
        >
          {ui.emailPending}
        </p>
      )}
      {emailStatus === "failed" && (
        <p
          style={{
            fontSize: 12,
            color: "#B45309",
            textAlign: "center",
            fontFamily: ff,
          }}
        >
          {ui.emailFailed}
        </p>
      )}
      {(emailStatus === "failed" || emailStatus === "sent") && (
        <button
          type="button"
          onClick={onResend}
          aria-label={ui.resend}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 13,
            color: T3,
            fontFamily: ff,
            padding: "4px 0",
            textAlign: "center",
          }}
        >
          {ui.resend}
        </button>
      )}
      <div
        className="score-social"
        style={{
          padding: isTablet ? "16px 20px" : "13px 14px",
          borderRadius: 14,
          background: "#EFF6FF",
          border: "1px solid #BFDBFE",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: isTablet ? 17 : 15,
            color: T1,
            fontWeight: 850,
            marginBottom: 4,
            fontFamily: ff,
          }}
        >
          {lang === "ar" ? "هل تريد فرصاً أكثر للفوز؟" : "Want more chances to win?"}
        </div>
        <p
          style={{
            fontSize: 11,
            color: T2,
            marginBottom: 10,
            fontFamily: ff,
          }}
        >
          {lang === "ar" ? "تابعنا على إنستغرام" : "Follow us on Instagram"}
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}>
          <a
            href="https://www.instagram.com/axiom_erp/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "11px 9px",
              borderRadius: 12,
              background: "#2563EB",
              color: "white",
              fontSize: 12,
              fontWeight: 750,
              textDecoration: "none",
              fontFamily: ff,
            }}
          >
            {lang === "ar" ? "تابع Axiom ERP" : "Follow Axiom ERP"}
          </a>
          <a
            href="https://www.instagram.com/holdcocorp/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "11px 9px",
              borderRadius: 12,
              background: CARD,
              border: "1px solid #93C5FD",
              color: "#1D4ED8",
              fontSize: 12,
              fontWeight: 750,
              textDecoration: "none",
              fontFamily: ff,
            }}
          >
            {lang === "ar" ? "تابع HoldCo" : "Follow HoldCo"}
          </a>
        </div>
      </div>
      <button
        type="button"
        onClick={onRetake}
        style={{
          background: "none",
          border: `1.5px solid ${BORDER}`,
          borderRadius: 12,
          cursor: "pointer",
          fontSize: 13,
          fontWeight: 600,
          color: T2,
          fontFamily: ff,
          padding: "10px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          width: "100%",
          transition: "border-color 0.15s, color 0.15s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = NAVY;
          e.currentTarget.style.color = T1;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = BORDER;
          e.currentTarget.style.color = T2;
        }}
      >
        <IconShape name="refresh" size={18} />
        {ui.retake}
      </button>
    </div>
  );

  if (isTablet) {
    return (
      <div
        style={{ ...ws(lang), flexDirection: "column", overflowY: "auto" }}
        className="scrollbar-hide"
      >
        {/* Confetti */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: "100vh",
            pointerEvents: "none",
            zIndex: 10,
            overflow: "hidden",
          }}
        >
          {confetti.map((c) => (
            <span
              key={c.id}
              style={{
                position: "absolute",
                top: -30,
                left: c.left,
                animation: `confetti-fall ${c.duration} ${c.delay} ease-in forwards`,
              }}
            >
              <IconShape name={c.icon} size={c.size} />
            </span>
          ))}
        </div>
        {/* Top bar */}
        <div
          style={{
            background: CARD,
            borderBottom: `1px solid ${BORDER}`,
            padding: "18px 48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <LogoPair height={32} />
        </div>
        <div
          style={{
            flex: 1,
            minHeight: 0,
            display: "flex",
            alignItems: "safe center",
            justifyContent: "center",
            overflowY: "auto",
          }}
        >
        <div
          style={{
            ...innerWide,
            padding: "24px 40px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
            alignItems: "center",
          }}
        >
          {/* Left: gauge + badge */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 24,
            }}
          >
            <h1
              className="fade-up"
              style={{
                fontSize: 28,
                fontWeight: 900,
                color: T1,
                textAlign: "center",
                fontFamily: ff,
                marginBottom: -8,
              }}
            >
              {ui.revealTitle}
            </h1>
            {gaugeEl(230, 15, 58)}
            <div
              className="pop-in"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 14,
                padding: "16px 28px",
                borderRadius: 20,
                background: level.accentBg,
                border: `2px solid ${level.accentBorder}`,
                boxShadow: `0 4px 20px ${level.gaugeColor}28`,
              }}
            >
              <IconShape name={level.emoji} size={44} />
              <div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: level.accent,
                    letterSpacing: 1,
                    marginBottom: 4,
                    textTransform: "uppercase",
                    fontFamily: ff,
                  }}
                >
                  {ui.currentLevel}
                </div>
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 800,
                    color: T1,
                    fontFamily: ff,
                  }}
                >
                  {level.label}
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {ctaPanel}
          </div>
        </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="score-page scrollbar-hide"
      style={{ ...ws(lang), overflowY: "auto", position: "relative" }}
    >
      {/* Confetti burst */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "100vh",
          pointerEvents: "none",
          zIndex: 10,
          overflow: "hidden",
        }}
      >
        {confetti.map((c) => (
          <span
            key={c.id}
            style={{
              position: "absolute",
              top: -30,
              left: c.left,
              animation: `confetti-fall ${c.duration} ${c.delay} ease-in forwards`,
            }}
          >
            <IconShape name={c.icon} size={c.size} />
          </span>
        ))}
      </div>

      {/* Header */}
      <div
        style={{
          background: CARD,
          padding: "24px 24px 20px",
          flexShrink: 0,
          borderBottom: `1px solid ${BORDER}`,
        }}
      >
        <div style={{ ...inner, display: "flex", justifyContent: "center" }}>
          <LogoPair height={34} />
        </div>
        <p
          style={{
            color: T3,
            fontSize: 13,
            marginTop: 12,
            textAlign: "center",
            fontFamily: ff,
          }}
        >
          {ui.revealSub}
        </p>
      </div>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          width: "100%",
          display: "flex",
          alignItems: "safe center",
          justifyContent: "center",
          overflowY: "auto",
        }}
      >
      <div
        style={{
          ...inner,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "16px 22px 24px",
        }}
      >
        <h1
          className="fade-up"
          style={{
            fontSize: 23,
            fontWeight: 900,
            color: T1,
            textAlign: "center",
            marginBottom: 16,
            fontFamily: ff,
          }}
        >
          {ui.revealTitle}
        </h1>
        <div style={{ marginBottom: 4 }}>{gaugeEl(165, 13, 43)}</div>

        {/* Level badge */}
        <div
          className="pop-in"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 14,
            padding: "14px 24px",
            borderRadius: 20,
            background: level.accentBg,
            border: `2px solid ${level.accentBorder}`,
            boxShadow: `0 4px 20px ${level.gaugeColor}28, 0 1px 4px rgba(0,0,0,0.06)`,
            marginBottom: 22,
          }}
        >
          <IconShape name={level.emoji} size={40} />
          <div>
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: level.accent,
                letterSpacing: 1,
                marginBottom: 3,
                textTransform: "uppercase",
                fontFamily: ff,
              }}
            >
              {ui.currentLevel}
            </div>
            <div
              style={{
                fontSize: 17,
                fontWeight: 800,
                color: T1,
                fontFamily: ff,
              }}
            >
              {level.label}
            </div>
          </div>
        </div>

        {ctaPanel}
      </div>
      </div>
    </div>
  );
}
