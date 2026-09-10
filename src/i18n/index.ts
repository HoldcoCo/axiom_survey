import type { Lang } from "@/types";
import { UI_AR, type UiStrings } from "./strings.ar";
import { UI_EN } from "./strings.en";

/** Bilingual UI string dictionary. */
export const UI: Record<Lang, UiStrings> = {
  ar: UI_AR,
  en: UI_EN,
};

/**
 * Returns UI strings for the active language.
 * @param lang - Active UI language
 */
export function getUi(lang: Lang): UiStrings {
  return UI[lang];
}

export type { UiStrings };
