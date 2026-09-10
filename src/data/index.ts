import type { Lang, LevelData, QuestionData } from "@/types";
import { LEVELS_AR } from "./levels.ar";
import { LEVELS_EN } from "./levels.en";
import { QS_AR } from "./questions.ar";
import { QS_EN } from "./questions.en";

/**
 * Returns the question set for the active language.
 * @param lang - Active UI language
 */
export function getQuestions(lang: Lang): QuestionData[] {
  return lang === "ar" ? QS_AR : QS_EN;
}

/**
 * Returns maturity level bands for the active language.
 * @param lang - Active UI language
 */
export function getLevels(lang: Lang): LevelData[] {
  return lang === "ar" ? LEVELS_AR : LEVELS_EN;
}

export { COUNTRIES } from "./countries";
export { QS_AR, QS_EN, LEVELS_AR, LEVELS_EN };
