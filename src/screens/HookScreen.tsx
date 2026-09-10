import React from "react";
import axiomLogo from "@/assets/Axiom_erp_.png";
import holdcoLogo from "@/assets/Holdco_corp_logo.png";
import IconShape from "@/components/icons/IconShape";
import TopBanner from "@/components/layout/TopBanner";
import { useIsTablet } from "@/hooks/useIsTablet";
import { inner } from "@/theme/styles";
import { BORDER, CARD, NAVY, PAGE, T1, T2, T3, TEAL } from "@/theme/tokens";

export default function HookScreen({ onNext }: { onNext: () => void }) {
  const isTablet = useIsTablet();

  const statCards = [
    {
      icon: "zap",
      val: "60s",
      lbl: "To complete",
      delay: "0s",
      color: "#FFF7ED",
      border: "#FED7AA",
    },
    {
      icon: "target",
      val: "100",
      lbl: "Point scale",
      delay: "0.08s",
      color: "#EEF9F8",
      border: "#B2EAE5",
    },
    {
      icon: "gift",
      val: "Free",
      lbl: "No signup",
      delay: "0.16s",
      color: "#EEF2FF",
      border: "#C7D2FE",
    },
  ];

  if (isTablet) {
    return (
      <div
        style={{
          backgroundColor: PAGE,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          fontFamily: "'Inter', sans-serif",
          overflow: "hidden",
        }}
      >
        {/* Top bar — Holdco only */}
        <div
          style={{
            background: CARD,
            borderBottom: `1px solid ${BORDER}`,
            padding: "18px 48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={holdcoLogo}
            alt="Holdco Corp"
            style={{ height: 32, width: "auto", objectFit: "contain" }}
          />
        </div>

        {/* Split layout */}
        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
          {/* Left — dark hero panel */}
          <div
            style={{
              width: "48%",
              background: NAVY,
              padding: "72px 64px",
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
                bottom: -100,
                right: -100,
                width: 340,
                height: 340,
                borderRadius: "50%",
                border: "50px solid rgba(255,255,255,0.03)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: -50,
                left: -50,
                width: 200,
                height: 200,
                borderRadius: "50%",
                border: "36px solid rgba(13,148,136,0.08)",
                pointerEvents: "none",
              }}
            />

            {/* Axiom logo — prominent above badge */}
            <div className="fade-up" style={{ marginBottom: 28 }}>
              <img
                src={axiomLogo}
                alt="Axiom ERP"
                style={{
                  height: 52,
                  width: "auto",
                  objectFit: "contain",
                  filter: "brightness(0) invert(1)",
                }}
              />
            </div>
            <div
              className="fade-up"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "7px 16px",
                borderRadius: 999,
                background: "rgba(13,148,136,0.15)",
                border: "1px solid rgba(13,148,136,0.3)",
                marginBottom: 32,
                width: "fit-content",
              }}
            >
              <span style={{ position: "relative", display: "inline-flex" }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: TEAL,
                    display: "block",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    inset: -2,
                    borderRadius: "50%",
                    border: `2px solid ${TEAL}`,
                    animation: "pulse-ring 1.5s ease-out infinite",
                  }}
                />
              </span>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: TEAL,
                  letterSpacing: 0.5,
                }}
              >
                60-Second Assessment
              </span>
            </div>

            <h1
              className="fade-up"
              style={{
                fontSize: 48,
                fontWeight: 800,
                color: "white",
                lineHeight: 1.15,
                letterSpacing: -1,
                marginBottom: 24,
              }}
            >
              Curious how digitally mature your business{" "}
              <em style={{ fontStyle: "italic", color: TEAL }}>really</em> is?
            </h1>

            <p
              className="fade-up"
              style={{
                fontSize: 18,
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.8,
                marginBottom: 48,
              }}
            >
              Take our{" "}
              <strong style={{ color: TEAL, fontWeight: 900 }}>
                60-second
              </strong>{" "}
              Digital Health Check and get an instant score, plus a{" "}
              <strong
                style={{ color: "rgba(255,255,255,0.9)", fontWeight: 700 }}
              >
                free personalized tip
              </strong>{" "}
              on what to fix first.
            </p>

            <div className="fade-up-delay">
              <button
                onClick={onNext}
                className="shimmer-btn"
                style={{
                  padding: "20px 48px",
                  borderRadius: 16,
                  color: "white",
                  fontWeight: 700,
                  fontSize: 18,
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'Inter', sans-serif",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                Take the Free Assessment
                <span style={{ fontSize: 22 }}>→</span>
              </button>
              <p
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.35)",
                  marginTop: 16,
                }}
              >
                Free · No commitment · 60 seconds
              </p>
            </div>
          </div>

          {/* Right — stat panel */}
          <div
            style={{
              flex: 1,
              background: PAGE,
              padding: "72px 64px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ marginBottom: 48, textAlign: "center" }}>
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: T3,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                What you get
              </p>
              <div
                style={{
                  width: 32,
                  height: 3,
                  background: TEAL,
                  borderRadius: 999,
                  margin: "0 auto",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 20,
                width: "100%",
                maxWidth: 480,
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 20,
                }}
              >
                {statCards.map((s) => (
                  <div
                    key={s.val}
                    className="float"
                    style={{
                      background: s.color,
                      border: `1px solid ${s.border}`,
                      borderRadius: 22,
                      padding: "28px 16px",
                      textAlign: "center",
                      animationDelay: s.delay,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: 10,
                      }}
                    >
                      <IconShape name={s.icon} size={48} />
                    </div>
                    <div
                      style={{
                        fontWeight: 800,
                        fontSize: 22,
                        color: T1,
                        marginBottom: 4,
                      }}
                    >
                      {s.val}
                    </div>
                    <div style={{ fontSize: 12, color: T3, fontWeight: 500 }}>
                      {s.lbl}
                    </div>
                  </div>
                ))}
              </div>
              <div
                className="float"
                style={{
                  background: CARD,
                  border: `1px solid ${BORDER}`,
                  borderRadius: 22,
                  padding: "28px 20px",
                  textAlign: "center",
                  animationDelay: "0.24s",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: 10,
                  }}
                >
                  <IconShape name="barchart" size={48} />
                </div>
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: 22,
                    color: T1,
                    marginBottom: 4,
                  }}
                >
                  Score + Tips
                </div>
                <div style={{ fontSize: 12, color: T3, fontWeight: 500 }}>
                  Instant personalized report
                </div>
              </div>
            </div>
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
        fontFamily: "'Inter', sans-serif",
        overflow: "hidden",
      }}
    >
      <TopBanner subtitle="Digital Health Check" />

      {/* Decorative floating blobs */}
      <div
        style={{
          position: "absolute",
          top: 90,
          right: -40,
          width: 180,
          height: 180,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(13,148,136,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 200,
          left: -60,
          width: 220,
          height: 220,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(27,44,75,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          ...inner,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "32px 28px 40px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          className="fade-up"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingBottom: 24,
          }}
        >
          {/* Axiom logo — big, above badge */}
          <div style={{ marginBottom: 20 }}>
            <img
              src={axiomLogo}
              alt="Axiom ERP"
              style={{ height: 46, width: "auto", objectFit: "contain" }}
            />
          </div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 14px",
              borderRadius: 999,
              background: "#EEF9F8",
              border: "1px solid #B2EAE5",
              marginBottom: 26,
              width: "fit-content",
              position: "relative",
            }}
          >
            <span style={{ position: "relative", display: "inline-flex" }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: TEAL,
                  display: "block",
                }}
              />
              <span
                className="pulse-ring"
                style={{
                  position: "absolute",
                  inset: -2,
                  borderRadius: "50%",
                  border: `2px solid ${TEAL}`,
                  animation: "pulse-ring 1.5s ease-out infinite",
                }}
              />
            </span>
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: TEAL,
                letterSpacing: 0.5,
              }}
            >
              60-Second Assessment
            </span>
          </div>
          <h1
            style={{
              fontSize: 31,
              fontWeight: 800,
              color: T1,
              lineHeight: 1.25,
              letterSpacing: -0.5,
              marginBottom: 20,
            }}
          >
            Curious how digitally mature your business{" "}
            <em style={{ fontStyle: "italic", color: TEAL }}>really</em> is?
          </h1>
          <p
            style={{
              fontSize: 16,
              color: T2,
              lineHeight: 1.85,
              marginBottom: 32,
            }}
          >
            Take our{" "}
            <strong
              style={{ color: TEAL, fontWeight: 900, fontSize: "1.15em" }}
            >
              60-second
            </strong>{" "}
            Digital Health Check and get an instant score, plus a{" "}
            <strong style={{ color: T1, fontWeight: 700 }}>
              free personalized tip
            </strong>{" "}
            on what to fix first.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 10,
              marginBottom: 8,
            }}
          >
            {statCards.map((s) => (
              <div
                key={s.val}
                className="float"
                style={{
                  background: s.color,
                  border: `1px solid ${s.border}`,
                  borderRadius: 18,
                  padding: "14px 10px",
                  textAlign: "center",
                  animationDelay: s.delay,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: 6,
                  }}
                >
                  <IconShape name={s.icon} size={36} />
                </div>
                <div style={{ fontWeight: 800, fontSize: 15, color: T1 }}>
                  {s.val}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: T3,
                    fontWeight: 500,
                    marginTop: 1,
                  }}
                >
                  {s.lbl}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="fade-up-delay">
          <button
            onClick={onNext}
            className="shimmer-btn"
            style={{
              width: "100%",
              padding: "18px",
              borderRadius: 16,
              color: "white",
              fontWeight: 700,
              fontSize: 17,
              border: "none",
              cursor: "pointer",
              fontFamily: "'Inter', sans-serif",
              boxShadow: "0 8px 28px rgba(27,44,75,0.32)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            Take the Free Assessment
            <span style={{ fontSize: 20 }}>→</span>
          </button>
          <p
            style={{
              textAlign: "center",
              fontSize: 12,
              color: T3,
              marginTop: 14,
            }}
          >
            Free · No commitment · 60 seconds
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Language Screen ───────────────────────────────────────────────────────────
