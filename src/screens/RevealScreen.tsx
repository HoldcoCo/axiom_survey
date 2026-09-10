import React from "react";
import type { Lang } from "@/types";
import { UI } from "@/i18n";
import IconShape from "@/components/icons/IconShape";
import LogoPair from "@/components/layout/LogoPair";
import { useIsTablet } from "@/hooks/useIsTablet";
import { getBookingUrl } from "@/lib/bookingUrl";
import { getLevel } from "@/lib/scoring";
import { ws, inner, innerWide } from "@/theme/styles";
import { BORDER, CARD, NAVY, T1, T2, T3, TEAL } from "@/theme/tokens";

export default function RevealScreen({
  score,
  displayScore,
  email,
  lang,
  emailStatus,
  onViewReport,
  onRetake,
  onResend,
}: {
  score: number;
  displayScore: number;
  email: string;
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
      <p
        style={{
          fontSize: isTablet ? 14 : 13,
          color: T2,
          textAlign: "center",
          lineHeight: 1.7,
          fontFamily: ff,
        }}
      >
        {ui.followUp}
      </p>
      <a
        href={getBookingUrl()}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          width: "100%",
          padding: isTablet ? "18px" : "17px",
          borderRadius: 16,
          fontWeight: 700,
          fontSize: isTablet ? 16 : 15,
          border: "none",
          cursor: "pointer",
          background: NAVY,
          color: "white",
          boxShadow: "0 6px 22px rgba(27,44,75,0.28)",
          fontFamily: ff,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          textDecoration: "none",
        }}
      >
        {ui.bookBtn} {ui.arrow}
      </a>
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
        <IconShape name="file" size={22} />
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
        {/* Wide content */}
        <div
          style={{
            ...innerWide,
            padding: "52px 40px 64px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
            alignItems: "start",
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
            {gaugeEl(280, 16, 68)}
            <p
              className="fade-up"
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: T1,
                textAlign: "center",
                fontFamily: ff,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
              }}
            >
              <IconShape name="trophy" size={32} />
              {ui.revealTitle}
            </p>
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
              <IconShape name={level.emoji} size={48} />
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
              <IconShape name="star" size={28} />
            </div>
          </div>
          {/* Right: message, tip, CTAs */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div
              style={{
                background: CARD,
                borderRadius: 18,
                padding: "22px 24px",
                boxShadow: "0 2px 14px rgba(27,44,75,0.07)",
                border: `1px solid ${BORDER}`,
              }}
            >
              <p
                style={{
                  fontSize: 15,
                  color: T2,
                  lineHeight: 1.8,
                  margin: 0,
                  fontFamily: ff,
                }}
              >
                {level.message}
              </p>
            </div>
            <div
              style={{
                borderRadius: 16,
                padding: "22px 24px",
                background: level.accentBg,
                border: `1px solid ${level.accentBorder}`,
                ...(lang === "ar"
                  ? { borderRight: `4px solid ${level.gaugeColor}` }
                  : { borderLeft: `4px solid ${level.gaugeColor}` }),
              }}
            >
              <div
                style={{ display: "flex", gap: 14, alignItems: "flex-start" }}
              >
                <IconShape name="lightbulb" size={36} />
                <div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: level.accent,
                      letterSpacing: 0.4,
                      marginBottom: 8,
                      fontFamily: ff,
                    }}
                  >
                    {ui.quickWinLabel}
                  </div>
                  <p
                    style={{
                      fontSize: 15,
                      color: T1,
                      lineHeight: 1.75,
                      margin: 0,
                      fontFamily: ff,
                    }}
                  >
                    {level.tip}
                  </p>
                </div>
              </div>
            </div>
            {ctaPanel}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{ ...ws(lang), overflowY: "auto", position: "relative" }}
      className="scrollbar-hide"
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
          ...inner,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "32px 22px 50px",
        }}
      >
        {/* Gauge hero */}
        <div style={{ marginBottom: 4 }}>{gaugeEl(210, 14, 52)}</div>

        <p
          className="fade-up"
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: T1,
            textAlign: "center",
            marginBottom: 16,
            fontFamily: ff,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <IconShape name="trophy" size={28} />
          {ui.revealTitle}
        </p>

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
          <IconShape name="star" size={24} />
        </div>

        {/* Message card */}
        <div
          style={{
            width: "100%",
            background: CARD,
            borderRadius: 18,
            padding: "18px 20px",
            marginBottom: 14,
            boxShadow: "0 2px 14px rgba(27,44,75,0.07)",
            border: `1px solid ${BORDER}`,
          }}
        >
          <p
            style={{
              fontSize: 14,
              color: T2,
              lineHeight: 1.8,
              margin: 0,
              fontFamily: ff,
            }}
          >
            {level.message}
          </p>
        </div>

        {/* Tip card */}
        <div
          style={{
            width: "100%",
            borderRadius: 16,
            padding: "18px 20px",
            marginBottom: 28,
            background: level.accentBg,
            border: `1px solid ${level.accentBorder}`,
            ...(lang === "ar"
              ? { borderRight: `4px solid ${level.gaugeColor}` }
              : { borderLeft: `4px solid ${level.gaugeColor}` }),
            boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
          }}
        >
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <IconShape name="lightbulb" size={38} />
            <div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: level.accent,
                  letterSpacing: 0.4,
                  marginBottom: 6,
                }}
              >
                {ui.quickWinLabel}
              </div>
              <p
                style={{ fontSize: 14, color: T1, lineHeight: 1.75, margin: 0 }}
              >
                {level.tip}
              </p>
            </div>
          </div>
        </div>

        {ctaPanel}
      </div>
    </div>
  );
}
