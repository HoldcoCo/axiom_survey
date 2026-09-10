/**
 * Root application — assessment funnel state machine only.
 * Screens live under src/screens/; scoring and lead POST live under src/lib/.
 */
import React, { useCallback, useMemo, useState } from "react";
import { getQuestions } from "@/data";
import { useCountUp } from "@/hooks/useCountUp";
import { useDocumentLang } from "@/hooks/useDocumentLang";
import { submitLead } from "@/lib/api/leads";
import { computeScore, getLevel } from "@/lib/scoring";
import { serializeAnswers } from "@/lib/serializeAnswers";
import FormScreen from "@/screens/FormScreen";
import HookScreen from "@/screens/HookScreen";
import LangScreen from "@/screens/LangScreen";
import LoadingScreen from "@/screens/LoadingScreen";
import QuestionScreen from "@/screens/QuestionScreen";
import ReportScreen from "@/screens/ReportScreen";
import RevealScreen from "@/screens/RevealScreen";
import {
  emptyLeadForm,
  type AnswerMap,
  type Lang,
  type LeadFormData,
  type OtherTextMap,
  type QuestionData,
} from "@/types";

type EmailStatus = "idle" | "pending" | "sent" | "failed";

/**
 * Initial selection for a question step from saved answers (or empty for multi).
 */
function selectionForStep(
  step: number,
  answers: AnswerMap,
  question: QuestionData | undefined,
): number | number[] | null {
  if (!question) return null;
  const saved = answers[step];
  if (saved !== undefined) return saved;
  return question.type === "multi" ? [] : null;
}

/**
 * Holdco Digital Health Check funnel.
 * Flow: Hook → Language → Q1–6 → Form → Loading → Reveal → (optional) Report
 */
export default function App() {
  const [showHook, setShowHook] = useState(true);
  const [lang, setLang] = useState<Lang | null>(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [selected, setSelected] = useState<number | number[] | null>(null);
  const [otherTexts, setOtherTexts] = useState<OtherTextMap>({});
  const [formData, setFormData] = useState<LeadFormData>(emptyLeadForm);
  const [score, setScore] = useState(0);
  const [showReport, setShowReport] = useState(false);
  const [emailStatus, setEmailStatus] = useState<EmailStatus>("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [honeypotValue, setHoneypotValue] = useState("");

  useDocumentLang(lang);

  const qs = useMemo(
    () => (lang === null ? [] : getQuestions(lang)),
    [lang],
  );

  const displayScore = useCountUp(score, step === 9 && !showReport);

  /**
   * Posts the lead to /api/lead (ERPNext via Vercel). Never blocks the score reveal.
   */
  const postLead = useCallback(
    async (computedScore: number, website: string) => {
      if (lang === null) return;
      setEmailStatus("pending");
      const level = getLevel(computedScore, lang);
      const serialized = serializeAnswers(answers, qs, otherTexts);
      const result = await submitLead({
        form: formData,
        score: computedScore,
        levelLabel: level.label,
        lang,
        answers: serialized,
        website,
      });
      if (result.ok && result.emailSent === true) {
        setEmailStatus("sent");
      } else if (result.ok && result.emailSent === undefined) {
        setEmailStatus("idle");
      } else {
        setEmailStatus("failed");
      }
    },
    [answers, formData, lang, otherTexts, qs],
  );

  function handleSelect(i: number) {
    const question = qs[step - 1];
    if (!question) return;
    if (question.type === "single") {
      setSelected(i);
      return;
    }
    const opt = question.options[i];
    setSelected((prev) => {
      const arr = Array.isArray(prev) ? [...prev] : [];
      if (opt?.isNone) return arr.includes(i) ? [] : [i];
      const noneI = question.options.findIndex((o) => o.isNone);
      const clean = noneI >= 0 ? arr.filter((x) => x !== noneI) : arr;
      if (clean.includes(i)) return clean.filter((x) => x !== i);
      if (question.maxSelect && clean.length >= question.maxSelect) return clean;
      return [...clean, i];
    });
  }

  function canContinue(): boolean {
    if (step < 1 || step > 6) return false;
    const question = qs[step - 1];
    if (!question) return false;
    if (question.type === "multi") {
      return Array.isArray(selected) && selected.length > 0;
    }
    return typeof selected === "number";
  }

  function goToStep(nextStep: number, nextAnswers: AnswerMap) {
    setStep(nextStep);
    if (nextStep >= 1 && nextStep <= 6) {
      setSelected(selectionForStep(nextStep, nextAnswers, qs[nextStep - 1]));
    }
  }

  function handleContinue() {
    if (step < 1 || step > 6) return;
    if (selected === null) return;
    if (Array.isArray(selected) && selected.length === 0) return;
    const nextAnswers = { ...answers, [step]: selected };
    setAnswers(nextAnswers);
    goToStep(step + 1, nextAnswers);
  }

  async function handleFormSubmit(honeypot: string) {
    if (lang === null || isSubmitting) return;
    setIsSubmitting(true);
    setHoneypotValue(honeypot);
    const computed = computeScore(answers, qs);
    setScore(computed);
    setStep(8);
    void postLead(computed, honeypot);
    window.setTimeout(() => {
      setStep(9);
      setIsSubmitting(false);
    }, 2600);
  }

  function handleBack() {
    if (step === 1) {
      setLang(null);
      setStep(0);
      setSelected(null);
      return;
    }
    if (step > 1) {
      goToStep(step - 1, answers);
    }
  }

  function handleRetake() {
    setShowHook(true);
    setLang(null);
    setStep(0);
    setAnswers({});
    setSelected(null);
    setOtherTexts({});
    setFormData(emptyLeadForm());
    setScore(0);
    setShowReport(false);
    setEmailStatus("idle");
    setIsSubmitting(false);
    setHoneypotValue("");
  }

  function handleResend() {
    if (lang === null) return;
    void postLead(score, honeypotValue);
  }

  function handleFormChange(field: keyof LeadFormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleLangSelect(l: Lang) {
    setLang(l);
    const questions = getQuestions(l);
    setStep(1);
    setSelected(selectionForStep(1, answers, questions[0]));
  }

  if (showHook) {
    return <HookScreen onNext={() => setShowHook(false)} />;
  }

  if (lang === null) {
    return (
      <LangScreen
        onSelect={handleLangSelect}
        onBack={() => setShowHook(true)}
      />
    );
  }

  if (step === 8) {
    return <LoadingScreen lang={lang} />;
  }

  if (step === 9 && showReport) {
    return (
      <ReportScreen
        score={score}
        answers={answers}
        formData={formData}
        lang={lang}
        onBack={() => setShowReport(false)}
      />
    );
  }

  if (step === 9) {
    return (
      <RevealScreen
        key={`reveal-${score}`}
        score={score}
        displayScore={displayScore}
        email={formData.email}
        lang={lang}
        emailStatus={emailStatus}
        onViewReport={() => setShowReport(true)}
        onRetake={handleRetake}
        onResend={handleResend}
      />
    );
  }

  if (step === 7) {
    return (
      <FormScreen
        formData={formData}
        onChange={handleFormChange}
        onSubmit={handleFormSubmit}
        onBack={handleBack}
        lang={lang}
        isSubmitting={isSubmitting}
      />
    );
  }

  const question = qs[step - 1];
  if (!question || step < 1) {
    return (
      <LangScreen
        onSelect={handleLangSelect}
        onBack={() => setShowHook(true)}
      />
    );
  }

  return (
    <QuestionScreen
      step={step}
      question={question}
      selected={selected}
      otherText={otherTexts[step] ?? ""}
      lang={lang}
      onSelect={handleSelect}
      onOtherText={(v) =>
        setOtherTexts((prev) => ({ ...prev, [step]: v }))
      }
      onContinue={handleContinue}
      onBack={handleBack}
      canContinue={canContinue()}
    />
  );
}
