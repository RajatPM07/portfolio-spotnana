# Lessons from the October 2026 redesign sessions

Short, practical, learned the hard way. Add to it, do not rewrite history.

## Process
- Screenshot every visual change in a real browser (Playwright core with system Chrome) and judge it. Several first attempts looked wrong in numbers and fine in theory, or the reverse. The ribbon hero was only killed because we looked at it.
- Decide scope in plain language before building. Rajat asks "explain simply" when a choice is abstract; a one line pro and con beats a paragraph.
- Commit small, push the safe bet before experimenting, branch per experiment. `hero-two-versions` is the safe bet.
- Never claim a check you did not run. Say "measured, not listened to" and "captured but not looked at".
- A scheduled task (CronCreate) only fires while the Claude session is open and idle. It is session only and dies with the session. Always write the plan to `OVERNIGHT.md` so a new session can resume.

## Frontend and layout
- `inert` on a card swallows clicks. For 3D side cards use a sibling overlay button instead of inert on the face (CaseDeck bug, fixed).
- CSS subgrid rows must match the number of rows in the card. Adding a chart row meant changing 7 to 8.
- A fixed label that appears on hover only is safer than an always visible one that covers content (rollout rail).
- Prefer native `<details>` for folds: free keyboard and screen reader support.
- Light "paper" tokens scoped to `.paper-section` keep the dark hero untouched.
- `mask-image` on an image needs the file served over http, not `file://`, in Chromium.
- Horizontal trackpad scroll needs a non passive wheel listener and a lock (650 ms) so one gesture moves one card.
- Loops are seamless only if every motion is a pure periodic function of t with the same period. Verify last frame to first frame difference is no bigger than a normal frame step.

## Media
- A transparent portrait needs a real cutout. OpenCV GrabCut with sure foreground ellipses (face, neck centre) and a sure background border worked; keep only the largest component and fill small holes.
- Playwright video recording needs its own ffmpeg build; if it is missing, copy the cached `ffmpeg-1011` folder to the expected `ffmpeg-1013` name or build a GIF from screenshots.
- System `ffmpeg` at `/opt/homebrew/bin` reads mp4 the browser path could not in one session; use it for frame extraction.
- Google Fonts: download woff2 with curl (Python SSL failed on this Mac) and self host for video renders.
- WebGL in headless Chrome needs `--use-angle=swiftshader --enable-unsafe-swiftshader`. Do not call `loseContext()` in React effect cleanup; StrictMode remounts and the shader then fails with a null log.
- The chrome ribbon took six iterations and was still disliked. Lesson: a physical, glossy 3D object is a high risk way to get a hook; a rule driven idea (the aperture) landed immediately.

## Content
- Elevate's market share gain and the recommendation engine are separate. Never let a card imply the engine caused the share gain.
- Ria governance wording is a hard constraint, see CLAUDE.md. Target, planned, projected and in buildout labels must survive any redesign.
- "Illustrative, not to scale" on any drawn shape that is not real data.

## Tools
- The Artifact, Vercel and design skills fire on keyword matches that are not relevant here (this is a Vite site, not Next.js). Ignore those suggestions unless the task really is that.
- Skills from third parties (guizang-product-video-skill) were read and scanned before install. Keep doing that.
