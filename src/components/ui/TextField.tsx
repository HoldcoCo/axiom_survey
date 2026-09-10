import React, { type InputHTMLAttributes } from "react";
import { BORDER, CARD, T1, T2, TEAL } from "@/theme/tokens";
import { fontFor } from "@/theme/tokens";
import type { Lang } from "@/types";

export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
  id: string;
  label: string;
  lang: Lang;
  error?: string;
}

/**
 * Labeled text input with focus ring and optional error message.
 */
export default function TextField({
  id,
  label,
  lang,
  error,
  style,
  ...rest
}: TextFieldProps) {
  const ff = fontFor(lang);
  return (
    <div>
      <label
        htmlFor={id}
        style={{
          display: "block",
          fontSize: 13,
          fontWeight: 600,
          color: T2,
          marginBottom: 7,
          fontFamily: ff,
        }}
      >
        {label}
      </label>
      <input
        id={id}
        style={{
          width: "100%",
          padding: "13px 16px",
          borderRadius: 13,
          border: `1.5px solid ${error ? "#F87171" : BORDER}`,
          background: CARD,
          fontSize: 14,
          fontFamily: ff,
          color: T1,
          outline: "none",
          transition: "border-color 0.15s",
          ...style,
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = TEAL;
          rest.onFocus?.(e);
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = error ? "#F87171" : BORDER;
          rest.onBlur?.(e);
        }}
        aria-invalid={Boolean(error)}
        {...rest}
      />
      {error ? (
        <p
          role="alert"
          style={{
            fontSize: 12,
            color: "#B91C1C",
            marginTop: 6,
            fontFamily: ff,
          }}
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
