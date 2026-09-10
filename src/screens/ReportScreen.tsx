import IconShape from "@/components/icons/IconShape";
import LogoPair from "@/components/layout/LogoPair";
import { getQuestions } from "@/data";
import { useIsTablet } from "@/hooks/useIsTablet";
import { UI } from "@/i18n";
import { getBookingUrl } from "@/lib/bookingUrl";
import { getLevel } from "@/lib/scoring";
import { inner, innerWide, ws } from "@/theme/styles";
import { BORDER, T1, T2, T3 } from "@/theme/tokens";
import { hexRgba } from "@/theme/utils";
import type { AnswerMap, Lang, LeadFormData } from "@/types";

export interface ReportProps {
  score: number;
  answers: AnswerMap;
  formData: LeadFormData;
  lang: Lang;
  onBack: () => void;
}

export default function ReportScreen({
  score,
  answers,
  formData,
  lang,
  onBack,
}: ReportProps) {
  const ui = UI[lang];
  const qs = getQuestions(lang);
  const level = getLevel(score, lang);
  const ff = lang === "ar" ? "'Cairo', sans-serif" : "'Inter', sans-serif";
  const isAr = lang === "ar";
  const isTablet = useIsTablet();

  const q3ans = answers[3];
  const q4ans = answers[4];
  const q5ans = answers[5];

  const opsScore = (() => {
    if (typeof q3ans === "number") return qs[2].options[q3ans]?.points ?? 0;
    if (Array.isArray(q3ans) && q3ans.length > 0)
      return Math.max(...q3ans.map((i) => qs[2].options[i]?.points ?? 0));
    return 0;
  })();

  const painScore = (() => {
    if (typeof q4ans === "number") return qs[3].options[q4ans]?.points ?? 0;
    if (Array.isArray(q4ans)) {
      let s = 0;
      q4ans.forEach((i) => {
        s += qs[3].options[i]?.points ?? 0;
      });
      return s;
    }
    return 0;
  })();

  const techScore = (() => {
    if (!Array.isArray(q5ans)) return 0;
    let s = 0;
    q5ans.forEach((i) => {
      s += qs[4].options[i]?.points ?? 0;
    });
    return s;
  })();

  const dims = isAr
    ? [
        {
          label: "بنية التشغيل",
          score: opsScore,
          max: 60,
          icon: "gear",
          color: "#0D9488",
          bg: "rgba(13,148,136,0.12)",
        },
        {
          label: "وضوح نقاط الألم",
          score: Math.min(painScore, 30),
          max: 30,
          icon: "target",
          color: "#F59E0B",
          bg: "rgba(245,158,11,0.12)",
        },
        {
          label: "التبني التقني",
          score: Math.min(techScore, 16),
          max: 16,
          icon: "cpu",
          color: "#818CF8",
          bg: "rgba(129,140,248,0.12)",
        },
      ]
    : [
        {
          label: "Operations Foundation",
          score: opsScore,
          max: 60,
          icon: "gear",
          color: "#0D9488",
          bg: "rgba(13,148,136,0.12)",
        },
        {
          label: "Pain Point Clarity",
          score: Math.min(painScore, 30),
          max: 30,
          icon: "target",
          color: "#F59E0B",
          bg: "rgba(245,158,11,0.12)",
        },
        {
          label: "Tech Adoption",
          score: Math.min(techScore, 16),
          max: 16,
          icon: "cpu",
          color: "#818CF8",
          bg: "rgba(129,140,248,0.12)",
        },
      ];

  const recs = isAr
    ? [
        {
          band: [0, 25],
          items: [
            {
              icon: "cloud",
              title: "انتقل إلى السحابة أولاً",
              body: "ابدأ بأداة سحابية واحدة تحل مشكلتك الأكبر؛ Google Workspace أو Microsoft 365 خطوة ممتازة.",
              accent: "#3B82F6",
            },
            {
              icon: "spreadsheet",
              title: "وثّق عملياتك",
              body: "قبل الأتمتة، تأكد من توثيق سير العمل اليدوي حتى تعرف بالضبط ما تريد رقمنته.",
              accent: "#8B5CF6",
            },
            {
              icon: "users2",
              title: "استشر خبيراً",
              body: "جلسة استراتيجية واحدة مع Holdco تكشف أسرع الطرق للتحسين دون إنفاق كبير.",
              accent: "#0D9488",
            },
          ],
        },
        {
          band: [26, 50],
          items: [
            {
              icon: "link",
              title: "ادمج أدواتك",
              body: "استخدم منصة تكامل مثل Zapier أو Make.com لتوصيل الأنظمة المنفصلة ووقف الإدخال اليدوي المتكرر.",
              accent: "#F59E0B",
            },
            {
              icon: "barchart",
              title: "أنشئ لوحة بيانات واحدة",
              body: "مركزة مؤشرات الأداء الرئيسية في لوحة واحدة توفر رؤية فورية لقرارات أسرع.",
              accent: "#3B82F6",
            },
            {
              icon: "education",
              title: "درّب فريقك",
              body: "الأدوات الجيدة تفشل بدون تبني الفريق. ضع خطة تدريب مبسطة للأدوات الحالية.",
              accent: "#0D9488",
            },
          ],
        },
        {
          band: [51, 75],
          items: [
            {
              icon: "refresh",
              title: "وحّد نظامك",
              body: "ERP موحد يزيل الصوامع بين الأقسام ويمنحك رؤية شاملة في الوقت الفعلي.",
              accent: "#0D9488",
            },
            {
              icon: "cpu",
              title: "أتمتة العمليات المتكررة",
              body: "حدد العمليات التي تتكرر يومياً وأتمتها. الوقت المُوفَّر يمكن استثماره في النمو.",
              accent: "#8B5CF6",
            },
            {
              icon: "trendingup",
              title: "تحليلات متقدمة",
              body: "انتقل من التقارير التاريخية إلى التحليلات التنبؤية لتوقع الطلب وتحسين المخزون.",
              accent: "#F59E0B",
            },
          ],
        },
        {
          band: [76, 100],
          items: [
            {
              icon: "brain",
              title: "استثمر في الذكاء الاصطناعي",
              body: "أنت مستعد للأدوات المتقدمة: تحليل المشاعر، التوصيات الآلية، والنمذجة التنبؤية.",
              accent: "#818CF8",
            },
            {
              icon: "globe",
              title: "مقياسية للتوسع",
              body: "راجع بنيتك التقنية للتأكد من قدرتها على دعم التوسع الإقليمي دون اختناقات.",
              accent: "#0D9488",
            },
            {
              icon: "trophy",
              title: "كن مرجعاً في القطاع",
              body: "شارك تجربتك الرقمية مع شركاء وعملاء، وحوّلها إلى ميزة تنافسية معلنة.",
              accent: "#F59E0B",
            },
          ],
        },
      ]
    : [
        {
          band: [0, 25],
          items: [
            {
              icon: "cloud",
              title: "Start with One Cloud Tool",
              body: "Pick the single biggest manual pain point and replace it with a cloud tool. Google Workspace or Microsoft 365 is a solid first step.",
              accent: "#3B82F6",
            },
            {
              icon: "spreadsheet",
              title: "Document Your Processes",
              body: "Before automating anything, map your current manual workflows so you know exactly what to digitize first.",
              accent: "#8B5CF6",
            },
            {
              icon: "users2",
              title: "Book a Strategy Call",
              body: "One session with Holdco's team reveals the fastest improvement paths without big upfront spend.",
              accent: "#0D9488",
            },
          ],
        },
        {
          band: [26, 50],
          items: [
            {
              icon: "link",
              title: "Connect Your Tools",
              body: "Use an integration platform like Zapier or Make.com to bridge your disconnected systems and stop repetitive manual entry.",
              accent: "#F59E0B",
            },
            {
              icon: "barchart",
              title: "Build a Single Dashboard",
              body: "Centralizing your key metrics in one view gives you instant clarity for faster decisions.",
              accent: "#3B82F6",
            },
            {
              icon: "education",
              title: "Train Your Team",
              body: "Good tools fail without team adoption. Build a lightweight training plan for the tools you already have.",
              accent: "#0D9488",
            },
          ],
        },
        {
          band: [51, 75],
          items: [
            {
              icon: "refresh",
              title: "Unify Your Systems",
              body: "A unified ERP eliminates departmental silos and gives you a real-time, 360° view of your business.",
              accent: "#0D9488",
            },
            {
              icon: "cpu",
              title: "Automate Repetitive Tasks",
              body: "Identify daily repetitive tasks and automate them. The time saved goes straight back into growth.",
              accent: "#8B5CF6",
            },
            {
              icon: "trendingup",
              title: "Move to Predictive Analytics",
              body: "Shift from historical reports to predictive analytics to forecast demand and optimize inventory.",
              accent: "#F59E0B",
            },
          ],
        },
        {
          band: [76, 100],
          items: [
            {
              icon: "brain",
              title: "Invest in AI",
              body: "You're ready for advanced tools: sentiment analysis, automated recommendations, and predictive modelling.",
              accent: "#818CF8",
            },
            {
              icon: "globe",
              title: "Scale-Ready Architecture",
              body: "Audit your tech stack to ensure it can support regional expansion without bottlenecks.",
              accent: "#0D9488",
            },
            {
              icon: "trophy",
              title: "Become a Sector Reference",
              body: "Share your digital transformation story with partners and clients and turn it into a declared competitive advantage.",
              accent: "#F59E0B",
            },
          ],
        },
      ];

  const activeRecs =
    recs.find((r) => score >= r.band[0] && score <= r.band[1])?.items ??
    recs[0].items;
  const _scoreColor = level.gaugeColor;
  void _scoreColor;
  const heroGradient =
    score <= 25
      ? "linear-gradient(135deg, #6366F1 0%, #1B2C4B 100%)"
      : score <= 50
        ? "linear-gradient(135deg, #F59E0B 0%, #EA580C 100%)"
        : score <= 75
          ? "linear-gradient(135deg, #10B981 0%, #0891B2 100%)"
          : "linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)";
  const heroAccent =
    score <= 25
      ? "#6366F1"
      : score <= 50
        ? "#F59E0B"
        : score <= 75
          ? "#10B981"
          : "#8B5CF6";
  const r72 = 72;
  const circ72 = 2 * Math.PI * r72;
  const offset72 = circ72 - (score / 100) * circ72;

  const container = isTablet ? innerWide : inner;

  return (
    <div
      style={{ ...ws(lang), overflowY: "auto", background: "#F0F4FA" }}
      className="scrollbar-hide"
    >
      {/* ── VIVID HERO BANNER ─────────────────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          background: heroGradient,
        }}
      >
        {/* Decorative shapes */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: -60,
            width: 260,
            height: 260,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "30%",
            right: "20%",
            width: 180,
            height: 180,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            ...container,
            position: "relative",
            zIndex: 1,
            padding: isTablet ? "32px 48px 52px" : "24px 20px 44px",
          }}
        >
          {/* Nav */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: isTablet ? 44 : 30,
            }}
          >
            <button
              onClick={onBack}
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 12,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                color: "white",
                fontSize: 13,
                fontWeight: 600,
                fontFamily: ff,
                padding: "9px 16px",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                <path
                  d={isAr ? "M7 4.5L12 9L7 13.5" : "M11 4.5L6 9L11 13.5"}
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {isAr ? "رجوع" : "Back"}
            </button>
            <LogoPair height={26} invert />
          </div>

          {/* Score + identity */}
          <div
            style={{
              display: "flex",
              flexDirection: isTablet ? "row" : "column",
              alignItems: isTablet ? "center" : "stretch",
              gap: isTablet ? 56 : 28,
            }}
          >
            {/* Left: identity + message + KPI tiles */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 18,
                textAlign: isTablet ? (isAr ? "right" : "left") : "center",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.6)",
                    letterSpacing: 2.5,
                    textTransform: "uppercase",
                    fontWeight: 700,
                    marginBottom: 10,
                    fontFamily: ff,
                  }}
                >
                  {isAr ? "تقرير النضوج الرقمي" : "Digital Maturity Report"}
                </div>
                {formData.name && (
                  <h1
                    style={{
                      fontSize: isTablet ? 40 : 26,
                      fontWeight: 900,
                      color: "white",
                      lineHeight: 1.1,
                      letterSpacing: -1,
                      marginBottom: 6,
                      fontFamily: ff,
                    }}
                  >
                    {isAr ? "مرحباً،" : "Hello,"}
                    <br />
                    <span style={{ color: "rgba(255,255,255,0.85)" }}>
                      {formData.name}
                    </span>
                  </h1>
                )}
                {formData.company && (
                  <p
                    style={{
                      fontSize: 14,
                      color: "rgba(255,255,255,0.5)",
                      fontFamily: ff,
                    }}
                  >
                    {formData.company}
                  </p>
                )}
              </div>

              {/* Message */}
              <div
                style={{
                  background: "rgba(255,255,255,0.15)",
                  borderRadius: 16,
                  padding: "16px 20px",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <p
                  style={{
                    fontSize: isTablet ? 15 : 14,
                    color: "white",
                    lineHeight: 1.8,
                    margin: 0,
                    fontFamily: ff,
                    opacity: 0.92,
                  }}
                >
                  {level.message}
                </p>
              </div>

              {/* KPI tiles — 3 dimension scores */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 10,
                }}
              >
                {dims.map((d) => (
                  <div
                    key={d.label}
                    style={{
                      background: "rgba(255,255,255,0.18)",
                      borderRadius: 14,
                      padding: "14px 10px",
                      border: "1px solid rgba(255,255,255,0.25)",
                      textAlign: "center",
                    }}
                  >
                    <IconShape name={d.icon} size={24} />
                    <div
                      style={{
                        fontSize: isTablet ? 28 : 24,
                        fontWeight: 900,
                        color: "white",
                        fontFamily: ff,
                        letterSpacing: -1,
                        marginTop: 6,
                        lineHeight: 1,
                      }}
                    >
                      {d.score}
                      <span
                        style={{
                          fontSize: 11,
                          color: "rgba(255,255,255,0.45)",
                          fontWeight: 500,
                        }}
                      >
                        /{d.max}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: isTablet ? 11 : 10,
                        color: "rgba(255,255,255,0.6)",
                        fontFamily: ff,
                        fontWeight: 600,
                        marginTop: 4,
                        lineHeight: 1.3,
                      }}
                    >
                      {d.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Score ring */}
            <div
              className="pop-in"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: isTablet ? 220 : 188,
                  height: isTablet ? 220 : 188,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 14,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.12)",
                    filter: "blur(16px)",
                  }}
                />
                <svg
                  viewBox="0 0 200 200"
                  width={isTablet ? 220 : 188}
                  height={isTablet ? 220 : 188}
                  style={{ position: "relative", zIndex: 1 }}
                >
                  <circle
                    cx="100"
                    cy="100"
                    r={r72}
                    fill="none"
                    stroke="rgba(255,255,255,0.18)"
                    strokeWidth="16"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r={r72}
                    fill="none"
                    stroke="white"
                    strokeWidth="16"
                    strokeLinecap="round"
                    strokeDasharray={circ72}
                    strokeDashoffset={offset72}
                    style={{
                      transform: "rotate(-90deg)",
                      transformOrigin: "center",
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
                    zIndex: 2,
                  }}
                >
                  <span
                    style={{
                      fontSize: isTablet ? 64 : 54,
                      fontWeight: 900,
                      color: "white",
                      lineHeight: 1,
                      fontFamily: ff,
                      letterSpacing: -3,
                    }}
                  >
                    {score}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      color: "rgba(255,255,255,0.55)",
                      fontWeight: 700,
                      letterSpacing: 2.5,
                      textTransform: "uppercase",
                      fontFamily: ff,
                      marginTop: 4,
                    }}
                  >
                    {ui.gaugeOf}
                  </span>
                </div>
              </div>
              {/* Level badge */}
              <div
                style={{
                  marginTop: 18,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "9px 20px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.2)",
                  border: "1.5px solid rgba(255,255,255,0.35)",
                  backdropFilter: "none",
                }}
              >
                <IconShape name={level.emoji} size={28} />
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 800,
                    color: "white",
                    fontFamily: ff,
                  }}
                >
                  {level.label}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── DASHBOARD BODY ─────────────────────────────────────────────────────── */}
      <div
        style={{
          ...container,
          padding: isTablet ? "40px 40px 80px" : "24px 16px 64px",
          display: "flex",
          flexDirection: "column",
          gap: isTablet ? 28 : 18,
        }}
      >
        {/* Score breakdown — horizontal bar chart style */}
        <div
          className="fade-up"
          style={{
            background: "white",
            borderRadius: 22,
            padding: isTablet ? "28px 32px" : "22px 20px",
            boxShadow: "0 2px 16px rgba(27,44,75,0.07)",
            border: `1px solid ${BORDER}`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 24,
            }}
          >
            <IconShape name="barchart" size={32} />
            <p
              style={{
                fontSize: isTablet ? 16 : 14,
                fontWeight: 800,
                color: T1,
                fontFamily: ff,
                margin: 0,
              }}
            >
              {isAr ? "تفصيل الدرجات" : "Score Breakdown"}
            </p>
            <div
              style={{
                marginInlineStart: "auto",
                fontSize: 13,
                fontWeight: 900,
                color: heroAccent,
                fontFamily: ff,
                background: hexRgba(heroAccent, 0.12),
                padding: "4px 14px",
                borderRadius: 999,
              }}
            >
              {score}/100
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {dims.map((d) => {
              const pctBar = Math.round((d.score / d.max) * 100);
              return (
                <div key={d.label}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 8,
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <IconShape name={d.icon} size={28} />
                      <span
                        style={{
                          fontSize: isTablet ? 14 : 13,
                          color: T1,
                          fontWeight: 700,
                          fontFamily: ff,
                        }}
                      >
                        {d.label}
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: isTablet ? 15 : 14,
                        fontWeight: 900,
                        color: d.color,
                        fontFamily: ff,
                      }}
                    >
                      {pctBar}%
                    </span>
                  </div>
                  <div
                    style={{
                      height: 12,
                      borderRadius: 999,
                      background: "#EEF2F7",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        borderRadius: 999,
                        background: `linear-gradient(90deg, ${hexRgba(d.color, 0.7)}, ${d.color})`,
                        width: `${pctBar}%`,
                        transition: "width 1s cubic-bezier(0.34,1.56,0.64,1)",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Maturity map */}
        <div
          className="fade-up"
          style={{
            background: "white",
            borderRadius: 22,
            padding: isTablet ? "28px 32px" : "22px 20px",
            boxShadow: "0 2px 16px rgba(27,44,75,0.07)",
            border: `1px solid ${BORDER}`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 22,
            }}
          >
            <IconShape name="target" size={32} />
            <p
              style={{
                fontSize: isTablet ? 16 : 14,
                fontWeight: 800,
                color: T1,
                fontFamily: ff,
                margin: 0,
              }}
            >
              {isAr
                ? "موقعك على خريطة النضوج"
                : "Your Position on the Maturity Map"}
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 8,
              marginBottom: 18,
            }}
          >
            {[
              {
                label: isAr ? "في البداية" : "Starting",
                sub: "0–25",
                bg: "linear-gradient(135deg,#64748B,#94A3B8)",
                active: score <= 25,
              },
              {
                label: isAr ? "بطل يدوي" : "Manual Hero",
                sub: "26–50",
                bg: "linear-gradient(135deg,#D97706,#FBBF24)",
                active: score > 25 && score <= 50,
              },
              {
                label: isAr ? "منظم" : "Systemized",
                sub: "51–75",
                bg: "linear-gradient(135deg,#0F766E,#34D399)",
                active: score > 50 && score <= 75,
              },
              {
                label: isAr ? "رقمي متقدم" : "Digitally Fluent",
                sub: "76–100",
                bg: "linear-gradient(135deg,#6366F1,#8B5CF6)",
                active: score > 75,
              },
            ].map((z, i) => (
              <div
                key={i}
                style={{
                  borderRadius: 14,
                  padding: "14px 10px",
                  background: z.active ? z.bg : "#F1F5F9",
                  textAlign: "center",
                  boxShadow: z.active ? "0 8px 24px rgba(0,0,0,0.18)" : "none",
                  transform: z.active ? "translateY(-4px) scale(1.04)" : "none",
                  transition: "all 0.3s",
                }}
              >
                <div
                  style={{
                    fontSize: isTablet ? 13 : 11,
                    fontWeight: 800,
                    color: z.active ? "white" : "#94A3B8",
                    fontFamily: ff,
                    lineHeight: 1.3,
                  }}
                >
                  {z.label}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: z.active ? "rgba(255,255,255,0.65)" : "#CBD5E1",
                    fontFamily: ff,
                    marginTop: 3,
                  }}
                >
                  {z.sub}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              background: level.accentBg,
              borderRadius: 14,
              padding: "14px 18px",
              border: `1px solid ${level.accentBorder}`,
            }}
          >
            <p
              style={{
                fontSize: isTablet ? 14 : 13,
                color: level.accent,
                fontWeight: 600,
                margin: 0,
                fontFamily: ff,
                lineHeight: 1.6,
              }}
            >
              {isAr
                ? `درجتك ${score} تضعك في فئة "${level.label}". ${score < 50 ? "معظم الشركات الناجحة بدأت من هنا." : score < 76 ? "أنت في المنتصف العلوي، وقرارات بسيطة ستنقلك للقمة." : "أنت في النخبة. استمر في الاستثمار في التقنية."}`
                : `Your score of ${score} places you in the "${level.label}" tier. ${score < 50 ? "Most successful businesses started exactly here." : score < 76 ? "You're in the upper-middle — a few smart moves will get you to the top." : "You're in the top tier. Keep investing in technology."}`}
            </p>
          </div>
        </div>

        {/* Quick win — vivid colored card */}
        <div
          className="fade-up"
          style={{
            borderRadius: 22,
            padding: isTablet ? "28px 32px" : "22px 20px",
            background: heroGradient,
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -30,
              right: -30,
              width: 140,
              height: 140,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              display: "flex",
              gap: isTablet ? 20 : 14,
              alignItems: "flex-start",
              position: "relative",
            }}
          >
            <div
              style={{
                flexShrink: 0,
                width: isTablet ? 56 : 48,
                height: isTablet ? 56 : 48,
                borderRadius: 16,
                background: "rgba(255,255,255,0.2)",
                border: "1.5px solid rgba(255,255,255,0.35)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconShape name="lightbulb" size={isTablet ? 30 : 26} />
            </div>
            <div>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: "rgba(255,255,255,0.7)",
                  letterSpacing: 1.8,
                  marginBottom: 8,
                  textTransform: "uppercase",
                  fontFamily: ff,
                }}
              >
                {isAr ? "فرصتك الأسرع للتحسين" : "YOUR QUICKEST WIN"}
              </p>
              <p
                style={{
                  fontSize: isTablet ? 16 : 14,
                  color: "white",
                  lineHeight: 1.85,
                  margin: 0,
                  fontFamily: ff,
                  fontWeight: 500,
                  opacity: 0.92,
                }}
              >
                {level.tip}
              </p>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="fade-up">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 16,
            }}
          >
            <IconShape name="rocket" size={32} />
            <p
              style={{
                fontSize: isTablet ? 16 : 14,
                fontWeight: 800,
                color: T1,
                fontFamily: ff,
                margin: 0,
              }}
            >
              {isAr ? "توصياتنا لك" : "Our Recommendations for You"}
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isTablet ? "repeat(3, 1fr)" : "1fr",
              gap: isTablet ? 16 : 12,
            }}
          >
            {activeRecs.map((rec, i) => (
              <div
                key={i}
                style={{
                  borderRadius: 20,
                  overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(27,44,75,0.1)",
                  background: "white",
                }}
              >
                <div
                  style={{
                    background: rec.accent,
                    padding: "16px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 12,
                      background: "rgba(255,255,255,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <IconShape name={rec.icon} size={24} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 10,
                        color: "rgba(255,255,255,0.65)",
                        fontWeight: 700,
                        fontFamily: ff,
                        letterSpacing: 1.2,
                        textTransform: "uppercase",
                      }}
                    >
                      {isAr ? `الخطوة ${i + 1}` : `Step ${i + 1}`}
                    </div>
                    <div
                      style={{
                        fontSize: isTablet ? 14 : 13,
                        color: "white",
                        fontWeight: 800,
                        fontFamily: ff,
                        lineHeight: 1.3,
                        marginTop: 2,
                      }}
                    >
                      {rec.title}
                    </div>
                  </div>
                </div>
                <div style={{ padding: "16px 20px" }}>
                  <p
                    style={{
                      fontSize: isTablet ? 13 : 12,
                      color: T2,
                      lineHeight: 1.8,
                      margin: 0,
                      fontFamily: ff,
                    }}
                  >
                    {rec.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA banner */}
        <div
          className="fade-up"
          style={{
            borderRadius: 22,
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
          }}
        >
          <div style={{ height: 6, background: heroGradient }} />
          <div
            style={{
              background: "white",
              padding: isTablet ? "40px 48px" : "28px 22px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 20,
              }}
            >
              <LogoPair height={32} />
            </div>
            <p
              style={{
                fontSize: isTablet ? 26 : 20,
                fontWeight: 900,
                color: T1,
                marginBottom: 12,
                fontFamily: ff,
                letterSpacing: -0.5,
                lineHeight: 1.2,
              }}
            >
              {isAr
                ? "احجز جلسة مجانية مع خبرائنا"
                : "Book a Free Expert Session"}
            </p>
            <p
              style={{
                fontSize: isTablet ? 15 : 13,
                color: T2,
                lineHeight: 1.8,
                marginBottom: 28,
                fontFamily: ff,
                maxWidth: 440,
                margin: "0 auto 28px",
              }}
            >
              {isAr
                ? "سنراجع تقريرك معك ونبني خارطة طريق مخصصة لتحقيق أهدافك الرقمية."
                : "We'll review your results together and build a custom roadmap to hit your digital goals."}
            </p>
            <a
              href={getBookingUrl()}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                padding: isTablet ? "18px 52px" : "16px 38px",
                borderRadius: 16,
                background: heroGradient,
                color: "white",
                fontWeight: 800,
                fontSize: isTablet ? 16 : 15,
                cursor: "pointer",
                fontFamily: ff,
                boxShadow: "0 8px 28px rgba(0,0,0,0.2)",
                textDecoration: "none",
                letterSpacing: 0.3,
              }}
            >
              {isAr ? "احجز جلستك المجانية" : "Book My Free Session"}
              <span style={{ fontSize: 20 }}>{ui.arrow}</span>
            </a>
            {formData.email && (
              <p
                style={{
                  fontSize: 12,
                  color: T3,
                  marginTop: 20,
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
                  {isAr
                    ? `تم إرسال هذا التقرير إلى ${formData.email}`
                    : `This report was sent to ${formData.email}`}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
