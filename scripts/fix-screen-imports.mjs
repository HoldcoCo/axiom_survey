import fs from "fs";
import path from "path";

const headers = {
  "src/screens/LangScreen.tsx": `import React from "react";
import type { Lang } from "@/types";
import LogoPair from "@/components/layout/LogoPair";
import TopBanner from "@/components/layout/TopBanner";
import { useIsTablet } from "@/hooks/useIsTablet";
import { BORDER, CARD, PAGE, T1, T2, T3, TEAL } from "@/theme/tokens";
`,
  "src/screens/LoadingScreen.tsx": `import React, { useEffect, useState } from "react";
import type { Lang } from "@/types";
import { UI } from "@/i18n";
import IconShape from "@/components/icons/IconShape";
import { useIsTablet } from "@/hooks/useIsTablet";
import { ws } from "@/theme/styles";
import { BORDER, CARD, PAGE, T1, T2, T3, TEAL } from "@/theme/tokens";
`,
  "src/screens/QuestionScreen.tsx": `import React from "react";
import type { Lang, QuestionData } from "@/types";
import { UI } from "@/i18n";
import OptionCard from "@/components/ui/OptionCard";
import ProgressBar from "@/components/ui/ProgressBar";
import LogoPair from "@/components/layout/LogoPair";
import { useIsTablet } from "@/hooks/useIsTablet";
import { ws } from "@/theme/styles";
import { BORDER, CARD, NAVY, PAGE, T1, T2, T3, TEAL } from "@/theme/tokens";
`,
  "src/screens/FormScreen.tsx": `import React, { useState } from "react";
import type { Lang, LeadFormData } from "@/types";
import { UI } from "@/i18n";
import LogoPair from "@/components/layout/LogoPair";
import PhoneInput from "@/components/ui/PhoneInput";
import ProgressBar from "@/components/ui/ProgressBar";
import { useIsTablet } from "@/hooks/useIsTablet";
import {
  isFormValid,
  validateLeadForm,
  type FormErrors,
} from "@/lib/validation";
import { ws, inner } from "@/theme/styles";
import { BORDER, CARD, NAVY, PAGE, T1, T2, T3, TEAL } from "@/theme/tokens";
`,
  "src/screens/RevealScreen.tsx": `import React from "react";
import type { Lang } from "@/types";
import { UI } from "@/i18n";
import IconShape from "@/components/icons/IconShape";
import LogoPair from "@/components/layout/LogoPair";
import { useIsTablet } from "@/hooks/useIsTablet";
import { getBookingUrl } from "@/lib/bookingUrl";
import { getLevel } from "@/lib/scoring";
import { ws, inner, innerWide } from "@/theme/styles";
import { BORDER, CARD, NAVY, T1, T2, T3, TEAL } from "@/theme/tokens";
`,
  "src/screens/ReportScreen.tsx": `import React from "react";
import type { AnswerMap, Lang, LeadFormData } from "@/types";
import { UI } from "@/i18n";
import { getQuestions } from "@/data";
import IconShape from "@/components/icons/IconShape";
import LogoPair from "@/components/layout/LogoPair";
import { useIsTablet } from "@/hooks/useIsTablet";
import { getBookingUrl } from "@/lib/bookingUrl";
import { getLevel } from "@/lib/scoring";
import { hexRgba } from "@/theme/utils";
import { ws, inner, innerWide } from "@/theme/styles";
import { BORDER, T1, T2, T3 } from "@/theme/tokens";
`,
};

for (const [rel, header] of Object.entries(headers)) {
  const p = path.join(process.cwd(), rel);
  let body = fs.readFileSync(p, "utf8");
  const idx = body.search(/^export (default function|interface)/m);
  if (idx < 0) {
    console.log("skip", rel);
    continue;
  }
  body = body.slice(idx);
  fs.writeFileSync(p, `${header}\n${body}`);
  console.log("fixed", rel);
}
