import React, { type ButtonHTMLAttributes, type CSSProperties } from "react";
import { BORDER, CARD, NAVY, T1, TEAL } from "@/theme/tokens";

type ButtonVariant = "primary" | "secondary" | "ghost";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, CSSProperties> = {
  primary: {
    background: NAVY,
    color: "white",
    border: "none",
    boxShadow: "0 6px 22px rgba(27,44,75,0.28)",
  },
  secondary: {
    background: CARD,
    color: T1,
    border: `2px solid ${BORDER}`,
  },
  ghost: {
    background: "transparent",
    color: T1,
    border: "none",
  },
};

/**
 * Shared button primitive used by screens for consistent CTA styling.
 */
export default function Button({
  variant = "primary",
  fullWidth = false,
  style,
  disabled,
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      style={{
        padding: "16px 24px",
        borderRadius: 16,
        fontWeight: 700,
        fontSize: 15,
        cursor: disabled ? "default" : "pointer",
        opacity: disabled ? 0.55 : 1,
        width: fullWidth ? "100%" : undefined,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        transition: "background 0.15s, border-color 0.15s, opacity 0.15s",
        outline: "none",
        ...variantStyles[variant],
        ...style,
      }}
      onFocus={(e) => {
        e.currentTarget.style.boxShadow = `0 0 0 3px ${TEAL}55`;
      }}
      onBlur={(e) => {
        e.currentTarget.style.boxShadow =
          variant === "primary" ? "0 6px 22px rgba(27,44,75,0.28)" : "none";
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
