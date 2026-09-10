import React, { useEffect, useState } from "react";
import type { Lang } from "@/types";
import { UI } from "@/i18n";
import IconShape from "@/components/icons/IconShape";
import { useIsTablet } from "@/hooks/useIsTablet";
import { ws } from "@/theme/styles";
import { BORDER, CARD, PAGE, T1, T2, T3, TEAL } from "@/theme/tokens";

export default function LoadingScreen({ lang }: { lang: Lang }) {
  const ui = UI[lang];
  const ff = lang === "ar" ? "'Cairo', sans-serif" : "'Inter', sans-serif";
  const [idx, setIdx] = useState(0);
  const [dots, setDots] = useState(0);
  useEffect(() => {
    const t = setInterval(
      () => setIdx((i) => (i + 1) % ui.loadingMsgs.length),
      850,
    );
    const d = setInterval(() => setDots((i) => (i + 1) % 4), 400);
    return () => {
      clearInterval(t);
      clearInterval(d);
    };
  }, [ui.loadingMsgs.length]);
  const stepIcons = ["search", "barchart", "rocket"] as const;
  const ringIcons = ["search", "barchart", "target"] as const;
  const steps = [
    { icon: stepIcons[0], done: idx >= 1 },
    { icon: stepIcons[1], done: idx >= 2 },
    { icon: stepIcons[2], done: idx >= 3 },
  ];
  const isTablet = useIsTablet();
  const ringSize = isTablet ? 160 : 100;
  const r = isTablet ? 64 : 40;
  const iconSz = isTablet ? 52 : 36;

  return (
    <div
      style={{
        ...ws(lang),
        alignItems: "center",
        justifyContent: "center",
        background: PAGE,
      }}
    >
      <div
        style={{
          textAlign: "center",
          padding: isTablet ? "60px 48px" : "40px 32px",
          width: "100%",
          maxWidth: isTablet ? 560 : 380,
        }}
      >
        {/* Animated score ring */}
        <div
          style={{
            position: "relative",
            width: ringSize,
            height: ringSize,
            margin: "0 auto 40px",
          }}
        >
          <svg
            viewBox={`0 0 ${ringSize} ${ringSize}`}
            width={ringSize}
            height={ringSize}
            style={{ transform: "rotate(-90deg)" }}
          >
            <circle
              cx={ringSize / 2}
              cy={ringSize / 2}
              r={r}
              fill="none"
              stroke="#E4E9F0"
              strokeWidth={isTablet ? 12 : 8}
            />
            <circle
              cx={ringSize / 2}
              cy={ringSize / 2}
              r={r}
              fill="none"
              stroke={TEAL}
              strokeWidth={isTablet ? 12 : 8}
              strokeDasharray={`${2 * Math.PI * r * (idx / 3)} ${2 * Math.PI * r}`}
              strokeLinecap="round"
              style={{ transition: "stroke-dasharray 0.8s ease" }}
            />
          </svg>
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconShape name={ringIcons[idx] ?? "check"} size={iconSz} />
          </div>
        </div>

        <h2
          style={{
            fontSize: isTablet ? 28 : 18,
            fontWeight: 700,
            color: T1,
            marginBottom: 8,
            fontFamily: ff,
            minHeight: isTablet ? 40 : 28,
          }}
          className="fade-up"
          key={idx}
        >
          {ui.loadingMsgs[idx]}
          {".".repeat(dots)}
        </h2>
        <p
          style={{
            fontSize: isTablet ? 16 : 13,
            color: T3,
            marginBottom: 40,
            fontFamily: ff,
          }}
        >
          {ui.loadingSub}
        </p>

        {/* Step checklist */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: isTablet ? 14 : 10,
            textAlign: lang === "ar" ? "right" : "left",
          }}
        >
          {steps.map((s, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: isTablet ? "14px 22px" : "10px 16px",
                borderRadius: 16,
                background: s.done ? "#EEF9F8" : CARD,
                border: `1px solid ${s.done ? "#5EEAD4" : BORDER}`,
                transition: "all 0.3s",
                direction: lang === "ar" ? "rtl" : "ltr",
              }}
            >
              <IconShape
                name={s.done ? "check" : s.icon}
                size={isTablet ? 36 : 28}
              />
              <span
                style={{
                  fontSize: isTablet ? 16 : 13,
                  fontWeight: 600,
                  color: s.done ? TEAL : T2,
                  flex: 1,
                  fontFamily: ff,
                }}
              >
                {ui.loadingMsgs[i]}
              </span>
              {s.done && (
                <svg
                  width={isTablet ? 22 : 16}
                  height={isTablet ? 22 : 16}
                  viewBox="0 0 16 16"
                  fill="none"
                  className="bounce-in"
                >
                  <circle cx="8" cy="8" r="8" fill={TEAL} />
                  <path
                    d="M5 8.5L7 10.5L11 6"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
