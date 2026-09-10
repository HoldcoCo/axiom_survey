import React, { useState } from "react";
import type { Lang } from "@/types";
import { COUNTRIES } from "@/data/countries";
import { BORDER, CARD, PAGE, T1, T3, TEAL } from "@/theme/tokens";

export default function PhoneInput({
  value,
  dialCode,
  onDialChange,
  onNumberChange,
  lang,
  placeholder,
}: {
  value: string;
  dialCode: string;
  onDialChange: (dial: string) => void;
  onNumberChange: (num: string) => void;
  lang: Lang;
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ff = lang === "ar" ? "'Cairo', sans-serif" : "'Inter', sans-serif";

  const filtered = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.dial.includes(search) ||
      c.code.toLowerCase().includes(search.toLowerCase()),
  );
  const selected = COUNTRIES.find((c) => c.dial === dialCode) ?? COUNTRIES[0];

  return (
    <div style={{ position: "relative" }}>
      <div style={{ display: "flex", gap: 8 }}>
        {/* Dial code selector */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "13px 12px",
            borderRadius: 13,
            border: `1.5px solid ${open ? TEAL : BORDER}`,
            background: CARD,
            cursor: "pointer",
            fontFamily: ff,
            whiteSpace: "nowrap",
            flexShrink: 0,
            transition: "border-color 0.15s",
            outline: "none",
          }}
        >
          <span style={{ fontSize: 20 }}>{selected.flag}</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: T1 }}>
            {selected.dial}
          </span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            style={{
              opacity: 0.4,
              transform: open ? "rotate(180deg)" : "rotate(0)",
              transition: "transform 0.2s",
            }}
          >
            <path
              d="M2 4L6 8L10 4"
              stroke={T1}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Number input */}
        <input
          type="tel"
          value={value}
          onChange={(e) => onNumberChange(e.target.value)}
          placeholder={placeholder}
          style={{
            flex: 1,
            padding: "13px 16px",
            borderRadius: 13,
            border: `1.5px solid ${BORDER}`,
            background: CARD,
            fontSize: 14,
            fontFamily: ff,
            color: T1,
            outline: "none",
            direction: "ltr",
            transition: "border-color 0.15s",
            minWidth: 0,
          }}
          onFocus={(e) => {
            e.target.style.borderColor = TEAL;
          }}
          onBlur={(e) => {
            e.target.style.borderColor = BORDER;
          }}
        />
      </div>

      {/* Dropdown */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 100,
            marginTop: 6,
            background: CARD,
            borderRadius: 16,
            border: `1.5px solid ${BORDER}`,
            boxShadow: "0 8px 32px rgba(27,44,75,0.14)",
            overflow: "hidden",
          }}
        >
          {/* Search */}
          <div
            style={{
              padding: "10px 12px",
              borderBottom: `1px solid ${BORDER}`,
            }}
          >
            <input
              autoFocus
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={lang === "ar" ? "ابحث..." : "Search country..."}
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: 10,
                border: `1.5px solid ${BORDER}`,
                background: PAGE,
                fontSize: 13,
                fontFamily: ff,
                color: T1,
                outline: "none",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = TEAL;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = BORDER;
              }}
            />
          </div>
          {/* List */}
          <div
            style={{ maxHeight: 220, overflowY: "auto" }}
            className="scrollbar-hide"
          >
            {filtered.map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => {
                  onDialChange(c.dial);
                  setOpen(false);
                  setSearch("");
                }}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "11px 14px",
                  border: "none",
                  background: c.dial === dialCode ? "#EEF9F8" : "transparent",
                  cursor: "pointer",
                  fontFamily: ff,
                  textAlign: "left",
                  transition: "background 0.1s",
                }}
                onMouseEnter={(e) => {
                  if (c.dial !== dialCode)
                    e.currentTarget.style.background = PAGE;
                }}
                onMouseLeave={(e) => {
                  if (c.dial !== dialCode)
                    e.currentTarget.style.background = "transparent";
                }}
              >
                <span style={{ fontSize: 20 }}>{c.flag}</span>
                <span
                  style={{ flex: 1, fontSize: 13, fontWeight: 500, color: T1 }}
                >
                  {c.name}
                </span>
                <span style={{ fontSize: 12, color: T3, fontWeight: 600 }}>
                  {c.dial}
                </span>
              </button>
            ))}
            {filtered.length === 0 && (
              <p
                style={{
                  textAlign: "center",
                  padding: "20px",
                  fontSize: 13,
                  color: T3,
                  fontFamily: ff,
                }}
              >
                {lang === "ar" ? "لا نتائج" : "No results"}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
