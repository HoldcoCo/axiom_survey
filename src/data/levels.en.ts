import type { LevelData } from "@/types";

/** English maturity level bands. */
export const LEVELS_EN: LevelData[] = [
  {
    emoji: "leaf",
    label: "Just Getting Started",
    accent: "#475569",
    accentBg: "#F8FAFC",
    accentBorder: "#CBD5E1",
    gaugeColor: "#94A3B8",
    tip: "The highest-leverage move right now is replacing one manual process with a simple cloud tool. Small wins compound fast.",
    message:
      "You're at the starting line, the best place to begin a transformation.",
  },
  {
    emoji: "trophy",
    label: "Manual Hero",
    accent: "#92400E",
    accentBg: "#FFFBEB",
    accentBorder: "#FDE68A",
    gaugeColor: "#F59E0B",
    tip: "Connecting your existing tools with a simple integration layer could save your team hours every single week.",
    message:
      "You're working hard. Now let technology work just as hard for you.",
  },
  {
    emoji: "gear",
    label: "Systemized, Not Synced",
    accent: "#0F766E",
    accentBg: "#F0FDFA",
    accentBorder: "#99F6E4",
    gaugeColor: "#0D9488",
    tip: "A unified ERP or integration layer unlocks the real-time visibility you need to make faster, smarter decisions.",
    message:
      "You have the right tools, they just aren't talking to each other yet.",
  },
  {
    emoji: "rocket",
    label: "Digitally Fluent",
    accent: "#92400E",
    accentBg: "#FFFBEB",
    accentBorder: "#FDE68A",
    gaugeColor: "#F59E0B",
    tip: "Your next frontier is AI and predictive analytics, turning your data into your biggest competitive advantage.",
    message:
      "You're ahead of the curve. Most businesses aspire to where you already are.",
  },
];
