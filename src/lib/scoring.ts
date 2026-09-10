import { getLevels } from "@/data";
import type { AnswerMap, Lang, LevelData, QuestionData } from "@/types";

/**
 * Computes the digital maturity score (0–100) from answer indices.
 * Only questions 3, 4, and 5 (1-based steps) contribute points.
 *
 * @param answers - Map of 1-based step → selected option index(es)
 * @param qs - Question set for the active language (used for points)
 */
export function computeScore(
  answers: AnswerMap,
  qs: QuestionData[],
): number {
  let total = 0;

  const q3 = answers[3];
  if (typeof q3 === "number") {
    total += qs[2]?.options[q3]?.points ?? 0;
  } else if (Array.isArray(q3) && q3.length > 0) {
    total += Math.max(...q3.map((i) => qs[2]?.options[i]?.points ?? 0));
  }

  const q4 = answers[4];
  if (typeof q4 === "number") {
    total += qs[3]?.options[q4]?.points ?? 0;
  } else if (Array.isArray(q4) && q4.length > 0) {
    q4.forEach((i) => {
      total += qs[3]?.options[i]?.points ?? 0;
    });
  }

  const q5 = answers[5];
  if (Array.isArray(q5)) {
    q5.forEach((i) => {
      total += qs[4]?.options[i]?.points ?? 0;
    });
  }

  return Math.min(total, 100);
}

/**
 * Maps a score to its maturity level band.
 * @param score - Score 0–100
 * @param lang - Active UI language
 */
export function getLevel(score: number, lang: Lang): LevelData {
  const levels = getLevels(lang);
  if (score <= 25) return levels[0];
  if (score <= 50) return levels[1];
  if (score <= 75) return levels[2];
  return levels[3];
}
