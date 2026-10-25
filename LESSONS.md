
## PM review takeover (2026-10-22)
- The CV is the source of truth. When the portfolio and the CV disagree, use the CV and list the decision. Old PDFs carry claims the CV does not (competitor RAG, "scope escape", 90% accuracy), do not reuse them without Rajat.
- Once a number becomes known, the "illustrative" caption can go: the Ria bar is now to scale (20 of 180 minutes).
- BSD sed on macOS needs `sed -i ''`. Edit with Python replace and assert the old string exists, so a missed match fails loudly.
- Checkout of a new branch carries uncommitted files; commit only named paths so Rajat's own edits to CLAUDE.md and generic html never get swept in.
- A test that clicks the first `[aria-selected=true]` can read the wrong tablist. Scope selectors by aria-label.
- After switching branches several times, Vite dev served raw `@tailwind` directives (unstyled page). Restart the dev server before judging screenshots. A screenshot that is black with left aligned text means CSS did not load.
- When a reel repeats a card stat, drop the stat from the card, or the card gets too tall on phones.
- AUC ROC is not accuracy. Label it as model evaluation.
- On phones, a flipped card with internal scroll and a tab hides the best evidence. Open stories in a full width reading panel instead, and put the diagram right after the story.
- A video that plays only when its card is active still needs an IntersectionObserver, or it keeps playing after the reader scrolls away.
