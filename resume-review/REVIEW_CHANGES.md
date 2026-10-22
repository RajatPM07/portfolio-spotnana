# PM review of CV and portfolio, 2026-10-22

Reviewer stance: Yash Doshi, hiring Staff PMs for Agentic Travel Experiences. Branch: `pm-review-2026-10-22` (from `creative-experiment`). Source of truth: `RajatSharma-CV-source.md`. Nothing deployed.

## 1. Findings, ranked
1. **Portfolio was weaker than the CV.** It led with 95% and a rupee range, left out GWP in dollars, loss ratio, 10k policies a day, partners 60 to 150, the 8,400 case gate, the 7 domain framework and the A/B test. A reviewer who reads both sees the portfolio undersell. Fixed.
2. **Unsourced or conflicting numbers.** "About 90% per insured accuracy" (undefined, not in the CV), "3 hours to minutes" (CV says 20 minutes), "1,500 crore" (CV says US$180M), "7 to 8 years" (CV is more careful: 7+ in product, about 5 in PM titles, nearly 4 in insurance), Bima Brain "Solo" and "Top 20" (CV says team build, no ranking). Fixed or removed, see section 4.
3. **Strongest evidence of judgment was missing.** The CV has real tradeoffs (risk based dynamic pricing over flat rates, accepting slower conversion; skipping high churn customers in the offer). The deck had no tradeoff rows. Added the TripSecure+ tradeoff verbatim from the CV.
4. **Evaluation baseline for the engine was hidden.** Rule based control vs ML model is the strongest sentence for Yash ("evaluation with measured improvement"). Now on the card, the chart labels and the Selected Work card.
5. **Earlier roles had no numbers on the site.** Acko, Mediaqart and SHL results are strong and confirmed. Added a compact "Before ICICI Lombard" list to About.
6. **Governance is the centerpiece but numbers were thin.** Added the 7 domain, about 35 metric framework and the 15% to 5% result (quoted from the CV). Ria phase wording unchanged: dangerous miss rate is a target, savings are projected, PII masking is a target, hallucination tracking is planned, fairness and traceability are in buildout.
7. **No Spotnana proof of booking flow.** Honest gap: no travel booking or GDS experience. Handled in the tailoring note, not by overclaiming.
8. **Resume file sprawl.** Seven PDFs in `/Users/rajat/Documents/Resume/` with different claims (examples: `RajatSharma-Resume.pdf` says ₹1,500cr and "loss ratio down 3.71%"; the Sarvam version retitles the role "AI Evaluation and Model Quality"). A reviewer could see two titles for one job. One current resume needed.
9. **Role and location signal.** The CV says "open to relocate: London, EU". Spotnana prefers Palo Alto or Bangalore. See Questions.

## 2. Changes made (branch `pm-review-2026-10-22`)
| File | What | Why |
|---|---|---|
| `portfolio-redesign/src/sections/HeroD.tsx` | Proof lines now "3 hours to 20 min, decision time on 45% of health cases, Ria" and "US$12M to US$36M, annual GWP in 18 months, TripSecure+" | Concrete, from the CV, and GWP is the correct term (the old "revenue" was loose) |
| `sections/WorkSummary.tsx` | Headlines and rows use CV numbers: 20 minutes, 95% vs 92% launch gate, US$12M to US$36M, loss ratio 3.71 points, attach 1.5% to 8% A/B tested, ARPU up 10% | Baselines paired with outcomes |
| `components/MicroCharts.tsx` | Ria bar is now 3 hours vs 20 minutes and drawn to scale (20/180). Engine bars labelled "Rule based" and "ML model". | The old bar was "illustrative" because the end value was unknown. Now both values are known. |
| `sections/CaseDeck.tsx` (Ria) | Stats, new Governance row (thresholds, human review fallback, monitoring, 7 domains, about 35 metrics), Outcome with 8,400 cases, 15% to 5% quote, latency, projected savings; gate text names the 8,400 cases. "About 90% per insured accuracy" removed. | Specific governance and evaluation |
| `CaseDeck.tsx` (TripSecure+) | US$12M to US$36M, loss ratio, 10k a day, partners 60 to 150, new Tradeoff row | CV facts; resolves the open "one real tradeoff" item for this case |
| `CaseDeck.tsx` (Elevate) | "1,500 crore" replaced by US$180M | CV is the source |
| `CaseDeck.tsx` (Engine) | A/B test row and stats. Retention 2.5% and 18% CTR kept as "Also" (they are in the confirmed facts list and the older resume, not in the CV) | Evaluation design visible |
| `CaseDeck.tsx` (layout) | Cards 700px tall, scrollable story area is keyboard focusable and labelled | Longer Ria story needed room; a11y |
| `sections/BuilderSection.tsx` | Bima Brain: team build, "Sarvam Epoch Buildathon by GrowthX, July 2026", removed "Top 20", "Solo" and the Python chip | The CV says team build and gives no ranking |
| `sections/AboutSection.tsx` | CV wording for years of experience, promotion in 2026, "Before ICICI Lombard" list | Careful and sourced |
| `resume-review/RajatSharma-Resume-improved.md` | New, ATS friendly, one page | Resume was not the deliverable but the CV needed active voice and a sharper summary |
| `resume-review/TAILORING_SPOTNANA.md` | Role to evidence map, risks, draft opening message | |

## 3. Suggestions NOT implemented, and why
- **Resume PDFs**: not touched, never overwritten. Export the improved markdown to PDF yourself, or ask me.
- **"Promoted, top performance rating" in the hero**: it is self reported; kept in the resume and About only.
- **Open to relocate London or EU**: left out of the improved resume and the portfolio. Decide first, see Questions.
- **Competitor intelligence RAG project** (30+ minutes to under 60 seconds) and **"testing caught a pre production scope escape"**: appear only in an older PDF, not in the CV. Not used.
- **Spotnana specific page copy**: the portfolio stays role agnostic. The tailoring note carries the role mapping.
- **A tradeoff for Ria, Elevate, engine**: only TripSecure+ and the engine ("skipping high churn customers" is a targeting rule, not a tradeoff) have CV evidence. Need Rajat.
- **Reels, hero and portrait**: untouched. Reel versions live on `remotion-reels`.

## 4. Discrepancies and how resolved
| Item | Portfolio before | CV | Decision |
|---|---|---|---|
| Ria decision time | 3 hours to minutes | 3 hours to 20 minutes on 45% of health cases | CV |
| Accuracy | about 90% per insured accuracy | not present | Removed (undefined metric, no source in the CV). Question 3. |
| Health portfolio | 1,500 crore | US$180M | CV |
| TripSecure+ scale | ₹100 cr to ₹300 cr revenue | US$12M to US$36M annual GWP | CV, and "GWP" not "revenue" (resolves the open wording item from CLAUDE.md: growth, not a range) |
| Experience | about 7 to 8 years | 7+ in product, about 5 PM titled, nearly 4 in insurance | CV |
| Bima Brain | Solo, Top 20 | Team build, Sarvam Epoch Buildathon by GrowthX, July 2026 | CV. The Sarvam resume PDF also names a teammate. |
| Loss ratio unit | PDF: "down 3.71%" | "3.71 percentage points" | CV (points, not percent) |
| Launch gate | 95% vs 92% | 95% on 8,400 cases against a 92% threshold set by underwriting | CV, added case count and who set the bar |
| Engine baseline | "1.5% to 8%" | 1.5% control (rule based) vs 8% (model), A/B test | CV, now explicit |

## 5. Questions for Rajat
1. Which resume PDF is current, and should the title be "Senior Product Manager, Travel and Health Insurance" everywhere? One of the PDFs retitles it "AI Evaluation and Model Quality".
2. Relocation: keep "open to relocate London, EU" in the application, or drop it for Spotnana (Palo Alto or Bangalore preference)? Do you want to say you would work from Bangalore or relocate to Palo Alto? I did not write anything.
3. "About 90% per insured accuracy": what is it measured on? If you can define it in one line, I will add it back.
4. Bima Brain: was there a placement (Top 20)? Teammate's name for credit?
5. Ria launch gate and phases: is the 8,400 case, one week gate the same as the gate before phase 2 (risk tiered review)? I assumed yes in the card.
6. Retention up 2.5% and 18% CTR for the engine: still true? They are in CLAUDE.md and an older PDF but not in the CV.
7. One real tradeoff each for Ria, Elevate and the engine (what did you give up, and why)?
8. Ria: what happened at the 8,400 case gate for the dangerous miss rate (still a target, or measured)? I kept it as a target.
9. Is "projected 20 to 30 crore annual savings" still current? Kept as projected, in rupees, no dollar conversion.
10. Any travel, booking or payments exposure (partner APIs, payment gateways, GDS or travel suppliers)? It would address Spotnana's biggest gap directly.

## 6. Verification
- Typecheck and production build pass.
- Playwright core with system Chrome at 1440, 1280x720, 768 and 390: no horizontal overflow, no console errors, both hero CTAs inside the viewport at all four sizes (checked by bounding box).
- Side card click: confirmed at 1440 and 1280x720 (Ria then TripSecure+). At 768 and 390 the side cards are not reachable by click in the test; arrows and tabs work. This was not changed in this branch.
- Looked at screenshots: hero 1280, Ria and TripSecure+ and engine back faces at 1440, Selected Work 1440, About 1440, Ria back at 390, deck front 1440. Not looked at: other sizes' screenshots (saved in `/Users/rajat/Documents/Resume/portfolio-redesign-screens/pm-review/`).
- Not run: contrast checks on the new About list; long Ria back face scrolls inside the card (focusable region added).
