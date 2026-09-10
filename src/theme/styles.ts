import type { CSSProperties } from "react";
import type { Lang } from "@/types";
import { FONT_AR, FONT_EN, PAGE } from "./tokens";

/**
 * Full-viewport screen wrapper styles (background, font, RTL/LTR).
 * @param lang - Active UI language
 */
export function ws(lang: Lang): CSSProperties {
  return {
    backgroundColor: PAGE,
    minHeight: "100vh",
    fontFamily: lang === "ar" ? FONT_AR : FONT_EN,
    direction: lang === "ar" ? "rtl" : "ltr",
    display: "flex",
    flexDirection: "column",
  };
}

/** Narrow mobile content column. */
export const inner: CSSProperties = {
  maxWidth: 430,
  width: "100%",
  margin: "0 auto",
};

/** Wider tablet / report content column. */
export const innerWide: CSSProperties = {
  maxWidth: 900,
  width: "100%",
  margin: "0 auto",
};
