/**
 * Giveaway code generation for Digital Health Check leads.
 * Codes are stored on the ERPNext Lead as `custom_giveaway_code`.
 */

/**
 * Generates a 9-digit giveaway ticket.
 * Collision checks against existing leads happen in the ERPNext handler.
 */
export function generateGiveawayCode(): string {
  const bytes = new Uint32Array(1);
  crypto.getRandomValues(bytes);
  const value = bytes[0] % 1_000_000_000;
  return String(value).padStart(9, "0");
}

/**
 * Returns a trimmed giveaway code, or null when the value is empty.
 * @param value - Raw ERPNext field value
 */
export function normalizeGiveawayCode(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}
