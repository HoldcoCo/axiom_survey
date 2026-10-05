import React from "react";
import type { Lang } from "@/types";
import IconShape from "@/components/icons/IconShape";
import TopBanner from "@/components/layout/TopBanner";
import { useIsTablet } from "@/hooks/useIsTablet";
import { ws } from "@/theme/styles";
import { CARD, NAVY, T1, T2 } from "@/theme/tokens";

/** Shown after the assessment, before the score, with the lead's draw ticket. */
export default function DrawEntryScreen({
  ticketNumber,
  lang,
  onContinue,
}: {
  ticketNumber: string;
  lang: Lang;
  onContinue: () => void;
}) {
  const isAr = lang === "ar";
  const ff = isAr ? "'Cairo', sans-serif" : "'Inter', sans-serif";
  const isTablet = useIsTablet();

  return (
    <div
      style={{
        ...ws(lang),
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(180deg, #EFF6FF 0%, #F4F8FC 70%)",
      }}
    >
      <div style={{ width: "100%" }}>
        <TopBanner subtitle="" fontFamily={ff} />
      </div>
      <main
        className="fade-up"
        style={{
          width: "100%",
          maxWidth: isTablet ? 620 : 430,
          flex: 1,
          padding: isTablet ? "64px 40px" : "36px 20px 44px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            background: CARD,
            border: "1px solid #BFDBFE",
            borderRadius: isTablet ? 30 : 24,
            boxShadow: "0 24px 70px rgba(30,64,175,0.14)",
            padding: isTablet ? "48px 54px" : "32px 22px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -65,
              right: -65,
              width: 190,
              height: 190,
              borderRadius: "50%",
              background: "rgba(37,99,235,0.08)",
            }}
          />
          <div
            className="bounce-in"
            style={{
              width: 68,
              height: 68,
              borderRadius: 22,
              margin: "0 auto 22px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#EFF6FF",
              border: "1px solid #BFDBFE",
              boxShadow: "0 12px 30px rgba(37,99,235,0.12)",
            }}
          >
            <IconShape name="trophy" size={48} />
          </div>
          <h1
            style={{
              fontSize: isTablet ? 34 : 27,
              color: T1,
              fontWeight: 900,
              lineHeight: 1.25,
              marginBottom: 10,
              fontFamily: ff,
            }}
          >
            {isAr ? "تهانينا!" : "Congratulations!"}
          </h1>
          <p
            style={{
              fontSize: isTablet ? 18 : 16,
              color: T2,
              lineHeight: 1.7,
              marginBottom: 30,
              fontFamily: ff,
            }}
          >
            {isAr ? "لقد دخلت السحب رسمياً." : "You've officially entered the draw."}
          </p>
          <div
            style={{
              padding: isTablet ? "26px 24px" : "22px 16px",
              borderRadius: 20,
              background: "#F8FAFC",
              border: "1.5px dashed #93C5FD",
              marginBottom: 20,
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: 1.2,
                color: "#2563EB",
                textTransform: "uppercase",
                marginBottom: 10,
                fontFamily: ff,
              }}
            >
              {isAr ? "رقم تذكرة السحب الخاصة بك" : "Your Draw Ticket Number"}
            </div>
            <div
              dir="ltr"
              style={{
                fontSize: isTablet ? 42 : 34,
                fontWeight: 900,
                letterSpacing: 4,
                color: T1,
                lineHeight: 1.1,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {ticketNumber || "·········"}
            </div>
          </div>
          <p
            style={{
              fontSize: 13,
              color: T2,
              lineHeight: 1.7,
              marginBottom: 28,
              fontFamily: ff,
            }}
          >
            {isAr
              ? "احتفظ بهذا الرقم، فهو المعرّف الرسمي لمشاركتك في السحب."
              : "Keep this number safe. It is the official identifier for your giveaway entry."}
          </p>
          <button
            type="button"
            onClick={onContinue}
            style={{
              width: "100%",
              padding: "17px",
              borderRadius: 16,
              border: "none",
              background: NAVY,
              color: "white",
              fontWeight: 800,
              fontSize: 16,
              cursor: "pointer",
              fontFamily: ff,
              boxShadow: "0 8px 26px rgba(8,33,61,0.25)",
            }}
          >
            {isAr
              ? "عرض درجة النضوج الرقمي ←"
              : "View My Digital Maturity Score →"}
          </button>
        </div>
      </main>
    </div>
  );
}
