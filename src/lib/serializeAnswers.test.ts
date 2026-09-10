import { describe, expect, it } from "vitest";
import { QS_EN } from "@/data/questions.en";
import {
  formatAnswersAsHtmlNote,
  serializeAnswers,
} from "@/lib/serializeAnswers";

describe("serializeAnswers", () => {
  it("resolves indices to option labels", () => {
    const result = serializeAnswers({ 1: [0], 2: 1 }, QS_EN);
    expect(result[0]?.question).toBe("What's your business sector?");
    expect(result[0]?.answers).toEqual(["Manufacturing"]);
    expect(result[1]?.answers).toEqual(["5 – 20"]);
  });

  it("uses otherTexts for Other options", () => {
    const otherIdx = QS_EN[0]?.options.findIndex((o) => o.isOther) ?? -1;
    expect(otherIdx).toBeGreaterThanOrEqual(0);
    const result = serializeAnswers(
      { 1: [otherIdx] },
      QS_EN,
      { 1: "Logistics" },
    );
    expect(result[0]?.answers).toEqual(["Logistics"]);
  });
});

describe("formatAnswersAsHtmlNote", () => {
  it("wraps answers in a Quill CRM Note body", () => {
    const serialized = serializeAnswers({ 1: [0] }, QS_EN);
    const html = formatAnswersAsHtmlNote(serialized, 42, "Manual Hero", "en");
    expect(html.startsWith('<div class="ql-editor read-mode">')).toBe(true);
    expect(html).toContain("Score: 42/100");
    expect(html).toContain("Manual Hero");
    expect(html).toContain("Manufacturing");
  });

  it("escapes HTML in labels", () => {
    const html = formatAnswersAsHtmlNote(
      [{ question: "<script>", answers: ["a & b"] }],
      10,
      "X",
      "en",
    );
    expect(html).toContain("&lt;script&gt;");
    expect(html).toContain("a &amp; b");
    expect(html).not.toContain("<script>");
  });
});
