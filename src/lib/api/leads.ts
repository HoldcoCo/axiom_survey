import type { LeadSubmissionPayload, LeadSubmissionResult } from "@/types";

/**
 * Posts a lead payload to the Vercel /api/lead serverless function.
 * Never throws — network failures return `{ ok: false, error: "network" }`.
 *
 * @param payload - Validated lead + score + serialized answers
 */
export async function submitLead(
  payload: LeadSubmissionPayload,
): Promise<LeadSubmissionResult> {
  try {
    const response = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.status === 429) {
      return { ok: false, error: "rate_limit" };
    }
    if (response.status === 400) {
      return { ok: false, error: "validation" };
    }
    if (response.status === 503) {
      return { ok: false, error: "config" };
    }
    if (!response.ok) {
      return { ok: false, error: "upstream" };
    }

    const data: unknown = await response.json();
    if (
      typeof data === "object" &&
      data !== null &&
      "ok" in data &&
      (data as { ok: unknown }).ok === true
    ) {
      const emailSent =
        "emailSent" in data &&
        (data as { emailSent: unknown }).emailSent === true;
      return { ok: true, emailSent };
    }
    return { ok: false, error: "upstream" };
  } catch {
    return { ok: false, error: "network" };
  }
}
