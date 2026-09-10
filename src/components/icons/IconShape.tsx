import React from "react";
import { ICON_COLORS } from "./iconColors";
import { ICON_PATHS } from "./iconPaths";

/** Colored rounded square with a stroke SVG icon inside. */
export default function IconShape({ name, size = 48 }: { name: string; size?: number }) {
  const colors = ICON_COLORS[name] ?? { bg: "#F1F5F9", stroke: "#64748B" };
  const paths = ICON_PATHS[name];
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.29,
        flexShrink: 0,
        background: colors.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        width={size * 0.52}
        height={size * 0.52}
        viewBox="0 0 24 24"
        fill="none"
        stroke={colors.stroke}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {paths}
      </svg>
    </div>
  );
}
