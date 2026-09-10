/**
 * Public booking CTA URL from Vite env, with a safe fallback.
 */
export function getBookingUrl(): string {
  const raw = import.meta.env.VITE_BOOKING_URL;
  if (typeof raw === "string" && raw.trim().length > 0) {
    return raw.trim();
  }
  return "https://cal.com";
}
