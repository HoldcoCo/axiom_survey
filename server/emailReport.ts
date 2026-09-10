/**
 * SMTP email sender — builds an HTML email matching the ReportScreen design
 * and sends it via nodemailer. Gracefully skips when SMTP is not configured.
 */

import nodemailer from "nodemailer";
import { LEVELS_AR } from "../src/data/levels.ar";
import { LEVELS_EN } from "../src/data/levels.en";
import { escapeHtml } from "../src/lib/serializeAnswers";
import type { Lang, LevelData, SerializedAnswer } from "../src/types";

/* ────────────────────────────── Types ────────────────────────────── */

interface SmtpConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
  fromName: string;
}

export interface ReportEmailPayload {
  to: string;
  name: string;
  company: string;
  score: number;
  levelLabel: string;
  lang: Lang;
  answers: SerializedAnswer[];
}

interface Recommendation {
  title: string;
  body: string;
  accent: string;
}

interface HeroColors {
  gradient: string;
  solid: string;
  accent: string;
}

/* ────────────────────────────── SMTP Config ────────────────────────────── */

/**
 * Loads SMTP settings from environment variables.
 * Returns null when the required vars (host, user, pass) are missing.
 */
export function getSmtpConfig(): SmtpConfig | null {
  const host = process.env.SMTP_HOST?.trim();
  const portRaw = process.env.SMTP_PORT?.trim() ?? "587";
  const port = Number.isFinite(parseInt(portRaw, 10))
    ? parseInt(portRaw, 10)
    : 587;
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  const from = process.env.SMTP_FROM?.trim();
  const fromName = process.env.SMTP_FROM_NAME?.trim() ?? "Holdco";

  if (
    !host ||
    host.length === 0 ||
    !user ||
    user.length === 0 ||
    !pass ||
    pass.length === 0 ||
    !from ||
    from.length === 0
  ) {
    return null;
  }

  return { host, port, user, pass, from, fromName };
}

/* ────────────────────────────── Helpers ────────────────────────────── */

/** Same band logic as src/lib/scoring.ts getLevel(). */
function getLevel(score: number, lang: Lang): LevelData {
  const levels = lang === "ar" ? LEVELS_AR : LEVELS_EN;
  if (score <= 25) return levels[0];
  if (score <= 50) return levels[1];
  if (score <= 75) return levels[2];
  return levels[3];
}

/** Maps score to the hero gradient / fallback solid colour. */
function heroColors(score: number): HeroColors {
  if (score <= 25) {
    return {
      gradient: "linear-gradient(135deg, #6366F1 0%, #1B2C4B 100%)",
      solid: "#3B4F8A",
      accent: "#6366F1",
    };
  }
  if (score <= 50) {
    return {
      gradient: "linear-gradient(135deg, #F59E0B 0%, #EA580C 100%)",
      solid: "#E87E0C",
      accent: "#F59E0B",
    };
  }
  if (score <= 75) {
    return {
      gradient: "linear-gradient(135deg, #10B981 0%, #0891B2 100%)",
      solid: "#0CA28A",
      accent: "#10B981",
    };
  }
  return {
    gradient: "linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)",
    solid: "#6370F4",
    accent: "#8B5CF6",
  };
}

/** Returns the booking URL from env (falls back to a sensible default). */
function getBookingUrl(): string {
  return (
    process.env.VITE_BOOKING_URL?.trim() ??
    process.env.BOOKING_URL?.trim() ??
    "https://holdco.co"
  );
}

/* ────────────────────────── Recommendation Data ─────────────────────── */

/** Mirrors the recommendation bands from ReportScreen. */
function getRecommendations(score: number, lang: Lang): Recommendation[] {
  const isAr = lang === "ar";
  const allBands = isAr
    ? [
        {
          band: [0, 25] as const,
          items: [
            {
              title: "انتقل إلى السحابة أولاً",
              body: "ابدأ بأداة سحابية واحدة تحل مشكلتك الأكبر؛ Google Workspace أو Microsoft 365 خطوة ممتازة.",
              accent: "#3B82F6",
            },
            {
              title: "وثّق عملياتك",
              body: "قبل الأتمتة، تأكد من توثيق سير العمل اليدوي حتى تعرف بالضبط ما تريد رقمنته.",
              accent: "#8B5CF6",
            },
            {
              title: "استشر خبيراً",
              body: "جلسة استراتيجية واحدة مع Holdco تكشف أسرع الطرق للتحسين دون إنفاق كبير.",
              accent: "#0D9488",
            },
          ],
        },
        {
          band: [26, 50] as const,
          items: [
            {
              title: "ادمج أدواتك",
              body: "استخدم منصة تكامل مثل Zapier أو Make.com لتوصيل الأنظمة المنفصلة ووقف الإدخال اليدوي المتكرر.",
              accent: "#F59E0B",
            },
            {
              title: "أنشئ لوحة بيانات واحدة",
              body: "مركزة مؤشرات الأداء الرئيسية في لوحة واحدة توفر رؤية فورية لقرارات أسرع.",
              accent: "#3B82F6",
            },
            {
              title: "درّب فريقك",
              body: "الأدوات الجيدة تفشل بدون تبني الفريق. ضع خطة تدريب مبسطة للأدوات الحالية.",
              accent: "#0D9488",
            },
          ],
        },
        {
          band: [51, 75] as const,
          items: [
            {
              title: "وحّد نظامك",
              body: "ERP موحد يزيل الصوامع بين الأقسام ويمنحك رؤية شاملة في الوقت الفعلي.",
              accent: "#0D9488",
            },
            {
              title: "أتمتة العمليات المتكررة",
              body: "حدد العمليات التي تتكرر يومياً وأتمتها. الوقت المُوفَّر يمكن استثماره في النمو.",
              accent: "#8B5CF6",
            },
            {
              title: "تحليلات متقدمة",
              body: "انتقل من التقارير التاريخية إلى التحليلات التنبؤية لتوقع الطلب وتحسين المخزون.",
              accent: "#F59E0B",
            },
          ],
        },
        {
          band: [76, 100] as const,
          items: [
            {
              title: "استثمر في الذكاء الاصطناعي",
              body: "أنت مستعد للأدوات المتقدمة: تحليل المشاعر، التوصيات الآلية، والنمذجة التنبؤية.",
              accent: "#818CF8",
            },
            {
              title: "مقياسية للتوسع",
              body: "راجع بنيتك التقنية للتأكد من قدرتها على دعم التوسع الإقليمي دون اختناقات.",
              accent: "#0D9488",
            },
            {
              title: "كن مرجعاً في القطاع",
              body: "شارك تجربتك الرقمية مع شركاء وعملاء، وحوّلها إلى ميزة تنافسية معلنة.",
              accent: "#F59E0B",
            },
          ],
        },
      ]
    : [
        {
          band: [0, 25] as const,
          items: [
            {
              title: "Start with One Cloud Tool",
              body: "Pick the single biggest manual pain point and replace it with a cloud tool. Google Workspace or Microsoft 365 is a solid first step.",
              accent: "#3B82F6",
            },
            {
              title: "Document Your Processes",
              body: "Before automating anything, map your current manual workflows so you know exactly what to digitize first.",
              accent: "#8B5CF6",
            },
            {
              title: "Book a Strategy Call",
              body: "One session with Holdco's team reveals the fastest improvement paths without big upfront spend.",
              accent: "#0D9488",
            },
          ],
        },
        {
          band: [26, 50] as const,
          items: [
            {
              title: "Connect Your Tools",
              body: "Use an integration platform like Zapier or Make.com to bridge your disconnected systems and stop repetitive manual entry.",
              accent: "#F59E0B",
            },
            {
              title: "Build a Single Dashboard",
              body: "Centralizing your key metrics in one view gives you instant clarity for faster decisions.",
              accent: "#3B82F6",
            },
            {
              title: "Train Your Team",
              body: "Good tools fail without team adoption. Build a lightweight training plan for the tools you already have.",
              accent: "#0D9488",
            },
          ],
        },
        {
          band: [51, 75] as const,
          items: [
            {
              title: "Unify Your Systems",
              body: "A unified ERP eliminates departmental silos and gives you a real-time, 360\u00B0 view of your business.",
              accent: "#0D9488",
            },
            {
              title: "Automate Repetitive Tasks",
              body: "Identify daily repetitive tasks and automate them. The time saved goes straight back into growth.",
              accent: "#8B5CF6",
            },
            {
              title: "Move to Predictive Analytics",
              body: "Shift from historical reports to predictive analytics to forecast demand and optimize inventory.",
              accent: "#F59E0B",
            },
          ],
        },
        {
          band: [76, 100] as const,
          items: [
            {
              title: "Invest in AI",
              body: "You're ready for advanced tools: sentiment analysis, automated recommendations, and predictive modelling.",
              accent: "#818CF8",
            },
            {
              title: "Scale-Ready Architecture",
              body: "Audit your tech stack to ensure it can support regional expansion without bottlenecks.",
              accent: "#0D9488",
            },
            {
              title: "Become a Sector Reference",
              body: "Share your digital transformation story with partners and clients and turn it into a declared competitive advantage.",
              accent: "#F59E0B",
            },
          ],
        },
      ];

  const match = allBands.find((b) => score >= b.band[0] && score <= b.band[1]);
  return match?.items ?? allBands[0].items;
}

/* ────────────────────────── HTML Email Builder ──────────────────────── */

/**
 * Builds a table-based HTML email that mirrors the ReportScreen design.
 * Uses inline styles for maximum email client compatibility.
 */
function buildReportEmailHtml(payload: ReportEmailPayload): string {
  const { name, company, score, lang, answers } = payload;
  const isAr = lang === "ar";
  const dir = isAr ? "rtl" : "ltr";
  const align = isAr ? "right" : "left";
  const ff = isAr
    ? "Cairo, Tahoma, Arial, sans-serif"
    : "Inter, Arial, Helvetica, sans-serif";
  const level = getLevel(score, lang);
  const hero = heroColors(score);
  const recs = getRecommendations(score, lang);
  const bookingUrl = getBookingUrl();

  const preheader = isAr
    ? `درجة النضوج الرقمي: ${String(score)}/100 — المستوى: ${escapeHtml(level.label)}`
    : `Your Digital Maturity Score: ${String(score)}/100 — Level: ${escapeHtml(level.label)}`;

  const maturityBlurb = isAr
    ? `درجتك ${String(score)} تضعك في فئة &ldquo;${escapeHtml(level.label)}&rdquo;. ${score < 50 ? "معظم الشركات الناجحة بدأت من هنا." : score < 76 ? "أنت في المنتصف العلوي، وقرارات بسيطة ستنقلك للقمة." : "أنت في النخبة. استمر في الاستثمار في التقنية."}`
    : `Your score of ${String(score)} places you in the &ldquo;${escapeHtml(level.label)}&rdquo; tier. ${score < 50 ? "Most successful businesses started exactly here." : score < 76 ? "You&#8217;re in the upper-middle &#8212; a few smart moves will get you to the top." : "You&#8217;re in the top tier. Keep investing in technology."}`;

  const recRows = recs
    .map(
      (rec, i) => `
      <tr>
        <td style="padding:0 0 12px 0;">
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
                 style="border-radius:12px;overflow:hidden;border:1px solid #E4E9F0;">
            <tr>
              <td style="background:${escapeHtml(rec.accent)};padding:14px 20px;">
                <p style="margin:0;font-family:${ff};font-size:10px;font-weight:700;color:rgba(255,255,255,0.65);letter-spacing:1.2px;text-transform:uppercase;">
                  ${isAr ? `الخطوة ${String(i + 1)}` : `Step ${String(i + 1)}`}
                </p>
                <p style="margin:4px 0 0;font-family:${ff};font-size:14px;font-weight:800;color:#FFFFFF;line-height:1.4;">
                  ${escapeHtml(rec.title)}
                </p>
              </td>
            </tr>
            <tr>
              <td style="background:#FFFFFF;padding:16px 20px;">
                <p style="margin:0;font-family:${ff};font-size:13px;color:#64748B;line-height:1.8;">
                  ${escapeHtml(rec.body)}
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>`,
    )
    .join("");

  const answerRows = answers
    .map(
      (a, i) => `
      <tr>
        <td style="padding:0 0 14px 0;">
          <p style="margin:0;font-family:${ff};font-size:13px;font-weight:700;color:#1B2C4B;line-height:1.6;">
            ${String(i + 1)}. ${escapeHtml(a.question)}
          </p>
          <p style="margin:4px 0 0;font-family:${ff};font-size:13px;color:#64748B;line-height:1.6;">
            ${a.answers.map(escapeHtml).join(", ")}
          </p>
        </td>
      </tr>`,
    )
    .join("");

  const greetingHtml =
    name.trim().length > 0
      ? `<h1 style="margin:0 0 4px;font-family:${ff};font-size:28px;font-weight:900;color:#FFFFFF;line-height:1.2;letter-spacing:-0.5px;">
        ${isAr ? "مرحباً،" : "Hello,"}
        <br />
        <span style="color:rgba(255,255,255,0.85);">${escapeHtml(name.trim())}</span>
      </h1>`
      : "";

  const companyHtml =
    company.trim().length > 0
      ? `<p style="margin:0;font-family:${ff};font-size:14px;color:rgba(255,255,255,0.55);">${escapeHtml(company.trim())}</p>`
      : "";

  return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>${isAr ? "تقرير النضوج الرقمي" : "Digital Maturity Report"}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG />
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <style>
    table { border-collapse: collapse; }
    td { font-family: Arial, sans-serif; }
  </style>
  <![endif]-->
  <style>
    body, table, td { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    @media only screen and (max-width: 620px) {
      .email-container { width: 100% !important; max-width: 100% !important; }
      .mobile-padding { padding-left: 20px !important; padding-right: 20px !important; }
      .score-number { font-size: 44px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#F0F4FA;width:100%;font-family:${ff};">
  <!-- Hidden preheader -->
  <div style="display:none;font-size:1px;color:#F0F4FA;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
    ${escapeHtml(preheader)}
    ${"&zwnj;&nbsp;".repeat(30)}
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F0F4FA;">
    <tr>
      <td align="center" style="padding:24px 16px;">
        <table role="presentation" class="email-container" width="600" cellpadding="0" cellspacing="0"
               style="max-width:600px;width:100%;margin:0 auto;">

          <!-- ═══════════════════ HERO BANNER ═══════════════════ -->
          <tr>
            <td style="background:${hero.gradient};background-color:${hero.solid};border-radius:16px 16px 0 0;padding:40px 32px;text-align:center;"
                class="mobile-padding">

              <!-- Report label -->
              <p style="margin:0 0 20px;font-family:${ff};font-size:11px;color:rgba(255,255,255,0.6);letter-spacing:2.5px;text-transform:uppercase;font-weight:700;">
                ${isAr ? "تقرير النضوج الرقمي" : "Digital Maturity Report"}
              </p>

              ${greetingHtml}
              ${companyHtml}

              <!-- Score circle -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px auto 0;">
                <tr>
                  <td align="center">
                    <div style="width:160px;height:160px;border-radius:50%;border:12px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.12);text-align:center;display:inline-block;">
                      <table role="presentation" width="100%" height="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="center" valign="middle" style="vertical-align:middle;">
                            <span class="score-number" style="font-family:${ff};font-size:56px;font-weight:900;color:#FFFFFF;line-height:1;letter-spacing:-3px;">
                              ${String(score)}
                            </span>
                            <br />
                            <span style="font-family:${ff};font-size:11px;color:rgba(255,255,255,0.55);font-weight:700;letter-spacing:2.5px;text-transform:uppercase;">
                              ${isAr ? "من 100" : "out of 100"}
                            </span>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Level badge -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:20px auto 0;">
                <tr>
                  <td style="background:rgba(255,255,255,0.2);border:1.5px solid rgba(255,255,255,0.35);border-radius:999px;padding:10px 24px;">
                    <span style="font-family:${ff};font-size:14px;font-weight:800;color:#FFFFFF;">
                      ${escapeHtml(level.label)}
                    </span>
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0 0;">
                <tr>
                  <td style="background:rgba(255,255,255,0.15);border-radius:14px;padding:16px 20px;border:1px solid rgba(255,255,255,0.2);">
                    <p style="margin:0;font-family:${ff};font-size:14px;color:#FFFFFF;line-height:1.8;opacity:0.92;text-align:${align};">
                      ${escapeHtml(level.message)}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ═══════════════════ BODY CONTENT ═══════════════════ -->
          <tr>
            <td style="background:#FFFFFF;padding:32px;text-align:${align};" class="mobile-padding">

              <!-- Quick Win -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
                <tr>
                  <td style="background:${hero.gradient};background-color:${hero.solid};border-radius:14px;padding:22px 24px;">
                    <p style="margin:0 0 8px;font-family:${ff};font-size:11px;font-weight:800;color:rgba(255,255,255,0.7);letter-spacing:1.8px;text-transform:uppercase;">
                      ${isAr ? "فرصتك الأسرع للتحسين" : "YOUR QUICKEST WIN"}
                    </p>
                    <p style="margin:0;font-family:${ff};font-size:14px;color:#FFFFFF;line-height:1.85;font-weight:500;opacity:0.92;">
                      ${escapeHtml(level.tip)}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Maturity blurb -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
                <tr>
                  <td style="background:${escapeHtml(level.accentBg)};border:1px solid ${escapeHtml(level.accentBorder)};border-radius:14px;padding:16px 20px;">
                    <p style="margin:0;font-family:${ff};font-size:14px;color:${escapeHtml(level.accent)};font-weight:600;line-height:1.7;">
                      ${maturityBlurb}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Recommendations heading -->
              <p style="margin:0 0 16px;font-family:${ff};font-size:16px;font-weight:800;color:#1B2C4B;">
                ${isAr ? "توصياتنا لك" : "Our Recommendations for You"}
              </p>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${recRows}
              </table>

              <!-- Your Answers heading -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0 0;">
                <tr>
                  <td style="border-top:1px solid #E4E9F0;padding:24px 0 0;">
                    <p style="margin:0 0 16px;font-family:${ff};font-size:16px;font-weight:800;color:#1B2C4B;">
                      ${isAr ? "إجاباتك" : "Your Answers"}
                    </p>
                  </td>
                </tr>
              </table>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${answerRows}
              </table>
            </td>
          </tr>

          <!-- ═══════════════════ CTA SECTION ═══════════════════ -->
          <tr>
            <td style="padding:0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="height:6px;background:${hero.gradient};background-color:${hero.solid};font-size:1px;line-height:1px;">&nbsp;</td>
                </tr>
              </table>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border-radius:0 0 16px 16px;">
                <tr>
                  <td style="padding:36px 32px;text-align:center;" class="mobile-padding">
                    <p style="margin:0 0 10px;font-family:${ff};font-size:22px;font-weight:900;color:#1B2C4B;letter-spacing:-0.5px;line-height:1.3;">
                      ${isAr ? "احجز جلسة مجانية مع خبرائنا" : "Book a Free Expert Session"}
                    </p>
                    <p style="margin:0 0 28px;font-family:${ff};font-size:14px;color:#64748B;line-height:1.8;">
                      ${
                        isAr
                          ? "سنراجع تقريرك معك ونبني خارطة طريق مخصصة لتحقيق أهدافك الرقمية."
                          : "We&#8217;ll review your results together and build a custom roadmap to hit your digital goals."
                      }
                    </p>
                    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
                      <tr>
                        <td style="border-radius:14px;background:${hero.gradient};background-color:${hero.solid};">
                          <a href="${escapeHtml(bookingUrl)}" target="_blank" rel="noopener noreferrer"
                             style="display:inline-block;padding:16px 44px;font-family:${ff};font-size:15px;font-weight:800;color:#FFFFFF;text-decoration:none;letter-spacing:0.3px;">
                            ${isAr ? "احجز جلستك المجانية &larr;" : "Book My Free Session &rarr;"}
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ═══════════════════ FOOTER ═══════════════════ -->
          <tr>
            <td style="padding:28px 32px;text-align:center;">
              <p style="margin:0 0 8px;font-family:${ff};font-size:13px;font-weight:700;color:#1B2C4B;">
                Holdco
              </p>
              <p style="margin:0;font-family:${ff};font-size:12px;color:#9AABBD;line-height:1.6;">
                ${
                  isAr
                    ? "هذا البريد تم إرساله تلقائياً بناءً على تقييم النضوج الرقمي الخاص بك."
                    : "This email was sent automatically based on your Digital Health Check assessment."
                }
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/* ────────────────────────── Send Email ──────────────────────────── */

/**
 * Sends the HTML report email via SMTP.
 * Returns true on success, false on failure or missing config.
 * Never throws — all errors are caught and logged.
 */
export async function sendReportEmail(
  payload: ReportEmailPayload,
): Promise<boolean> {
  const smtp = getSmtpConfig();
  if (smtp === null) {
    console.log("[email] SMTP not configured — skipping report email");
    return false;
  }

  const isAr = payload.lang === "ar";
  const subject = isAr
    ? `درجة النضوج الرقمي: ${String(payload.score)}/100`
    : `Your Digital Maturity Score: ${String(payload.score)}/100`;

  const html = buildReportEmailHtml(payload);

  try {
    const transport = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.port === 465,
      auth: { user: smtp.user, pass: smtp.pass },
    });

    await transport.sendMail({
      from: `"${smtp.fromName}" <${smtp.from}>`,
      to: payload.to,
      subject,
      html,
    });

    console.log(`[email] Report sent to ${payload.to}`);
    return true;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown SMTP error";
    console.error(`[email] Failed to send report to ${payload.to}:`, message);
    return false;
  }
}
