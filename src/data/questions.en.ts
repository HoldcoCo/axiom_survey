import type { QuestionData } from "@/types";

/** English assessment questions. */
export const QS_EN: QuestionData[] = [
  {
    title: "What's your business sector?",
    type: "multi",
    options: [
      { emoji: "factory", label: "Manufacturing" },
      { emoji: "shopping", label: "Retail / Trading" },
      { emoji: "building", label: "Construction / Real Estate" },
      { emoji: "briefcase", label: "Services" },
      { emoji: "health", label: "Healthcare" },
      { emoji: "finance", label: "Finance / Banking" },
      { emoji: "education", label: "Education" },
      { emoji: "other", label: "Other", isOther: true },
    ],
  },
  {
    title: "How big is your team?",
    type: "single",
    options: [
      { emoji: "user1", label: "Just me / under 5" },
      { emoji: "users2", label: "5 – 20" },
      { emoji: "users3", label: "21 – 50" },
      { emoji: "office", label: "51 – 100" },
      { emoji: "city", label: "+100" },
    ],
  },
  {
    title: "How does your business operate today?",
    type: "single",
    options: [
      {
        emoji: "spreadsheet",
        label: "Mostly Excel, WhatsApp & paper",
        points: 10,
      },
      {
        emoji: "laptop",
        label: "Basic system, but disconnected tools",
        points: 15,
      },
      { emoji: "gear", label: "An ERP, but outdated or limited", points: 20 },
      {
        emoji: "rocket",
        label: "A modern integrated system already",
        points: 60,
      },
      { emoji: "other", label: "Other", isOther: true, points: 0 },
    ],
  },
  {
    title: "If you could fix ONE thing tomorrow, what would it be?",
    type: "single",
    options: [
      { emoji: "clock", label: "Everything is slow / manual", points: 10 },
      { emoji: "eyeoff", label: "No real-time numbers or reports", points: 15 },
      {
        emoji: "unlink",
        label: "Departments don't talk to each other",
        points: 15,
      },
      { emoji: "box", label: "Inventory / stock is a mess", points: 15 },
      {
        emoji: "chartdown",
        label: "Financial tracking is a nightmare",
        points: 15,
      },
      {
        emoji: "trendingup",
        label: "Systems can't scale with our growth",
        points: 15,
      },
    ],
  },
  {
    title: "Do you currently use any of these?",
    type: "multi",
    maxSelect: 2,
    options: [
      { emoji: "cpu", label: "AI / Automation tools", points: 5 },
      { emoji: "cloud", label: "Cloud software", points: 3 },
      { emoji: "mobile", label: "Mobile apps for business", points: 5 },
      { emoji: "barchart", label: "Dashboards / analytics", points: 3 },
      {
        emoji: "xmark",
        label: "None of the above yet",
        points: 0,
        isNone: true,
      },
    ],
  },
  {
    title: "Where do you see your business in 12 months?",
    type: "single",
    options: [
      { emoji: "leaf", label: "Same size, just running smoother" },
      { emoji: "trendingup", label: "Growing / expanding" },
      { emoji: "globe", label: "Scaling regionally" },
      { emoji: "refresh", label: "Considering a full digital overhaul" },
    ],
  },
];
