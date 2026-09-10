import type { LevelData } from "../types/index.js";

/** Arabic maturity level bands. */
export const LEVELS_AR: LevelData[] = [
  {
    emoji: "leaf",
    label: "في بداية الطريق",
    accent: "#475569",
    accentBg: "#F8FAFC",
    accentBorder: "#CBD5E1",
    gaugeColor: "#94A3B8",
    tip: "أكبر فرصة الآن هي استبدال عملية يدوية واحدة بأداة سحابية بسيطة، المكاسب الصغيرة تتراكم بسرعة.",
    message: "أنت في نقطة البداية، وهذا هو أفضل مكان لبدء رحلة التحول الرقمي.",
  },
  {
    emoji: "trophy",
    label: "بطل العمل اليدوي",
    accent: "#92400E",
    accentBg: "#FFFBEB",
    accentBorder: "#FDE68A",
    gaugeColor: "#F59E0B",
    tip: "ربط أدواتك الحالية بطبقة تكامل بسيطة يمكن أن يوفر ساعات لفريقك كل أسبوع.",
    message: "أنت تعمل بجد، الآن دع التكنولوجيا تعمل بنفس الجد من أجلك.",
  },
  {
    emoji: "gear",
    label: "منظم، لكن غير متزامن",
    accent: "#0F766E",
    accentBg: "#F0FDFA",
    accentBorder: "#99F6E4",
    gaugeColor: "#0D9488",
    tip: "نظام ERP موحد أو طبقة تكامل ستفتح أمامك الرؤية الفورية لاتخاذ قرارات أسرع وأذكى.",
    message: "لديك الأدوات الصحيحة، لكنها لا تتحدث مع بعضها بعد.",
  },
  {
    emoji: "rocket",
    label: "متقدم رقمياً",
    accent: "#92400E",
    accentBg: "#FFFBEB",
    accentBorder: "#FDE68A",
    gaugeColor: "#F59E0B",
    tip: "الحد التالي هو الذكاء الاصطناعي والتحليلات التنبؤية، حوّل بياناتك إلى ميزتك التنافسية الكبرى.",
    message:
      "أنت متقدم على المنافسين. معظم الشركات تطمح إلى ما أنت فيه بالفعل.",
  },
];
