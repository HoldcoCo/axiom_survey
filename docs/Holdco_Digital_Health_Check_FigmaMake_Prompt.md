# Figma Make Prompt — Holdco "Digital Health Check" Interactive Quiz

Copy everything below into Figma Make as your build prompt.

---

Build a **mobile-first web app** called **"Holdco Digital Health Check"** — a gamified 60-second self-assessment quiz that visitors reach by scanning a QR code on their own phone (not a shared tablet). It should feel like a premium "business fitness test": fun and addictive like a personality quiz, but polished and trustworthy like a corporate diagnostic tool. Think Duolingo-level playfulness crossed with a management-consulting deck.

Design every screen for a single-hand phone viewport (375–430px wide), portrait orientation, thumb-reachable tap zones near the bottom of the screen.

## Visual style
- Corporate-premium, not childish: clean sans-serif typography (e.g. Inter/Manrope-style), generous white space, rounded cards (16–20px radius), soft shadows.
- Primary palette: deep navy/indigo (#0F1E3D or similar) as the anchor color, paired with one vibrant accent (electric blue, teal, or amber) used only for progress, CTAs, and the score gauge — everything else stays neutral (white/light-grey backgrounds, charcoal text).
- Subtle gradients and glassmorphism touches on cards and the score reveal screen for a premium, slightly cinematic feel — not flat/minimal, not garish.
- Large tap targets and big legible type (this runs on a tablet at a booth, often tapped quickly by a stranger standing up).
- Micro-animations: smooth slide/fade transitions between screens, a subtle bounce on answer selection, an animated gauge/counter on the reveal screen.
- Use emojis as the icon system for answer options (as specified per question below) — keep them large and paired with short label text, laid out as tappable cards/pills, not a plain radio list.

## Global UI elements
- Persistent top progress bar across all 7 questions, with a friendly label like "You're 40% there!"
- Back arrow (top-left) to revisit previous questions.
- One question per screen, large question title, answer options as a vertical stack of tappable cards (single-select questions) or toggle chips (multi-select question).
- "Continue" button appears once an answer is selected, fixed at the bottom.

## Screens & content

### 1. Intro screen (landing after QR scan)
- Small Holdco logo/wordmark at top.
- Headline: "How Digitally Ready Is Your Business?"
- Subtext: "Answer 7 quick questions. Get your instant Digital Maturity Score + a personalized tip. Takes less than a minute."
- Primary CTA button: "Start Now →"
- Small trust line beneath, e.g. "Free · No commitment · Results in 60 seconds"

### 2. Q1 — The Basics (single-select)
"What's your business playing field?"
🏭 Manufacturing · 🛒 Retail / Trading · 🏗️ Construction / Real Estate · 💼 Services · 🏥 Healthcare · 🏦 Finance · 🎓 Education · ✨ Other

### 3. Q2 — Size Check (single-select)
"How big is your team?"
🧍 Just me / under 5 · 👥 5–20 · 👥 21–50 · 🏢 51–100 · 🏙️ 100+

### 4. Q3 — The Reality Check (single-select, scored)
"How does your business run today?"
- 📝 Mostly Excel, WhatsApp & paper (10 pts)
- 💻 A local/basic system, but disconnected tools (15 pts)
- ⚙️ An ERP, but it feels outdated or limited (20 pts)
- 🚀 A modern integrated system already (60 pts)

### 5. Q4 — The Pain Point (single-select, scored)
"If you could wave a magic wand and fix ONE thing tomorrow, what would it be?"
- 🐢 Everything is slow / manual (10 pts)
- 🙈 I can't see real-time numbers or reports (15 pts)
- 🧩 My departments don't talk to each other (15 pts)
- 📦 Inventory / stock is a mess (15 pts)
- 💸 Financial tracking is a nightmare (15 pts)
- 📈 I want to grow but my systems can't scale (15 pts)

### 6. Q5 — The Tech Pulse (multi-select "tap all that apply," scored per selection)
"Do you currently use any of these?"
- 🤖 AI / Automation tools (5 pts)
- ☁️ Cloud software (3 pts)
- 📱 Mobile apps for business (5 pts)
- 📊 Dashboards / analytics (3 pts)
- ❌ None of the above yet (0 pts)

### 7. Q6 — The Ambition Check (single-select, not scored)
"Where do you see your business in 12 months?"
🌱 Same size, just running smoother · 📈 Growing / expanding · 🌍 Scaling regionally · 🔄 Considering a full digital overhaul

### 8. Q7 — Lead capture form
"Want your personalized results + a free 15-min consultation?"
Fields: Name, Company, Phone, WhatsApp, Email
Small note under the Email field: "We'll send your full score + tip here too."
Button: "Get My Score →"
Style this as a clean, short form — not a wall of inputs; stack fields with soft-rounded inputs, keep it fast to fill on one phone screen without much scrolling.

### 9. Reveal / Score screen (the premium "wow" moment)
- Animated circular gauge or dial that fills up to reveal the score out of 100 (count-up animation).
- Headline: "🎉 Your Digital Maturity Score: [XX]/100"
- Level badge below the score, styled like a game achievement badge, pulled from the scoring table below.
- Short encouraging paragraph (dynamic based on level) plus a "Quick Win" tip callout in a highlighted card.
- Line: "Ready to see exactly how? Our team will reach out within 24 hours with a tailored breakdown."
- Confirmation strip below the CTA, small and reassuring: "📩 We've also sent this to your email: [entered email address]"
- Primary CTA: "Book a Free 15-min Session with Holdco →"
- Secondary text link: "Resend my results by email"

## Scoring logic (implement as simple weighted sum, cap at 100)
Score = sum of points from Q3 (single answer) + Q4 (single answer) + Q5 (sum of all selected options). Q3 carries the heaviest weight.

## Maturity level bands (drive badge, color accent, and copy on the reveal screen)
| Score Range | Label | Vibe / Badge tone |
|---|---|---|
| 0–25 | 🐣 "Just Getting Started" | Muted grey/blue badge — encouraging, no judgment |
| 26–50 | 🦸 "Manual Hero" | Amber badge — "working hard, not smart yet" |
| 51–75 | ⚙️ "Systemized, Not Synced" | Teal badge — "has tools, but disconnected" |
| 76–100 | 🚀 "Digitally Fluent" | Deep navy + gold accent badge — premium, top-tier feel |

## 10. Results email design
On submitting Q7, an email is triggered to the address they entered. Design this as an HTML email template (single column, 600px max width, mobile-responsive) that mirrors the app's visual identity so it feels like the same product, not a generic auto-reply:
- Header band in the navy brand color with the Holdco logo/wordmark, centered.
- Headline: "Here's Your Digital Maturity Score 🎉"
- Large centered score display — reuse the same gauge/badge visual style from the reveal screen (static image or styled HTML/CSS block, since email clients don't support animation) showing "[XX]/100" and the level badge (e.g. "🦸 Manual Hero").
- Short paragraph, same tone as the app: what the score means + the personalized "Quick Win" tip in a highlighted callout box (light background, left accent border in the brand accent color).
- One clear primary button: "Book Your Free 15-min Session →" linking to a booking page.
- Footer: Holdco logo mark, one line of contact info, small unsubscribe/privacy line.
- Keep it short — this should read in under 20 seconds, same "instant gratification" feel as the app itself.

## Interaction notes
- Optimize for someone scanning a QR code and tapping through on their own phone in under 60 seconds: no scrolling within a question if avoidable, one clear action per screen, big legible type for one-thumb use.
- Include a subtle "step X of 7" indicator alongside the progress bar.
- On submitting the lead form, show a brief loading/confirmation animation ("Calculating your score...") before the reveal screen, and treat email sending as happening in the background at the same moment — the user shouldn't have to wait for it.

## Implementation note (outside Figma Make)
Figma Make can design and prototype the email template above, but actually *sending* it on form submit needs a backend trigger — e.g. the form posting to an email service (Resend, SendGrid, Mailgun) or an automation tool (Zapier/Make.com) connected to your CRM/inbox. Flag this to whoever wires up the final build so the email isn't just a static design.
