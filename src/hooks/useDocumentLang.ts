import { useEffect } from "react";
import type { Lang } from "@/types";

/**
 * Syncs documentElement lang/dir with the assessment language.
 * @param lang - Active language, or null before selection
 */
export function useDocumentLang(lang: Lang | null): void {
  useEffect(() => {
    const html = document.documentElement;
    if (lang === null) {
      html.lang = "en";
      html.dir = "ltr";
      return;
    }
    html.lang = lang;
    html.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);
}
