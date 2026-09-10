/**
 * ERPNext Lead / Opportunity field mapping (same pattern as axiom_website).
 */

/** Lead POST body — only defined keys are sent. */
export type FrappeLeadFields = Record<string, string>;

/** Opportunity POST body — only defined keys are sent. */
export type FrappeOpportunityFields = Record<string, string>;

/**
 * Splits a full name into first/last, ensuring first_name is never empty
 * (ERPNext v15 throws 417 when first_name is blank).
 *
 * @param fullName - User-entered display name
 */
export function splitLeadName(fullName: string): {
  first_name: string;
  last_name: string;
} {
  const trimmed = fullName.trim();
  if (trimmed.length === 0) {
    return { first_name: "Lead", last_name: "" };
  }
  const parts = trimmed.split(/\s+/);
  const first = parts[0] ?? "Lead";
  const last = parts.slice(1).join(" ");
  return { first_name: first, last_name: last };
}

/**
 * Maps assessment payload fields onto an ERPNext Lead document body.
 * Empty optional fields are omitted so ERPNext validation does not fail.
 */
export function mapToFrappeLead(input: {
  name: string;
  company: string;
  email: string;
  phone: string;
  whatsapp: string;
  source?: string;
}): FrappeLeadFields {
  const { first_name, last_name } = splitLeadName(input.name);
  const phone = input.phone.trim();
  const whatsapp = input.whatsapp.trim();
  const company = input.company.trim();
  const lead_name = input.name.trim().length > 0 ? input.name.trim() : first_name;
  const mobile = whatsapp.length > 0 ? whatsapp : phone;

  const doc: FrappeLeadFields = {
    lead_name,
    first_name,
    email_id: input.email.trim(),
    source: input.source && input.source.length > 0 ? input.source : "Website",
  };

  if (last_name.length > 0) {
    doc.last_name = last_name;
  }
  if (company.length > 0) {
    doc.company_name = company;
  }
  if (phone.length > 0) {
    doc.phone = phone;
  }
  if (mobile.length > 0) {
    doc.mobile_no = mobile;
  }

  return doc;
}

/**
 * Maps a created Lead + assessment payload onto an ERPNext Opportunity.
 * Matches axiom_website fields so ERPNext accepts the insert.
 * Assessment answers are attached afterwards as a CRM Note, not on insert.
 */
export function mapToFrappeOpportunity(input: {
  leadName: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  whatsapp: string;
  companyAccount: string;
  opportunityType: string;
}): FrappeOpportunityFields {
  const company = input.company.trim();
  const contactName = input.name.trim();
  const mobile = input.whatsapp.trim().length > 0
    ? input.whatsapp.trim()
    : input.phone.trim();

  const payload: FrappeOpportunityFields = {
    naming_series: "CRM-OPP-.YYYY.-",
    opportunity_from: "Lead",
    party_name: input.leadName,
    status: "Open",
    company: input.companyAccount,
    contact_email: input.email.trim(),
    customer_name: company.length > 0 ? company : contactName,
  };

  if (mobile.length > 0) {
    payload.contact_mobile = mobile;
  }
  if (input.opportunityType.length > 0) {
    payload.opportunity_type = input.opportunityType;
  }

  return payload;
}
