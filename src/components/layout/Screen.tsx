import React, { type ReactNode } from "react";
import type { Lang } from "@/types";
import { ws } from "@/theme/styles";

export interface ScreenProps {
  lang: Lang;
  children: ReactNode;
  className?: string;
}

/**
 * Full-viewport screen shell applying language direction and page background.
 */
export default function Screen({ lang, children, className }: ScreenProps) {
  return (
    <div className={className} style={ws(lang)}>
      {children}
    </div>
  );
}
