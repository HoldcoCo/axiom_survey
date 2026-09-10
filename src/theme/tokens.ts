/**
 * Design tokens — brand colors and typography used across the app.
 * Kept as constants so screens can stay on inline styles without drift.
 */

export const NAVY = "#1B2C4B";
export const TEAL = "#0D9488";
export const PAGE = "#F5F3EF";
export const CARD = "#FFFFFF";
export const BORDER = "#E4E9F0";
export const T1 = "#1B2C4B";
export const T2 = "#64748B";
export const T3 = "#9AABBD";

export const FONT_AR = "'Cairo', sans-serif";
export const FONT_EN = "'Inter', sans-serif";

/**
 * Returns the font-family string for the active language.
 * @param lang - Active UI language
 */
export function fontFor(lang: "ar" | "en"): string {
  return lang === "ar" ? FONT_AR : FONT_EN;
}
