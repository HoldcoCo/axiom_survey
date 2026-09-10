import React, { type CSSProperties, type ReactNode } from "react";
import { BORDER, CARD } from "@/theme/tokens";

export interface CardProps {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  padding?: number | string;
}

/**
 * White elevated surface used across form / reveal panels.
 */
export default function Card({
  children,
  style,
  className,
  padding = 20,
}: CardProps) {
  return (
    <div
      className={className}
      style={{
        background: CARD,
        border: `1px solid ${BORDER}`,
        borderRadius: 20,
        padding,
        boxShadow: "0 2px 12px rgba(27,44,75,0.06)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
