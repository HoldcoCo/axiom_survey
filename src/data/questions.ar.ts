import type { QuestionData } from "@/types";

/** Arabic assessment questions. */
export const QS_AR: QuestionData[] = [
  {
    title: "ما مجال عملك؟",
    type: "multi",
    options: [
      { emoji: "factory", label: "تصنيع" },
      { emoji: "shopping", label: "تجارة / بيع بالتجزئة" },
      { emoji: "building", label: "إنشاءات / عقارات" },
      { emoji: "briefcase", label: "خدمات" },
      { emoji: "health", label: "رعاية صحية" },
      { emoji: "finance", label: "مالية / بنوك" },
      { emoji: "education", label: "تعليم" },
      { emoji: "other", label: "أخرى", isOther: true },
    ],
  },
  {
    title: "كم حجم فريقك؟",
    type: "single",
    options: [
      { emoji: "user1", label: "أنا فقط / أقل من 5" },
      { emoji: "users2", label: "5 – 20" },
      { emoji: "users3", label: "21 – 50" },
      { emoji: "office", label: "51 – 100" },
      { emoji: "city", label: "+100" },
    ],
  },
  {
    title: "كيف يعمل عملك حالياً؟",
    type: "single",
    options: [
      { emoji: "spreadsheet", label: "أساساً Excel وواتساب وورق", points: 10 },
      { emoji: "laptop", label: "نظام أساسي، لكن أدوات منفصلة", points: 15 },
      { emoji: "gear", label: "نظام ERP، لكنه قديم أو محدود", points: 20 },
      { emoji: "rocket", label: "نظام متكامل وحديث بالفعل", points: 60 },
      { emoji: "other", label: "أخرى", isOther: true, points: 0 },
    ],
  },
  {
    title: "لو أمكنك إصلاح شيء واحد غداً، ماذا سيكون؟",
    type: "single",
    options: [
      { emoji: "clock", label: "كل شيء بطيء ويدوي", points: 10 },
      { emoji: "eyeoff", label: "لا أرى أرقاماً وتقارير فورية", points: 15 },
      { emoji: "unlink", label: "الأقسام لا تتواصل مع بعضها", points: 15 },
      { emoji: "box", label: "المخزون فوضى", points: 15 },
      { emoji: "chartdown", label: "تتبع المالية كابوس", points: 15 },
      { emoji: "trendingup", label: "الأنظمة لا تواكب نمونا", points: 15 },
    ],
  },
  {
    title: "هل تستخدم حالياً أياً من هذه؟",
    type: "multi",
    maxSelect: 2,
    options: [
      { emoji: "cpu", label: "الذكاء الاصطناعي / الأتمتة", points: 5 },
      { emoji: "cloud", label: "برامج سحابية", points: 3 },
      { emoji: "mobile", label: "تطبيقات موبايل للعمل", points: 5 },
      { emoji: "barchart", label: "لوحات بيانات وتحليلات", points: 3 },
      {
        emoji: "xmark",
        label: "لا شيء من هذا حتى الآن",
        points: 0,
        isNone: true,
      },
    ],
  },
  {
    title: "أين تريد أن يكون عملك في 12 شهراً؟",
    type: "single",
    options: [
      { emoji: "leaf", label: "نفس الحجم، لكن يعمل بشكل أفضل" },
      { emoji: "trendingup", label: "نمو وتوسع" },
      { emoji: "globe", label: "توسع إقليمي" },
      { emoji: "refresh", label: "تحول رقمي كامل" },
    ],
  },
];
