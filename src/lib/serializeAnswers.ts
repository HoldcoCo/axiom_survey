import type {
  AnswerMap,
  OtherTextMap,
  QuestionData,
  SerializedAnswer,
} from "../types/index.js";

/**
 * Resolves answer indices into human-readable labels for CRM / email.
 * Folds in free-text "Other" answers when present.
 *
 * @param answers - Map of 1-based step → selected index(es)
 * @param qs - Question set for the language used during the quiz
 * @param otherTexts - Optional free-text keyed by step
 */
export function serializeAnswers(
  answers: AnswerMap,
  qs: QuestionData[],
  otherTexts: OtherTextMap = {},
): SerializedAnswer[] {
  const result: SerializedAnswer[] = [];

  qs.forEach((question, index) => {
    const step = index + 1;
    const raw = answers[step];
    if (raw === undefined) return;

    const indices = typeof raw === "number" ? [raw] : raw;
    const labels: string[] = [];

    indices.forEach((i) => {
      const opt = question.options[i];
      if (!opt) return;
      if (opt.isOther) {
        const custom = otherTexts[step]?.trim();
        labels.push(custom && custom.length > 0 ? custom : opt.label);
      } else {
        labels.push(opt.label);
      }
    });

    if (labels.length > 0) {
      result.push({ question: question.title, answers: labels });
    }
  });

  return result;
}

/**
 * Formats serialized answers as a plain-text notes block for ERPNext.
 * @param serialized - Output of serializeAnswers
 * @param score - Maturity score
 * @param levelLabel - Level band label
 * @param lang - Language code
 */
export function formatAnswersAsNotes(
  serialized: SerializedAnswer[],
  score: number,
  levelLabel: string,
  lang: string,
): string {
  const lines: string[] = [
    `Digital Health Check — Score: ${String(score)}/100`,
    `Level: ${levelLabel}`,
    `Language: ${lang}`,
    "",
    "Answers:",
  ];
  serialized.forEach((item, i) => {
    lines.push(`${String(i + 1)}. ${item.question}`);
    lines.push(`   → ${item.answers.join(", ")}`);
  });
  return lines.join("\n");
}

/**
 * Escapes text for safe inclusion in a CRM Note HTML body.
 * @param value - Untrusted user or question text
 */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Formats serialized answers as a Quill-style HTML CRM Note
 * (matches Opportunity.notes rows in ERPNext).
 */
export function formatAnswersAsHtmlNote(
  serialized: SerializedAnswer[],
  score: number,
  levelLabel: string,
  lang: string,
): string {
  const paragraphs: string[] = [
    `<p><strong>Digital Health Check</strong> — Score: ${String(score)}/100</p>`,
    `<p>Level: ${escapeHtml(levelLabel)}</p>`,
    `<p>Language: ${escapeHtml(lang)}</p>`,
    "<p><strong>Answers</strong></p>",
  ];

  serialized.forEach((item, i) => {
    const answers = item.answers.map(escapeHtml).join(", ");
    paragraphs.push(
      `<p>${String(i + 1)}. ${escapeHtml(item.question)}<br>${answers}</p>`,
    );
  });

  return `<div class="ql-editor read-mode">${paragraphs.join("")}</div>`;
}
