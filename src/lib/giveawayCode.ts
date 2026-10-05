/**
 * Giveaway code generation for Digital Health Check leads.
 * Codes are stored on the ERPNext Lead as `custom_giveaway_code`.
 */

/** Alphabet avoids 0/O and 1/I so codes stay readable in email. */
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const CODE_LENGTH = 8;

/**
 * Generates a unique-looking giveaway code in `XXXX-XXXX` form.
 * Collision checks against existing leads happen in the ERPNext handler.
 */
export function generateGiveawayCode(): string {
  const bytes = new Uint8Array(CODE_LENGTH);
  crypto.getRandomValues(bytes);
  let raw = "";
  for (const byte of bytes) {
    raw += ALPHABET[byte % ALPHABET.length];
  }
  return `${raw.slice(0, 4)}-${raw.slice(4)}`;
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
