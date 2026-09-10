import type { LeadFormData } from "@/types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates that a string is a non-empty trimmed value.
 * @param value - Raw input
 */
export function isRequired(value: string): boolean {
  return value.trim().length > 0;
}

/**
 * Basic email format validation.
 * @param value - Email candidate
 */
export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}

/**
 * Optional phone: empty is OK; otherwise require at least 6 digits.
 * @param value - Phone candidate (may include spaces / dial code)
 */
export function isValidPhone(value: string): boolean {
  const trimmed = value.trim();
  if (trimmed.length === 0) return true;
  const digits = trimmed.replace(/\D/g, "");
  return digits.length >= 6;
}

/** Field-level form errors. */
export interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  company?: string;
}

/**
 * Validates the lead contact form.
 * @param form - Form values
 * @param messages - Localized error messages
 */
export function validateLeadForm(
  form: LeadFormData,
  messages: { name: string; email: string },
): FormErrors {
  const errors: FormErrors = {};
  if (!isRequired(form.name)) {
    errors.name = messages.name;
  }
  if (!isValidEmail(form.email)) {
    errors.email = messages.email;
  }
  if (!isValidPhone(form.phone)) {
    errors.phone = messages.email;
  }
  if (!isValidPhone(form.whatsapp)) {
    errors.whatsapp = messages.email;
  }
  return errors;
}

/**
 * Returns true when the form has no validation errors.
 * @param errors - Error map from validateLeadForm
 */
export function isFormValid(errors: FormErrors): boolean {
  return Object.keys(errors).length === 0;
}
