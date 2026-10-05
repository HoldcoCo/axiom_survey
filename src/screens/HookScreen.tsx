import React from "react";
import IconShape from "@/components/icons/IconShape";
import LogoPair from "@/components/layout/LogoPair";
import TopBanner from "@/components/layout/TopBanner";
import { useIsTablet } from "@/hooks/useIsTablet";
import { inner } from "@/theme/styles";
import { BORDER, CARD, PAGE, T1, T2, T3, TEAL } from "@/theme/tokens";

export default function HookScreen({ onNext }: { onNext: () => void }) {
  const isTablet = useIsTablet();

  const statCards = [
    { icon: "zap", val: "60s", lbl: "To complete" },
    { icon: "target", val: "100", lbl: "Point scale" },
    { icon: "gift", val: "Free", lbl: "No signup" },
  ];

  if (isTablet) {
    return (
      <div
        style={{
          backgroundColor: PAGE,
          height: "100dvh",
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          fontFamily: "'Inter', sans-serif",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            background: CARD,
            borderBottom: `1px solid ${BORDER}`,
            padding: "16px 48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <LogoPair height={32} />
        </div>

        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
          <div
            style={{
              width: "52%",
              background: "#EEF5FC",
              padding: "56px 64px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "safe center",
              position: "relative",
              overflowY: "auto",
              minHeight: 0,
              borderRight: `1px solid ${BORDER}`,
            }}
          >
            <div
              className="fade-up"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "6px 14px",
                borderRadius: 999,
                background: "#DDECF9",
                marginBottom: 28,
                width: "fit-content",
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 750,
                  color: TEAL,
                  letterSpacing: 0.4,
                }}
              >
                DIGITAL HEALTH CHECK · 60 SECONDS
              </span>
            </div>

            <h1
              className="fade-up"
              style={{
                fontSize: 48,
                fontWeight: 750,
                color: T1,
                lineHeight: 1.15,
                letterSpacing: -1.2,
                marginBottom: 22,
                maxWidth: 620,
              }}
            >
              Curious how digitally mature your business{" "}
              <em style={{ fontStyle: "italic", color: TEAL }}>really</em> is?
            </h1>

            <p
              className="fade-up"
              style={{
                fontSize: 17,
                color: T2,
                lineHeight: 1.75,
                marginBottom: 38,
                maxWidth: 580,
              }}
            >
              Take our{" "}
              <strong style={{ color: TEAL, fontWeight: 750 }}>
                60-second
              </strong>{" "}
              Digital Health Check and get an instant score, plus a{" "}
              <strong style={{ color: T1, fontWeight: 700 }}>
                free personalized tip
              </strong>{" "}
              on what to fix first.
            </p>

            <div className="fade-up-delay">
              <button
                type="button"
                onClick={onNext}
                style={{
                  padding: "17px 34px",
                  borderRadius: 10,
                  background: TEAL,
                  color: "white",
                  fontWeight: 700,
                  fontSize: 16,
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'Inter', sans-serif",
                  boxShadow: "0 8px 22px rgba(0,87,168,0.2)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                Take the Free Assessment
                <span style={{ fontSize: 22 }}>→</span>
              </button>
              <p style={{ fontSize: 12, color: T3, marginTop: 14 }}>
                Free · No commitment · 60 seconds
              </p>
            </div>
          </div>

          <div
            style={{
              flex: 1,
              background: CARD,
              padding: "48px 54px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ marginBottom: 26, textAlign: "center" }}>
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
                  height: 2,
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
              <GiveawayCard compact={false} />
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
                    style={{
                      background: CARD,
                      border: `1px solid ${BORDER}`,
                      borderRadius: 12,
                      padding: "18px 12px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: 10,
                      }}
                    >
                      <IconShape name={s.icon} size={40} />
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
        height: "100dvh",
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Inter', sans-serif",
        overflow: "hidden",
      }}
    >
      <TopBanner subtitle="Digital Health Check" />

      <div
        style={{
          ...inner,
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          padding: "22px 22px 24px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          className="fade-up"
          style={{
            margin: "auto 0",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "5px 12px",
              borderRadius: 999,
              background: "#DDECF9",
              marginBottom: 16,
              width: "fit-content",
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 750,
                color: TEAL,
                letterSpacing: 0.4,
              }}
            >
              DIGITAL HEALTH CHECK · 60 SECONDS
            </span>
          </div>
          <h1
            style={{
              fontSize: 29,
              fontWeight: 750,
              color: T1,
              lineHeight: 1.22,
              letterSpacing: -0.6,
              marginBottom: 12,
            }}
          >
            Curious how digitally mature your business{" "}
            <em style={{ fontStyle: "italic", color: TEAL }}>really</em> is?
          </h1>
          <p
            style={{
              fontSize: 14,
              color: T2,
              lineHeight: 1.65,
              marginBottom: 16,
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
          <GiveawayCard compact />
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
                style={{
                  background: CARD,
                  border: `1px solid ${BORDER}`,
                  borderRadius: 10,
                  padding: "9px 8px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: 4,
                  }}
                >
                  <IconShape name={s.icon} size={28} />
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
        <div className="fade-up-delay" style={{ paddingTop: 14 }}>
          <button
            type="button"
            onClick={onNext}
            style={{
              width: "100%",
              padding: "15px",
              borderRadius: 10,
              background: TEAL,
              color: "white",
              fontWeight: 700,
              fontSize: 16,
              border: "none",
              cursor: "pointer",
              fontFamily: "'Inter', sans-serif",
              boxShadow: "0 7px 20px rgba(0,87,168,0.2)",
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

function GiveawayCard({ compact }: { compact: boolean }) {
  return (
    <div
      className="fade-up giveaway-card"
      style={{
        background: CARD,
        border: `1.5px solid ${TEAL}`,
        borderRadius: compact ? 14 : 16,
        padding: compact ? "15px" : "26px 28px",
        marginBottom: compact ? 14 : 0,
        boxShadow: compact
          ? "0 6px 20px rgba(0,87,168,0.07)"
          : "0 8px 28px rgba(0,87,168,0.08)",
        textAlign: "left",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {!compact && (
        <div
          style={{
            position: "absolute",
            top: -44,
            right: -44,
            width: 132,
            height: 132,
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, rgba(0,87,168,0.14), rgba(8,33,61,0.06))",
          }}
        />
      )}
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 7,
          padding: compact ? 0 : "6px 12px",
          borderRadius: 999,
          background: compact ? "transparent" : "#EFF6FF",
          color: "#2563EB",
          fontSize: compact ? 10 : 12,
          fontWeight: 800,
          letterSpacing: compact ? 0.8 : 0.5,
          marginBottom: compact ? 7 : 16,
        }}
      >
        <IconShape name="gift" size={compact ? 16 : 20} />
        GIVEAWAY
      </span>
      <h2
        style={{
          fontSize: compact ? 18 : 24,
          lineHeight: compact ? 1.3 : 1.25,
          fontWeight: 850,
          color: T1,
          marginBottom: compact ? 7 : 10,
          position: "relative",
        }}
      >
        Complete the survey for a chance to win!
      </h2>
      <p
        style={{
          fontSize: compact ? 12 : 14,
          lineHeight: compact ? 1.6 : 1.7,
          color: T2,
          marginBottom: compact ? 12 : 18,
          position: "relative",
        }}
      >
        {compact
          ? "You’ll automatically enter the draw when you complete the survey."
          : "Complete the assessment and you’ll automatically enter the draw."}
      </p>
      <div
        style={{
          borderRadius: compact ? 9 : 10,
          padding: compact ? "11px 13px" : "17px 19px",
          background: "#EEF5FC",
          border: `1px solid ${BORDER}`,
          color: T1,
          position: "relative",
        }}
      >
        <div
          style={{
            fontSize: compact ? 19 : 28,
            fontWeight: 900,
            lineHeight: compact ? 1.1 : 1.05,
          }}
        >
          1 of 3 prizes
        </div>
        <div
          style={{
            fontSize: compact ? 11 : 14,
            fontWeight: 650,
            marginTop: compact ? 5 : 7,
            color: TEAL,
          }}
        >
          A full year of Axiom Express, completely free
        </div>
      </div>
    </div>
  );
}
