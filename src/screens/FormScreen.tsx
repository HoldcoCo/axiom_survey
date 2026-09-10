import React, { useState } from "react";
import type { Lang, LeadFormData } from "@/types";
import { UI } from "@/i18n";
import whatsappIcon from "@/assets/whatsapp.svg";
import IconShape from "@/components/icons/IconShape";
import LogoPair from "@/components/layout/LogoPair";
import PhoneInput from "@/components/ui/PhoneInput";
import ProgressBar from "@/components/ui/ProgressBar";
import { useIsTablet } from "@/hooks/useIsTablet";
import {
  isFormValid,
  validateLeadForm,
  type FormErrors,
} from "@/lib/validation";
import { ws, inner } from "@/theme/styles";
import { BORDER, CARD, NAVY, PAGE, T1, T2, T3, TEAL } from "@/theme/tokens";

export interface FormScreenProps {
  formData: LeadFormData;
  onChange: (field: keyof LeadFormData, value: string) => void;
  onSubmit: (honeypot: string) => void;
  onBack: () => void;
  lang: Lang;
  isSubmitting?: boolean;
}

export default function FormScreen({
  formData,
  onChange,
  onSubmit,
  onBack,
  lang,
  isSubmitting = false,
}: FormScreenProps) {
  const ui = UI[lang];
  const [sameWa, setSameWa] = useState(false);
  const [dialCode, setDialCode] = useState("+971");
  const [errors, setErrors] = useState<FormErrors>({});
  const [honeypot, setHoneypot] = useState("");
  const [touched, setTouched] = useState(false);

  const validation = validateLeadForm(formData, {
    name: ui.formErrorName,
    email: ui.formErrorEmail,
  });
  const canSubmit = isFormValid(validation) && !isSubmitting;
  const ff = lang === "ar" ? "'Cairo', sans-serif" : "'Inter', sans-serif";
  const isAr = lang === "ar";

  function handleSameWa(checked: boolean) {
    setSameWa(checked);
    if (checked) onChange("whatsapp", formData.phone);
    else onChange("whatsapp", "");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    attemptSubmit();
  }

  /** Shared submit path for form onSubmit and the fixed mobile CTA. */
  function attemptSubmit() {
    setTouched(true);
    setErrors(validation);
    if (!isFormValid(validation) || isSubmitting) return;
    onSubmit(honeypot);
  }

  const isTablet = useIsTablet();

  const formFields = (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {ui.formFields.map(({ field, label, placeholder, type, ltr }) => {
        if (field === "whatsapp") {
          return (
            <div key={field}>
              <button
                type="button"
                onClick={() => handleSameWa(!sameWa)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: sameWa ? "#EEF9F8" : CARD,
                  border: `1.5px solid ${sameWa ? "#5EEAD4" : BORDER}`,
                  borderRadius: 13,
                  padding: "11px 14px",
                  cursor: "pointer",
                  width: "100%",
                  fontFamily: ff,
                  direction: isAr ? "rtl" : "ltr",
                  marginBottom: sameWa ? 0 : 10,
                  transition: "all 0.2s",
                }}
              >
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 7,
                    border: `2px solid ${sameWa ? TEAL : "#D1D9E6"}`,
                    background: sameWa ? TEAL : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "all 0.2s",
                  }}
                >
                  {sameWa && (
                    <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                      <path
                        d="M1 4.5L4 7.5L10 1"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: sameWa ? TEAL : T2,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <img
                    src={whatsappIcon}
                    alt=""
                    width={18}
                    height={17}
                    style={{ flexShrink: 0, display: "block" }}
                  />
                  {isAr
                    ? "واتساب نفس رقم الهاتف"
                    : "WhatsApp is the same as my phone"}
                </span>
              </button>
              {!sameWa && (
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 600,
                      color: T2,
                      marginBottom: 7,
                    }}
                  >
                    {label}
                  </label>
                  <input
                    type={type}
                    value={formData.whatsapp}
                    onChange={(e) => onChange("whatsapp", e.target.value)}
                    placeholder={placeholder}
                    style={{
                      width: "100%",
                      padding: "13px 16px",
                      borderRadius: 13,
                      border: `1.5px solid ${BORDER}`,
                      background: CARD,
                      fontSize: 14,
                      fontFamily: ff,
                      color: T1,
                      outline: "none",
                      direction: "ltr",
                      transition: "border-color 0.15s",
                    }}
                    onFocus={(e) => {
                      (e.target as HTMLInputElement).style.borderColor = TEAL;
                    }}
                    onBlur={(e) => {
                      (e.target as HTMLInputElement).style.borderColor = BORDER;
                    }}
                  />
                </div>
              )}
            </div>
          );
        }
        if (field === "phone") {
          return (
            <div key={field}>
              <label
                style={{
                  display: "block",
                  fontSize: 13,
                  fontWeight: 600,
                  color: T2,
                  marginBottom: 7,
                }}
              >
                {label}
              </label>
              <PhoneInput
                value={formData.phone}
                dialCode={dialCode}
                onDialChange={(d) => {
                  setDialCode(d);
                  if (sameWa) onChange("whatsapp", formData.phone);
                }}
                onNumberChange={(num) => {
                  onChange("phone", num);
                  if (sameWa) onChange("whatsapp", num);
                }}
                lang={lang}
                placeholder={placeholder}
              />
            </div>
          );
        }
        return (
          <div key={field}>
            <label
              htmlFor={`lead-${field}`}
              style={{
                display: "block",
                fontSize: 13,
                fontWeight: 600,
                color: T2,
                marginBottom: 7,
              }}
            >
              {label}
            </label>
            <input
              id={`lead-${field}`}
              name={field}
              type={type}
              value={formData[field]}
              onChange={(e) => onChange(field, e.target.value)}
              placeholder={placeholder}
              autoComplete={
                field === "email"
                  ? "email"
                  : field === "name"
                    ? "name"
                    : field === "company"
                      ? "organization"
                      : "off"
              }
              aria-invalid={touched && Boolean(errors[field])}
              style={{
                width: "100%",
                padding: "13px 16px",
                borderRadius: 13,
                border: `1.5px solid ${
                  touched && errors[field] ? "#F87171" : BORDER
                }`,
                background: CARD,
                fontSize: 14,
                fontFamily: ff,
                color: T1,
                outline: "none",
                direction: ltr ? "ltr" : "rtl",
                transition: "border-color 0.15s",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = TEAL;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor =
                  touched && errors[field] ? "#F87171" : BORDER;
              }}
            />
            {touched && errors[field] ? (
              <p
                role="alert"
                style={{
                  fontSize: 12,
                  color: "#B91C1C",
                  marginTop: 6,
                  fontFamily: ff,
                }}
              >
                {errors[field]}
              </p>
            ) : null}
          </div>
        );
      })}
      {/* Honeypot — hidden from users; bots often fill it */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-10000px",
          top: "auto",
          width: 1,
          height: 1,
          overflow: "hidden",
        }}
      >
        <label htmlFor="lead-website">Website</label>
        <input
          id="lead-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>
      <p
        style={{
          fontSize: 12,
          color: T3,
          marginTop: 2,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <IconShape name="mail" size={22} />
        <span>{ui.formNote}</span>
      </p>
    </div>
  );

  if (isTablet) {
    return (
      <div style={{ ...ws(lang), minHeight: "100vh", flexDirection: "column" }}>
        {/* Top bar */}
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
            {isAr ? "رجوع" : "Back"}
          </button>
          <LogoPair height={28} />
          <div style={{ width: 80 }} />
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
              width: "38%",
              background: NAVY,
              padding: "60px 48px",
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
            <span
              className="fade-up"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontSize: 13,
                color: TEAL,
                fontWeight: 700,
                marginBottom: 20,
                background: "rgba(13,148,136,0.15)",
                padding: "5px 14px",
                borderRadius: 999,
                width: "fit-content",
                fontFamily: ff,
              }}
            >
              <IconShape name="target" size={22} />
              {ui.lastStepBadge}
            </span>
            <h2
              className="fade-up"
              style={{
                fontSize: 34,
                fontWeight: 800,
                color: "white",
                lineHeight: 1.3,
                marginBottom: 16,
                fontFamily: ff,
              }}
            >
              {ui.formTitle}
            </h2>
            <p
              className="fade-up"
              style={{
                fontSize: 15,
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.7,
                fontFamily: ff,
              }}
            >
              {ui.formSubtitle}
            </p>
            <div
              style={{
                marginTop: 40,
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              {[
                {
                  icon: "lock",
                  text: isAr
                    ? "بياناتك آمنة تماماً"
                    : "Your data is fully secure",
                },
                {
                  icon: "mail",
                  text: isAr
                    ? "تقرير فوري على بريدك"
                    : "Instant report to your inbox",
                },
                {
                  icon: "gift",
                  text: isAr
                    ? "مجاني تماماً، بلا التزامات"
                    : "Completely free, no obligations",
                },
              ].map((b) => (
                <div
                  key={b.icon}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    direction: isAr ? "rtl" : "ltr",
                  }}
                >
                  <IconShape name={b.icon} size={32} />
                  <span
                    style={{
                      fontSize: 13,
                      color: "rgba(255,255,255,0.65)",
                      fontFamily: ff,
                    }}
                  >
                    {b.text}
                  </span>
                </div>
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
            }}
            className="scrollbar-hide"
          >
            <div className="fade-up">
              <form onSubmit={handleSubmit} noValidate>
                {formFields}
                <div style={{ marginTop: 28 }}>
                  <button
                    type="submit"
                    disabled={!canSubmit}
                    style={{
                      padding: "18px 52px",
                      borderRadius: 16,
                      fontWeight: 700,
                      fontSize: 17,
                      border: "none",
                      cursor: canSubmit ? "pointer" : "default",
                      background: canSubmit ? NAVY : "#DDE3EC",
                      color: canSubmit ? "white" : "#A4B4C4",
                      boxShadow: canSubmit
                        ? "0 6px 22px rgba(27,44,75,0.28)"
                        : "none",
                      fontFamily: ff,
                      transition: "all 0.2s",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    {isSubmitting ? ui.submitting : ui.formSubmit}{" "}
                    <span>{ui.arrow}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ ...ws(lang), position: "relative" }}>
      <ProgressBar
        step={7}
        label={ui.formStepLabel}
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
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 12,
              color: TEAL,
              fontWeight: 700,
              marginBottom: 12,
              background: "#EEF9F8",
              padding: "3px 11px",
              borderRadius: 999,
            }}
          >
            <IconShape name="target" size={20} />
            {ui.lastStepBadge}
          </span>
          <h2
            style={{
              fontSize: 21,
              fontWeight: 800,
              color: T1,
              lineHeight: 1.45,
              marginBottom: 6,
            }}
          >
            {ui.formTitle}
          </h2>
          <p style={{ fontSize: 14, color: T2, marginBottom: 28 }}>
            {ui.formSubtitle}
          </p>
          <form id="lead-form-mobile" onSubmit={handleSubmit} noValidate>
            {formFields}
          </form>
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
          type="submit"
          form="lead-form-mobile"
          disabled={!canSubmit}
          style={{
            width: "100%",
            padding: "17px",
            borderRadius: 16,
            fontWeight: 700,
            fontSize: 16,
            border: "none",
            cursor: canSubmit ? "pointer" : "default",
            background: canSubmit ? NAVY : "#DDE3EC",
            color: canSubmit ? "white" : "#A4B4C4",
            boxShadow: canSubmit ? "0 6px 22px rgba(27,44,75,0.28)" : "none",
            fontFamily: ff,
            transition: "all 0.2s",
            pointerEvents: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
          }}
        >
          {isSubmitting ? ui.submitting : ui.formSubmit}
          <span>{ui.arrow}</span>
        </button>
      </div>
    </div>
  );
}
