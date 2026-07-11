# Spotnana Portfolio, Rajat Sharma

## What this is

A single page portfolio site (`index.html`) for Rajat Sharma's application to Spotnana for the Staff Product Manager, Agentic Travel Experiences role. The hiring manager is Yash Doshi, Director of Product Management, Data and AI Initiatives at Spotnana. Yash asked on LinkedIn for a portfolio as the primary application artifact, resume optional and secondary. The role requires owning the booking flow end to end, search to payment, and having shipped ML or AI products.

## Files

- `index.html`, the Spotnana targeted portfolio, self contained single page site. This is the application artifact.
- `generic.html`, a role agnostic variant for other job applications. Same structure and facts, Spotnana references replaced with transferable pattern framing. Redesigned July 2026 in a cinematic dark style inspired by thibaut.cool: near black canvas, Instrument Serif display, IBM Plex Mono labels, teal and amber glows, scroll triggered reveals, count up stat numbers (spans with data-count and data-dec), an animated gate rail, a fixed corner nav with scrollspy, pointer tilt on project cards, and one CSS drawn schematic mockup per case study (each captioned "Illustrative, not actual product UI", keep that caption). All motion is vanilla JS inline and fully disabled under prefers-reduced-motion. Content edits should usually land in both files, but the two files intentionally do not share a visual identity.
- `portfolio-3d/`, a Vite + React port of the dark generic portfolio using the Motion library (formerly framer-motion, imported from `motion/react`) for showy 3D effects: pointer reactive hero with layered translateZ depth, mockups resting at a product shot angle that spring flat on hover with pointer tilt and scroll parallax, 3D flip in stats with imperative count up (`animate()` mutating textContent via refs, no re renders), a gate rail whose line draws with scroll progress (`useScroll` + `useSpring`), glare and tilt project cards, and a scroll progress line in the corner nav. `MotionConfig reducedMotion="user"` plus explicit `useReducedMotion` guards handle accessibility. Same frozen copy as generic.html. Commands from inside the folder: `npm run dev`, `npm run build`, `npm run lint`, deploy with `vercel`. Content edits now need to land in three places: index.html, generic.html, and portfolio-3d/src/components/.
- `elevate-suggested-metrics.md`, suggested and unverified metrics for the Elevate case study. Nothing in this file may enter the portfolio until Rajat confirms it as true. Confirmed items move into the copy, rejected items get deleted from the file.
- `Screenshot 2026-07-11 at 10.31.45.png`, page 2 of Yash Doshi's LinkedIn hiring carousel, the Agentic Travel Experiences role card.

## Signature visual device

Two diagrams, built as semantic HTML and CSS, shared by both files:
- The gate rail in Ria section 1.3: phase cards connected by a vertical rail, with dashed gate boxes between them showing which trust metrics cleared (teal, gate 1) and which are pending (amber, gate 2). This is the portfolio's centerpiece, it encodes the metric gated rollout honestly.
- The pipeline flow in section 3.2: inputs, model, decision, surface, with arrows, for the recommendation engine.
Do not add decorative flowcharts elsewhere. TripSecure+ stays prose.

## Structure, fixed, do not reorder

1. Intro: name, one line framing Rajat as a Senior PM building AI native products with an InsurTech background, one line on why this role fits (owning an AI travel product end to end maps to what he has already done).
2. Case study 1, Ria, three sections: problem/why/who/validation, metrics and solution, governance and safety.
3. Case study 2, TripSecure+, two sections: problem/why/who/validation, metrics and solution.
4. Case study 3, Elevate and the recommendation engine, two sections, same template as TripSecure+.
5. Builder section: Lenny Live and personal-finance-agent.
6. Close: contact info, resume as optional secondary.

## Hard content rules

- Never invent facts or metrics. Every number in the copy must come from the confirmed fact list below or from Rajat directly.
- Suggested but unverified metrics live only in `elevate-suggested-metrics.md`, clearly marked, never folded into main copy.
- Ria governance, do not overclaim. The honest story is a phased, metric gated rollout, not full automation with a hidden safety net:
  - Phase 1 was 100 percent human review, complete.
  - Phase 2, live now, is risk tiered review. It was gated on LLM to underwriter agreement (reached 95 percent against a 92 percent bar) and dangerous miss rate (AI more lenient than a human), targeted at near zero.
  - Phase 3, in buildout and not live: fairness disparity thresholds across groups, and verdict to transcript traceability.
  - PII masking is a target being built toward, not shipped. Do not claim it live at scale.
  - Structured hallucination tracking is planned, not a live dashboard. Do not claim it live.
  - Optional broader frame: a 7 domain governance framework (decision integrity, data protection and privacy, consent integrity, human oversight and accountability, security and abuse resistance, duty of care and interaction safety, third party or vendor risk).
- TripSecure+: name the broken claims experience but never quantify it, there is no verified claims number.
- Elevate and the recommendation engine: keep framing modest and metric led where the underlying why is not given, do not invent a backstory.

## Confirmed facts

### Rajat's profile
Senior PM at ICICI Lombard General Insurance, Mumbai, January 2024 to present. About 7 to 8 years across InsurTech, AdTech, AI/ML. Prior: Acko Bengaluru (PM, Claims Experience, June 2022 to May 2023), Mediaqart Mumbai (AdTech PM, March 2021 to May 2022), SHL Gurgaon (Product Analyst, November 2018 to March 2021). B.Tech EEE, SRM University, 2014 to 2018.

### Ria
About 45 percent of monthly health insurance proposals were non standard, needing manual underwriting review at about 3 hours per case. CXO level priority, 8 teams, 5 integrated platforms. Sole IC PM, definition to pilot in 2 months. Results: 3 hours to minutes per case, inference latency 3s to 1s, 95 percent AI to underwriter agreement, about 90 percent per insured accuracy, projected 20 to 30 crore rupees annual savings at full rollout.

### TripSecure+
Old product about 10 years old: broken rigid coverage, fixed outdated pricing, limited distribution, low awareness, no broker or partner availability, broken claims experience. Built from scratch to replace it. Why now: post pandemic travel rebound, plus competitive research showing how structurally behind the old product was. Who: direct retail and broker or partner channels together from the start. Validation: 100 plus generative customer interviews. Results: 100 plus destinations, revenue 100 to 300 crore in 18 months, profitable in 6 months, dynamic pricing engine grew broker channel to 23 percent of portfolio, international partner launch in Dubai, directed a 10 person cross functional team from discovery through launch. Draw the parallel to Spotnana's search to payment end to end ownership.

### Elevate
FY24-25 strategy grew market share 2.3 to 3.1 percent, a 35 percent relative gain, on a 1,500 crore health portfolio. Authored PRDs defining coverage architecture and pricing across segments. Assessed competitive landscape for positioning gaps. Mentored one Associate PM to independent ownership.

### Recommendation engine
Production ML engine, 0.82 AUC-ROC, 10 plus customer signals (tenure, claim history, engagement, policy type), predicts churn risk and cross sell propensity simultaneously, next best action at portfolio scale. Partnered with applied science on feature engineering, evaluation metrics, production guardrails. Retention up 2.5 percent, cross sell acceptance 1.5 to 8 percent (5.3x). Propensity scores feed a 1 click, ML cohort targeted cross sell surface in checkout, zero cannibalization of the core purchase journey, 18 percent CTR, 10 percent ARPU lift.

### Builder projects
- Lenny Live: Chrome extension, ambient AI mentor over a curated corpus of Lenny Rachitsky newsletter and podcast transcripts. Stack: Chrome extension, RAG via Supabase pgvector, ElevenLabs voice synthesis, agentic orchestration. First place, Lenny's Data Competition 2026. Live link plus GitHub.
- personal-finance-agent: solo Python build, Gmail integration parsing financial data into Supabase, surfaced via Telegram bot. Single user production deployment, runs continuously. GitHub link.

### Contact
Mumbai, India. +91 7358 467199. sharma.rajat70@gmail.com. GitHub github.com/RajatPM07. LinkedIn: linkedin.com/in/rajat-sharma-70.

## Tone rules

- Natural, humanised tone throughout.
- No dashes as punctuation anywhere in output, no em dashes, no en dashes. Use commas or separate sentences.

## Positioning insight

The Substack post p-195693506 is Yash Doshi's own newsletter piece, "I reviewed 500 resumes this month" (yashvdoshi.substack.com). What he explicitly values: architectural specificity (name the pattern), safety and governance named concretely (PII masking, prompt injection mitigations, human in the loop review gates, hallucination tracking, red teaming; he calls their absence "a major red flag for enterprise employers in 2026"), evaluation with measured improvement, metrics paired with baselines, adoption evidence not just shipping, cross functional proof, and technical wins translated to revenue. He dislikes vague AI claims, passive language, buzzword soup, unquantified impact. The Ria governance section (1.3) is the portfolio's centerpiece for this. Strengthen only with true claims.

His hiring post (LinkedIn activity 7481276051034361857, July 2026): hiring 3 Staff PMs for AI x travel, global, slight preference for Palo Alto or Bangalore. Application asks 3 questions: which role, portfolio link, resume optional if portfolio shared. He personally reviews every application. Apply link: bit.ly/StaffPMJobs.

The Agentic Travel Experiences role card (see screenshot in this folder): "Build the AI travel agent millions will book with." Pillars: 01 conversational booking, own it end to end, search to payment. 02 recommendations and personalization, drive the engine that decides what travelers see first. Must have: you have shipped ML or AI products. Rajat's three case studies map one to one: Ria proves shipped AI with governance, TripSecure+ proves end to end purchase flow ownership, the recommendation engine proves the personalization pillar. The Elevate callout in index.html references the personalization pillar explicitly.

His Spotnana team philosophy (spotnana.com blog spotlight): start from genuine customer problems, design for scale and correctness especially with AI, move fast without compromising trust or data integrity.

## How to work

- Claude leads all UI and UX decisions.
- Sub agents may be used for research and content drafting, Claude judges everything that ships.
- Keep the structure above intact, iterate in place on `index.html`.
