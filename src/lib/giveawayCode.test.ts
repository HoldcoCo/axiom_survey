import { describe, expect, it } from "vitest";
import { generateGiveawayCode, normalizeGiveawayCode } from "@/lib/giveawayCode";

describe("generateGiveawayCode", () => {
  it("returns a 9-digit ticket number", () => {
    const code = generateGiveawayCode();
    expect(code).toMatch(/^\d{9}$/);
  });

  it("produces different codes across calls", () => {
    const codes = new Set(Array.from({ length: 20 }, () => generateGiveawayCode()));
    expect(codes.size).toBeGreaterThan(1);
  });
});

describe("normalizeGiveawayCode", () => {
  it("returns null for empty or non-string values", () => {
    expect(normalizeGiveawayCode(null)).toBeNull();
    expect(normalizeGiveawayCode("")).toBeNull();
    expect(normalizeGiveawayCode("   ")).toBeNull();
  });

  it("trims a stored code", () => {
    expect(normalizeGiveawayCode("  K7MP-9Q2X  ")).toBe("K7MP-9Q2X");
  });
});
