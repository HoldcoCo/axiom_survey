import { describe, expect, it } from "vitest";
import { QS_EN } from "@/data/questions.en";
import { computeScore, getLevel } from "@/lib/scoring";
import type { AnswerMap } from "@/types";

describe("computeScore", () => {
  it("returns 0 when no scoring answers are present", () => {
    expect(computeScore({}, QS_EN)).toBe(0);
  });

  it("scores single-select Q3 (step 3 → qs[2]) by option points", () => {
    // qs[2] options: 10, 15, 20, 60, 0
    const answers: AnswerMap = { 3: 0 };
    expect(computeScore(answers, QS_EN)).toBe(10);
  });

  it("takes max points for multi Q3 arrays", () => {
    const answers: AnswerMap = { 3: [0, 2] };
    expect(computeScore(answers, QS_EN)).toBe(20);
  });

  it("sums Q4 option points", () => {
    const answers: AnswerMap = { 4: 1 };
    expect(computeScore(answers, QS_EN)).toBe(15);
  });

  it("sums Q5 multi-select points", () => {
    const answers: AnswerMap = { 5: [0, 1] };
    expect(computeScore(answers, QS_EN)).toBe(8);
  });

  it("caps the total at 100", () => {
    const answers: AnswerMap = {
      3: 3,
      4: [0, 1, 2, 3, 4, 5],
      5: [0, 1, 2, 3],
    };
    expect(computeScore(answers, QS_EN)).toBe(100);
  });
});

describe("getLevel", () => {
  it("maps score bands correctly in English", () => {
    expect(getLevel(0, "en").label).toBe("Just Getting Started");
    expect(getLevel(25, "en").label).toBe("Just Getting Started");
    expect(getLevel(26, "en").label).toBe("Manual Hero");
    expect(getLevel(50, "en").label).toBe("Manual Hero");
    expect(getLevel(51, "en").label).toBe("Systemized, Not Synced");
    expect(getLevel(75, "en").label).toBe("Systemized, Not Synced");
    expect(getLevel(76, "en").label).toBe("Digitally Fluent");
    expect(getLevel(100, "en").label).toBe("Digitally Fluent");
  });
});
