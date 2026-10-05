/**
 * Design tokens — brand colors and typography used across the app.
 * Kept as constants so screens can stay on inline styles without drift.
 */

export const NAVY = "#08213D";
export const TEAL = "#0057A8";
export const PAGE = "#F4F8FC";
export const CARD = "#FFFFFF";
export const BORDER = "#D9E5EF";
export const T1 = "#071C33";
export const T2 = "#52677D";
export const T3 = "#8294A7";

export const FONT_AR = "'Cairo', sans-serif";
export const FONT_EN = "'Inter', sans-serif";

/**
 * Returns the font-family string for the active language.
 * @param lang - Active UI language
 */
export function fontFor(lang: "ar" | "en"): string {
  return lang === "ar" ? FONT_AR : FONT_EN;
}
