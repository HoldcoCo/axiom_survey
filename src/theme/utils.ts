/**
 * Color helpers for inline-style theming.
 */

/**
 * Converts a 6-digit hex color to an rgba() string.
 * @param hex - Color like "#0D9488"
 * @param alpha - Opacity 0–1
 */
export function hexRgba(hex: string, alpha: number): string {
  if (!/^#[0-9A-Fa-f]{6}$/.test(hex)) {
    return `rgba(0,0,0,${alpha})`;
  }
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}
