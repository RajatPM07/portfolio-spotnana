# Overnight work ledger (started 2026-10-22, ~01:30)

Read this first, then continue from the first unchecked item. Update it as you go.

## Decisions from Rajat (final)
- Remove the chrome ribbon. Rajat does not like it. Do not restore it, the orbiting sphere, particles or floating badges.
- Two hero directions, same warm grey Selected Work and case studies below:
  - Version A, "editorial": giant headline behind a large frameless portrait cutout (`public/portrait-cutout.webp`), pointer depth on the portrait.
  - Version B, "spotlight": split layout, text left, portrait right with a cursor following spotlight and a faint depth grid.
  - Dev switch: `/?hero=a` (default), `/?hero=b`, `/?hero=previous` (old frameless hero). No switcher in the public build.
- Video: vertical 9:16, about 15s, topic is Rajat, AI product manager, open to roles. Repurpose the source video's core idea and pacing with original visuals, script and structure.
- GitHub: commit locally only on branch `hero-two-versions`. Do NOT push. Do NOT deploy.

## Hard rules
- Read `/Users/rajat/Documents/Resume/portfolio - spotnana/CLAUDE.md` before writing copy. No invented metrics. No dashes as punctuation in copy.
- Never edit `generic.html`, `generic2.html` or the repo root `index.html`.
- Hero copy is fixed: "Rajat Sharma", "Senior Product Manager, ICICI Lombard", headline "I build AI for high stakes decisions.", proof "95%" with "AI to underwriter agreement, Ria", "₹100 cr to ₹300 cr" with "Revenue in 18 months, TripSecure+", CTAs "Explore my work" (#work) and "Email me" (mailto sharma.rajat70@gmail.com).
- Both CTAs fully visible at 1280 x 720. No horizontal overflow at 1440, 1280x720, 768, 390. Respect reduced motion, disable pointer effects on touch, decorative layers aria-hidden and pointer-events none.
- Workspace: `/Users/rajat/Documents/Resume/portfolio - spotnana/portfolio-redesign` (Vite, React, TS, Tailwind, Framer Motion). Dev server: `npm run dev -- --port 5173`. Screenshot harness (Playwright core with system Chrome) is in the session scratchpad `pw/` folder; recreate with `npm i playwright-core` if missing.

## Portfolio checklist
- [x] Create branch `hero-two-versions` from the current state
- [x] Remove ChromeArc usage from the default hero (keep `HeroSectionPrevious` as the old snapshot, it has no ribbon)
- [x] Version A built and verified at 4 sizes
- [x] Version B built and verified at 4 sizes
- [x] `/?hero=a|b|previous` dev switch working, production build contains only the default
- [x] Production build passes, tsc clean
- [x] Commit locally (include trailer lines: `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>` and the Claude-Session line)
- [x] Screenshots of both versions saved to `/Users/rajat/Documents/Resume/portfolio-redesign-screens/`

## Video checklist (skill: `~/.claude/skills/guizang-product-video-skill`, read its SKILL.md; AGPL-3.0)
Source video analysis (15.06s, 1920x1080, 30fps, h264 + aac): a motion designer says what they do through kinetic type and annotated principles on a light and dark alternating canvas, with a blue dot, hand written blue and red notes, and a thin timeline strip at the bottom. Beats: slow in slow out dot, "I MAKE THINGS MOVE." with word stagger, "SNAP" on dark with red guides, linear vs ease in out graph with spacing boxes, dot field follow through, anticipation ring, end card "MOTION DESIGNER CLAUDE. open to new projects". Core idea: prove the craft by demonstrating it, then end on role plus availability. Pacing: about 8 beats in 15 seconds, one idea per beat, annotation labels naming the principle.
Do NOT copy its look (blue dot, red SNAP, black white palette, handwritten notes, same layout) or its words.
Original concept to build: "I ship AI you can trust" told through product management craft shown as motion, with each beat naming a principle and using Rajat's real, confirmed facts only (phased metric gated rollout, baseline to outcome, human review gates, 3 hours to minutes, 95% vs 92% bar, projected savings labelled projected, PII masking is a target, fairness and traceability in buildout). End card: name, role, "open to roles", contact.
- [x] Output dir `/Users/rajat/Documents/Resume/portfolio-video` created with the skill's `init_project.py`, environment check run (ffmpeg and ffprobe are at /opt/homebrew/bin, node at /opt/homebrew/bin)
- [x] `DIRECTION.md` written (three directions, chosen one, shot list per second)
- [x] First frame is a complete frame
- [x] Shots built with real portfolio components or their design tokens (warm grey and near black, cyan, Kanit)
- [x] Original music and sound effects mixed
- [x] MP4 exported, contact sheet reviewed, `check_delivery.py` run
- [x] Report honestly what was auto checked versus actually viewed or heard

## Notes
- Pushed earlier: branch `fuel-dark-redesign` at commit f4099ed (portfolio-redesign only, includes the ribbon hero). A stray `tsconfig.tsbuildinfo` was committed, remove it in the next commit and add to ignore.
- Still waiting on Rajat: one real tradeoff per case (`tradeoff` field in `src/sections/CaseStudies.tsx`), and which resume PDF is current.

## Progress log
- 01:50 Portfolio checklist complete. Commit on branch hero-two-versions. Note: production build includes both A and B (small); default A, `VITE_HERO=b` makes B the default. Skill installed at ~/.claude/skills/guizang-product-video-skill. Next: video.
- 01:45 Video rendered: /Users/rajat/Documents/Resume/portfolio-video/renders/final.mp4 (1080x1920, 16.47s, -16 LUFS). Delivery check has no errors. Audio was measured only, not listened to. Fork of awesome-opus5-5-videos exists on Rajat's account, used as inspiration only (not needed).
- 02:30 Branch remotion-reels: Remotion project at /Users/rajat/Documents/Resume/portfolio-remotion (Remotion 4.0.250). Ria reel done (720x250, 6 s seamless, 298 KB) in public/reels/ and wired into CaseDeck via components/ReelPlayer.tsx (plays only on the front card, poster for reduced motion). Cards made taller (710px) so the reel fits. NEXT: Rajat judges the Ria reel, then build TripSecure+, Elevate and Engine reels the same way (src/RiaReel.tsx is the template, register in src/Root.tsx, `npx remotion render ...`, copy mp4 and poster into portfolio-redesign/public/reels/, add `reel` to the card in CaseDeck.tsx).
- 02:40 Rajat pasted his CV, saved as resume-review/RajatSharma-CV-source.md (untracked). Rajat said the Ria Remotion reel is not good: do not build the other three in that style. Wait for his new direction or pick a clearly different concept and show a still before rendering.
- 03:10 Rajat could not understand the Ria reel and asked for 2 to 3 versions across ALL four cards to choose from in the morning. Built 12 reels in /Users/rajat/Documents/Resume/portfolio-remotion (src/reels/A.tsx big number on dark, B.tsx product moments on paper, C.tsx gate rail on paper; registered in src/Root.tsx as A-ria, A-trip, ... C-engine). Rendered to out/reels/*.mp4 plus .jpg posters and copied to portfolio-redesign/public/reels/ as a-ria.mp4, a-trip.mp4, a-elevate.mp4, a-engine.mp4, b-..., c-.... Deck switch: /?reel=a|b|c|none in dev, VITE_REEL for the production default (a). Rajat picks one in the morning, then delete the unused variants and the switch.
- 03:35 All 12 reels rendered (about 270 to 315 KB each, 3.3 MB total), copied to portfolio-redesign/public/reels/, verified in the deck for versions a, b, c on all four cards (right video plays, others pause, no overflow, no console errors). Contact sheet: /Users/rajat/Documents/Resume/portfolio-redesign-screens/reels/reel-versions-a-b-c.png. Weakest: B Ria (proposal cards overlap the AI block). Waiting for Rajat to choose a, b or c.
