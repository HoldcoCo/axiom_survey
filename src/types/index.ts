/**
 * Shared domain types for the Digital Health Check assessment flow.
 */

/** Supported UI languages. */
export type Lang = "ar" | "en";

/** A single selectable answer option on a question. */
export interface Option {
  emoji: string;
  label: string;
  points?: number;
  isOther?: boolean;
  isNone?: boolean;
}

/** One assessment question with its options. */
export interface QuestionData {
  title: string;
  subtitle?: string;
  type: "single" | "multi";
  maxSelect?: number;
  options: Option[];
}

/** Maturity level band shown on reveal / report screens. */
export interface LevelData {
  emoji: string;
  label: string;
  accent: string;
  accentBg: string;
  accentBorder: string;
  gaugeColor: string;
  tip: string;
  message: string;
}

/** Contact details captured on the final form step. */
export interface LeadFormData {
  name: string;
  company: string;
  phone: string;
  whatsapp: string;
  email: string;
}

/** Map of 1-based question step number to selected option index(es). */
export type AnswerMap = Record<number, number | number[]>;

/** Free-text answers for "Other" options, keyed by question step. */
export type OtherTextMap = Record<number, string>;

/** Empty lead form factory. */
export function emptyLeadForm(): LeadFormData {
  return {
    name: "",
    company: "",
    phone: "",
    whatsapp: "",
    email: "",
  };
}

/** Form field metadata used by i18n form field definitions. */
export interface FormFieldDef {
  field: keyof LeadFormData;
  label: string;
  placeholder: string;
  type: "text" | "tel" | "email";
  ltr: boolean;
}

/** Country dial-code entry for the phone input. */
export interface CountryDial {
  code: string;
  dial: string;
  flag: string;
  name: string;
}

/** Serialized answer ready for CRM / email notes. */
export interface SerializedAnswer {
  question: string;
  answers: string[];
}

/** Payload sent to the lead API endpoint. */
export interface LeadSubmissionPayload {
  form: LeadFormData;
  score: number;
  levelLabel: string;
  lang: Lang;
  answers: SerializedAnswer[];
  /** Honeypot — must be empty for humans. */
  website?: string;
}

/** Normalized API response from /api/lead. */
export interface LeadSubmissionResult {
  ok: boolean;
  error?: "validation" | "rate_limit" | "upstream" | "config" | "network";
  /** Whether the HTML report email was sent successfully. */
  emailSent?: boolean;
}
