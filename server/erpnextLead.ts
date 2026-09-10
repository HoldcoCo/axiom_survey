/**
 * ERPNext Lead + Opportunity creation — same flow as axiom_website.
 *
 * 1. Find existing Lead by email (or create one)
 * 2. Create an Opportunity linked to that Lead
 * 3. Attach Digital Health Check answers as a CRM Note on the Opportunity
 */
import { mapToFrappeLead, mapToFrappeOpportunity } from "../src/lib/mapToFrappeLead.js";
import { formatAnswersAsHtmlNote } from "../src/lib/serializeAnswers.js";
import type {
  LeadFormData,
  LeadSubmissionPayload,
  SerializedAnswer,
} from "../src/types/index.js";
import { sendReportEmail } from "./emailReport.js";

export interface ErpNextConfig {
  baseUrl: string;
  apiKey: string;
  apiSecret: string;
  leadSource: string;
  company: string;
  opportunityType: string;
}

export interface LeadHandlerResult {
  status: number;
  body: { ok: boolean; error?: string; emailSent?: boolean };
}

interface ErpNextApiResponse {
  data?: {
    name?: string;
  };
  message?: string;
  exception?: string;
  exc_type?: string;
  _server_messages?: string;
}

interface ErpNextListResponse {
  data?: Array<{ name?: string }>;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LEAD_NAME_PATTERN = /CRM-LEAD-\d{4}-\d+/i;

/**
 * Loads ERPNext credentials from the same env vars as axiom_website,
 * with FRAPPE_* fallbacks for earlier Health Check deployments.
 */
export function getErpNextConfig(): ErpNextConfig | null {
  const baseUrl = firstEnv("ERPNEXT_BASE_URL", "FRAPPE_URL");
  const apiKey = firstEnv("ERPNEXT_API_KEY", "FRAPPE_API_KEY");
  const apiSecret = firstEnv("ERPNEXT_API_SECRET", "FRAPPE_API_SECRET");
  const leadSource = firstEnv("ERPNEXT_LEAD_SOURCE") ?? "Website";
  const company = firstEnv("ERPNEXT_COMPANY") ?? "";
  const opportunityType = firstEnv("ERPNEXT_OPPORTUNITY_TYPE") ?? "";

  if (baseUrl === null || apiKey === null || apiSecret === null) {
    return null;
  }

  return {
    baseUrl: baseUrl.replace(/\/$/, ""),
    apiKey,
    apiSecret,
    leadSource,
    company,
    opportunityType,
  };
}

function firstEnv(...keys: string[]): string | null {
  for (const key of keys) {
    const value = process.env[key];
    if (typeof value === "string" && value.trim().length > 0) {
      return value.trim();
    }
  }
  return null;
}

function collectErrorTexts(responseBody: ErpNextApiResponse): string[] {
  const texts: string[] = [];
  if (typeof responseBody.message === "string") texts.push(responseBody.message);
  if (typeof responseBody.exception === "string") texts.push(responseBody.exception);
  if (typeof responseBody._server_messages === "string") {
    texts.push(responseBody._server_messages);
    try {
      const messages = JSON.parse(responseBody._server_messages) as unknown[];
      for (const entry of messages) {
        if (typeof entry !== "string") continue;
        texts.push(entry);
        try {
          const parsed = JSON.parse(entry) as { message?: string };
          if (typeof parsed.message === "string") texts.push(parsed.message);
        } catch {
          // Ignore nested JSON parse failures.
        }
      }
    } catch {
      // Ignore server message JSON parse failures.
    }
  }
  return texts;
}

function parseErpNextError(responseBody: ErpNextApiResponse): string {
  for (const message of collectErrorTexts(responseBody)) {
    const stripped = message.replace(/<[^>]+>/g, "").trim();
    if (stripped.length > 0 && !stripped.startsWith("{")) {
      return stripped;
    }
  }
  return "ERPNext rejected the request.";
}

function extractLeadNameFromDuplicateEmailError(
  responseBody: ErpNextApiResponse,
): string | null {
  for (const text of collectErrorTexts(responseBody)) {
    const hrefMatch = text.match(/\/lead\/(CRM-LEAD-\d{4}-\d+)/i);
    if (hrefMatch && typeof hrefMatch[1] === "string") return hrefMatch[1];
    const nameMatch = text.match(LEAD_NAME_PATTERN);
    if (nameMatch && typeof nameMatch[0] === "string") return nameMatch[0];
  }
  return null;
}

function isDuplicateEmailError(responseBody: ErpNextApiResponse): boolean {
  return collectErrorTexts(responseBody).some((text) =>
    text.toLowerCase().includes("email address must be unique"),
  );
}

async function erpNextFetch(
  config: ErpNextConfig,
  path: string,
  init: RequestInit,
): Promise<Response> {
  const url = `${config.baseUrl}${path}`;
  const tokenAuth = `token ${config.apiKey}:${config.apiSecret}`;
  const basicAuth = `Basic ${Buffer.from(`${config.apiKey}:${config.apiSecret}`).toString("base64")}`;

  const response = await sendErpNextRequest(url, init, tokenAuth);
  if (response.status !== 401) return response;
  return sendErpNextRequest(url, init, basicAuth);
}

async function sendErpNextRequest(
  url: string,
  init: RequestInit,
  authorization: string,
): Promise<Response> {
  const headers = new Headers(init.headers);
  headers.set("Authorization", authorization);
  headers.set("Accept", "application/json");
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  return fetch(url, { ...init, headers });
}

function isLeadForm(value: unknown): value is LeadFormData {
  if (typeof value !== "object" || value === null) return false;
  const form = value as Record<string, unknown>;
  return (
    typeof form.name === "string" &&
    typeof form.company === "string" &&
    typeof form.phone === "string" &&
    typeof form.whatsapp === "string" &&
    typeof form.email === "string"
  );
}

function isSerializedAnswer(value: unknown): value is SerializedAnswer {
  if (typeof value !== "object" || value === null) return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.question === "string" &&
    Array.isArray(item.answers) &&
    item.answers.every((a) => typeof a === "string")
  );
}

/**
 * Type guard for the assessment POST body.
 * @param value - Parsed JSON
 */
export function isLeadPayload(value: unknown): value is LeadSubmissionPayload {
  if (typeof value !== "object" || value === null) return false;
  const obj = value as Record<string, unknown>;
  if (typeof obj.score !== "number" || !Number.isFinite(obj.score)) return false;
  if (typeof obj.levelLabel !== "string") return false;
  if (obj.lang !== "ar" && obj.lang !== "en") return false;
  if (!Array.isArray(obj.answers)) return false;
  if (!isLeadForm(obj.form)) return false;
  if (obj.website !== undefined && typeof obj.website !== "string") return false;
  return obj.answers.every(isSerializedAnswer);
}

/** Find an existing Lead by email address. */
async function findLeadByEmail(
  config: ErpNextConfig,
  email: string,
): Promise<string | null> {
  const filters = encodeURIComponent(JSON.stringify([["email_id", "=", email]]));
  const fields = encodeURIComponent(JSON.stringify(["name"]));
  const response = await erpNextFetch(
    config,
    `/api/resource/Lead?filters=${filters}&fields=${fields}&limit_page_length=1`,
    { method: "GET" },
  );
  if (!response.ok) {
    console.error(
      "[erpnext] Lead lookup failed",
      response.status,
      parseErpNextError((await response.json()) as ErpNextApiResponse),
    );
    return null;
  }
  const body = (await response.json()) as ErpNextListResponse;
  const leadName = body.data?.[0]?.name;
  return typeof leadName === "string" && leadName.length > 0 ? leadName : null;
}

/** Resolve the ERPNext company used when creating Opportunities. */
async function resolveCompanyName(config: ErpNextConfig): Promise<string | null> {
  if (config.company.length > 0) return config.company;

  const fields = encodeURIComponent(JSON.stringify(["name"]));
  const response = await erpNextFetch(
    config,
    `/api/resource/Company?fields=${fields}&limit_page_length=1`,
    { method: "GET" },
  );
  if (!response.ok) return null;
  const body = (await response.json()) as ErpNextListResponse;
  const companyName = body.data?.[0]?.name;
  return typeof companyName === "string" && companyName.length > 0
    ? companyName
    : null;
}

async function createLead(
  config: ErpNextConfig,
  payload: LeadSubmissionPayload,
): Promise<{ ok: true; name: string } | { ok: false; message: string }> {
  const leadDoc = mapToFrappeLead({
    name: payload.form.name,
    company: payload.form.company,
    email: payload.form.email,
    phone: payload.form.phone,
    whatsapp: payload.form.whatsapp,
    source: config.leadSource,
  });

  const response = await erpNextFetch(config, "/api/resource/Lead", {
    method: "POST",
    body: JSON.stringify(leadDoc),
  });
  const body = (await response.json()) as ErpNextApiResponse;

  if (!response.ok) {
    if (isDuplicateEmailError(body)) {
      const duplicate = extractLeadNameFromDuplicateEmailError(body);
      if (duplicate !== null) return { ok: true, name: duplicate };
    }
    const message = parseErpNextError(body);
    console.error("[erpnext] Lead create failed", response.status, message);
    return { ok: false, message };
  }

  const leadName = body.data?.name;
  if (typeof leadName !== "string" || leadName.length === 0) {
    return { ok: false, message: "Lead was created but ERPNext returned no name." };
  }
  return { ok: true, name: leadName };
}

async function createOpportunity(
  config: ErpNextConfig,
  leadName: string,
  payload: LeadSubmissionPayload,
  companyName: string,
): Promise<{ ok: true; name: string } | { ok: false; message: string }> {
  const opportunityDoc = mapToFrappeOpportunity({
    leadName,
    name: payload.form.name,
    company: payload.form.company,
    email: payload.form.email,
    phone: payload.form.phone,
    whatsapp: payload.form.whatsapp,
    companyAccount: companyName,
    opportunityType: config.opportunityType,
  });

  const response = await erpNextFetch(config, "/api/resource/Opportunity", {
    method: "POST",
    body: JSON.stringify(opportunityDoc),
  });
  const body = (await response.json()) as ErpNextApiResponse;

  if (!response.ok) {
    const message = parseErpNextError(body);
    console.error("[erpnext] Opportunity create failed", response.status, message);
    return { ok: false, message };
  }

  const opportunityName = body.data?.name;
  if (typeof opportunityName !== "string" || opportunityName.length === 0) {
    return {
      ok: false,
      message: "Opportunity was created but ERPNext returned no name.",
    };
  }
  return { ok: true, name: opportunityName };
}

/**
 * Attaches assessment answers as a CRM Note child row on the Opportunity.
 */
async function addOpportunityNote(
  config: ErpNextConfig,
  opportunityName: string,
  noteHtml: string,
): Promise<void> {
  const response = await erpNextFetch(
    config,
    `/api/resource/Opportunity/${encodeURIComponent(opportunityName)}`,
    {
      method: "PUT",
      body: JSON.stringify({
        notes: [{ note: noteHtml, doctype: "CRM Note" }],
      }),
    },
  );
  if (response.ok) return;

  console.error(
    "[erpnext] Opportunity note update failed, falling back to comment",
    response.status,
    parseErpNextError((await response.json().catch(() => ({}))) as ErpNextApiResponse),
  );

  const commentParams = new URLSearchParams({
    reference_doctype: "Opportunity",
    reference_name: opportunityName,
    content: noteHtml,
  });
  await erpNextFetch(config, "/api/method/frappe.desk.form.utils.add_comment", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: commentParams.toString(),
  });
}

/**
 * Submit a Digital Health Check: Lead (new or existing) + Opportunity + CRM Note.
 */
export async function submitAssessmentToErpNext(
  payload: LeadSubmissionPayload,
  config: ErpNextConfig,
): Promise<LeadHandlerResult> {
  const email = payload.form.email.trim();
  const name = payload.form.name.trim();
  if (name.length === 0 || !EMAIL_PATTERN.test(email)) {
    return { status: 400, body: { ok: false, error: "validation" } };
  }

  const companyName = await resolveCompanyName(config);
  if (companyName === null) {
    console.error("[erpnext] Missing ERPNEXT_COMPANY");
    return { status: 503, body: { ok: false, error: "config" } };
  }

  const noteHtml = formatAnswersAsHtmlNote(
    payload.answers,
    payload.score,
    payload.levelLabel,
    payload.lang,
  );

  let leadName = await findLeadByEmail(config, email);
  if (leadName === null) {
    const leadResult = await createLead(config, payload);
    if (!leadResult.ok) {
      return { status: 502, body: { ok: false, error: "upstream" } };
    }
    leadName = leadResult.name;
  }

  const opportunityResult = await createOpportunity(
    config,
    leadName,
    payload,
    companyName,
  );
  if (!opportunityResult.ok) {
    return { status: 502, body: { ok: false, error: "upstream" } };
  }

  await addOpportunityNote(config, opportunityResult.name, noteHtml);

  const emailSent = await sendReportEmail({
    to: email,
    name: name,
    company: payload.form.company.trim(),
    score: payload.score,
    levelLabel: payload.levelLabel,
    lang: payload.lang,
    answers: payload.answers,
  });

  return { status: 200, body: { ok: true, emailSent } };
}

/**
 * Shared handler for Vercel `/api/lead` and the Vite dev middleware.
 * @param body - Parsed JSON body
 */
export async function handleLeadRequest(body: unknown): Promise<LeadHandlerResult> {
  if (!isLeadPayload(body)) {
    return { status: 400, body: { ok: false, error: "validation" } };
  }

  if (typeof body.website === "string" && body.website.trim().length > 0) {
    return { status: 200, body: { ok: true } };
  }

  const config = getErpNextConfig();
  if (config === null) {
    console.error("[api/lead] Missing ERPNEXT_* environment variables");
    return { status: 503, body: { ok: false, error: "config" } };
  }

  return submitAssessmentToErpNext(body, config);
}
