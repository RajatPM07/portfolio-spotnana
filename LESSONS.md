
## PM review takeover (2026-10-22)
- The CV is the source of truth. When the portfolio and the CV disagree, use the CV and list the decision. Old PDFs carry claims the CV does not (competitor RAG, "scope escape", 90% accuracy), do not reuse them without Rajat.
- Once a number becomes known, the "illustrative" caption can go: the Ria bar is now to scale (20 of 180 minutes).
- BSD sed on macOS needs `sed -i ''`. Edit with Python replace and assert the old string exists, so a missed match fails loudly.
- Checkout of a new branch carries uncommitted files; commit only named paths so Rajat's own edits to CLAUDE.md and generic html never get swept in.
- A test that clicks the first `[aria-selected=true]` can read the wrong tablist. Scope selectors by aria-label.
