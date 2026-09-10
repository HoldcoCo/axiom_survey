import React from "react";
import type { Lang } from "@/types";
import LogoPair from "@/components/layout/LogoPair";
import TopBanner from "@/components/layout/TopBanner";
import { useIsTablet } from "@/hooks/useIsTablet";
import { BORDER, CARD, PAGE, T1, T2, T3, TEAL } from "@/theme/tokens";

export default function LangScreen({
  onSelect,
  onBack,
}: {
  onSelect: (l: Lang) => void;
  onBack: () => void;
}) {
  const isTablet = useIsTablet();

  const langOptions = [
    {
      lang: "en" as Lang,
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="14" fill="#EEF2FF" />
          <text
            x="24"
            y="31"
            textAnchor="middle"
            fontSize="15"
            fontFamily="'Inter', sans-serif"
            fontWeight="800"
            fill="#3730A3"
          >
            EN
          </text>
        </svg>
      ),
      label: "English",
      sub: "Continue in English",
      desc: "Answer questions and receive your Digital Health Score in English.",
      arabic: false,
    },
    {
      lang: "ar" as Lang,
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="14" fill="#FFF7ED" />
          <text
            x="24"
            y="33"
            textAnchor="middle"
            fontSize="24"
            fontFamily="'Cairo', 'Noto Naskh Arabic', serif"
            fontWeight="700"
            fill="#C2410C"
          >
            ع
          </text>
        </svg>
      ),
      label: "العربية",
      sub: "تابع بالعربية",
      desc: "أجب على الأسئلة واحصل على نتيجة الصحة الرقمية بالعربية.",
      arabic: true,
    },
  ] as const;

  if (isTablet) {
    return (
      <div
        style={{
          backgroundColor: PAGE,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          fontFamily: "'Inter', 'Cairo', sans-serif",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            background: CARD,
            borderBottom: `1px solid ${BORDER}`,
            padding: "18px 48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
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
              fontFamily: "'Inter', sans-serif",
              padding: "8px 16px",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <path
                d="M11 4.5L6 9L11 13.5"
                stroke={T2}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back
          </button>
          <LogoPair height={32} />
          <div style={{ width: 80 }} />
        </div>

        {/* Centered wide content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "48px",
          }}
        >
          <div
            className="fade-up"
            style={{ textAlign: "center", marginBottom: 52 }}
          >
            <h2
              style={{
                fontSize: 38,
                fontWeight: 800,
                color: T1,
                letterSpacing: -0.5,
                marginBottom: 12,
              }}
            >
              Choose Your Language
            </h2>
            <p style={{ fontSize: 18, color: T2, lineHeight: 1.6 }}>
              Select how you'd like to take the assessment
              <span
                style={{
                  display: "block",
                  fontFamily: "'Cairo', sans-serif",
                  marginTop: 4,
                }}
              >
                اختر لغة التقييم
              </span>
            </p>
          </div>

          <div
            className="fade-up"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 24,
              width: "100%",
              maxWidth: 720,
            }}
          >
            {langOptions.map((opt) => (
              <button
                key={opt.lang}
                onClick={() => onSelect(opt.lang)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 20,
                  padding: "40px 32px",
                  borderRadius: 24,
                  background: CARD,
                  border: `2px solid ${BORDER}`,
                  cursor: "pointer",
                  boxShadow: "0 4px 18px rgba(27,44,75,0.07)",
                  textAlign: "center",
                  transition:
                    "border-color 0.15s, box-shadow 0.15s, transform 0.12s",
                  fontFamily: opt.arabic
                    ? "'Cairo', sans-serif"
                    : "'Inter', sans-serif",
                  outline: "none",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = TEAL;
                  el.style.boxShadow = "0 8px 28px rgba(13,148,136,0.14)";
                  el.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = BORDER;
                  el.style.boxShadow = "0 4px 18px rgba(27,44,75,0.07)";
                  el.style.transform = "translateY(0)";
                }}
              >
                {opt.icon}
                <div>
                  <div
                    style={{
                      fontWeight: 800,
                      fontSize: 26,
                      color: T1,
                      marginBottom: 6,
                    }}
                  >
                    {opt.label}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      color: T3,
                      fontWeight: 500,
                      marginBottom: 16,
                    }}
                  >
                    {opt.sub}
                  </div>
                  <div style={{ fontSize: 13, color: T2, lineHeight: 1.6 }}>
                    {opt.desc}
                  </div>
                </div>
                <div
                  style={{
                    marginTop: "auto",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    color: TEAL,
                    fontWeight: 700,
                    fontSize: 14,
                  }}
                >
                  {opt.arabic ? "ابدأ الآن" : "Start now"}
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path
                      d={
                        opt.arabic
                          ? "M11 4.5L6 9L11 13.5"
                          : "M7 4.5L12 9L7 13.5"
                      }
                      stroke={TEAL}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: PAGE,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Inter', 'Cairo', sans-serif",
      }}
    >
      <TopBanner subtitle="Digital Health Check" />
      <div style={{ padding: "16px 24px 0" }}>
        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
            color: T2,
            fontSize: 13,
            fontWeight: 600,
            fontFamily: "'Inter', sans-serif",
            padding: "6px 0",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M11 4.5L6 9L11 13.5"
              stroke={T2}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back
        </button>
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "8px 28px 48px",
        }}
      >
        <div
          style={{
            width: 40,
            height: 2,
            background: BORDER,
            borderRadius: 999,
            marginBottom: 32,
          }}
        />
        <p
          style={{
            fontSize: 14,
            color: T2,
            marginBottom: 28,
            textAlign: "center",
            lineHeight: 1.6,
          }}
        >
          Choose your language
          <br />
          <span style={{ fontFamily: "'Cairo', sans-serif", fontSize: 15 }}>
            اختر لغتك
          </span>
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            width: "100%",
            maxWidth: 320,
          }}
        >
          {langOptions.map((opt) => (
            <button
              key={opt.lang}
              onClick={() => onSelect(opt.lang)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "16px 20px",
                borderRadius: 18,
                background: CARD,
                border: `1.5px solid ${BORDER}`,
                cursor: "pointer",
                boxShadow: "0 2px 10px rgba(27,44,75,0.07)",
                textAlign: "left",
                transition: "border-color 0.15s, box-shadow 0.15s",
                fontFamily: opt.arabic
                  ? "'Cairo', sans-serif"
                  : "'Inter', sans-serif",
                outline: "none",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = TEAL;
                el.style.boxShadow = "0 4px 16px rgba(13,148,136,0.12)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = BORDER;
                el.style.boxShadow = "0 2px 10px rgba(27,44,75,0.07)";
              }}
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                {opt.arabic ? (
                  <>
                    <rect width="32" height="32" rx="10" fill="#FFF7ED" />
                    <text
                      x="16"
                      y="23"
                      textAnchor="middle"
                      fontSize="17"
                      fontFamily="'Cairo', 'Noto Naskh Arabic', serif"
                      fontWeight="700"
                      fill="#C2410C"
                    >
                      ع
                    </text>
                  </>
                ) : (
                  <>
                    <rect width="32" height="32" rx="10" fill="#EEF2FF" />
                    <text
                      x="16"
                      y="22"
                      textAnchor="middle"
                      fontSize="11"
                      fontFamily="'Inter', sans-serif"
                      fontWeight="800"
                      fill="#3730A3"
                    >
                      EN
                    </text>
                  </>
                )}
              </svg>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 17,
                    color: T1,
                    marginBottom: 2,
                  }}
                >
                  {opt.label}
                </div>
                <div style={{ fontSize: 12, color: T3, fontWeight: 500 }}>
                  {opt.sub}
                </div>
              </div>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                style={{ opacity: 0.35 }}
              >
                <path
                  d="M7 4.5L12 9L7 13.5"
                  stroke={T1}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Intro Screen ──────────────────────────────────────────────────────────────
