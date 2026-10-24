# Creative brief: "The Gate"

Branch: `creative-experiment` (from `hero-two-versions`, which is pushed and is the safe bet). Rajat approved big creative freedom: change anything in `portfolio-redesign/`. Still never touch `generic.html`, `generic2.html`, root `index.html`, and never deploy to production.

Inspiration used: Rajat's fork of the open source list (https://github.com/RajatPM07/awesome-opus5-5-videos), cloned to the session scratchpad `inspo/repo`. Techniques borrowed, nothing copied: a concept stated in one line; a physical rule that governs every element; a locked camera; a banned list; "everything made of the previous thing"; one beat structure; first frame equals last frame so it loops.

## One line concept
Chaos goes in, order comes out, and the gate is where trust is earned. Rajat's work is phased, metric gated AI, so the portfolio is itself a rollout that passes through gates.

## The physical rule (applies everywhere)
Anything that crosses a gate changes state: noisy to aligned, pending (amber, dashed) to cleared (teal, solid), baseline to outcome. Nothing changes state without crossing a gate. No effect exists that is not explained by this rule.

## Signature device 1, hero: the aperture
- A vertical aperture (gate) of light sits behind the portrait. Small marks flow left to right across the whole hero. Left of the gate they jitter and wander (noise). They pass through the gate and exit as clean, evenly spaced, aligned lanes (order).
- Pointer moves the gate slowly (it never snaps); marks near the pointer slow down. Reduced motion: still frame with both states visible. Touch: no pointer effect.
- Portrait (current stand in, to be swapped for the fixed one) sits in front of the gate. Headline, proof and buttons stay real HTML text and never overlap the portrait.
- No glow blobs, no lens flare, no RGB split, no bounce, no camera shake.

## Signature device 2: the rollout rail
- A slim fixed rail (right edge on desktop, top bar on phones) shows the page as phases. Nodes: Hook, Evidence, Cases, Builder, Contact. Active node fills; a gate tag between phases flips from Pending to Cleared as you scroll past it, using the real Tag styles (teal cleared, rust pending). Labels are text, never colour only.

## Signature device 3: baseline to outcome micro visuals (Selected Work)
- Each summary card gets a tiny honest chart that plays when it enters view and then rests: Ria, a 3 hour bar that collapses to a sliver (labelled "not to scale"); TripSecure+, a line crossing zero at month 6 (labelled illustrative); Recommendation engine, two bars 1.5% to 8%.
- Numbers count up and stop hard. Everything is readable at rest and without hover.

## Signature device 4: the film
- Embed the 16 second film (`/Users/rajat/Documents/Resume/portfolio-video/renders/final.mp4`, 1080x1920) as a click to play card with sound on click only, poster frame first. Copy into `public/`.

## Honesty rules (non negotiable)
- Only facts in `/Users/rajat/Documents/Resume/portfolio - spotnana/CLAUDE.md`. Dangerous miss rate is a target. Savings are projected. PII masking is a target, hallucination tracking is planned, fairness and traceability are in buildout. Elevate's market share is not credited to the engine.
- Anything simulated or schematic carries the caption "Illustrative, not actual product UI" or "not to scale".
- No dashes as punctuation in copy.

## Banned
Particle bursts, lens flares, RGB split, camera shake, bouncy easing, crossfades as the only transition, generic gradient blobs, template looking sections, text on busy backgrounds, anything that hides content until hover.

## Quality bar (a lead designer would check)
1. One clear focal point per screen. 2. Headline readable in under a second at 1280 x 720 and 390 wide. 3. Both CTAs visible on first screen at 1280 x 720. 4. 60 fps feel: canvas work capped, paused offscreen and on hidden tab, resolution capped. 5. Reduced motion and touch produce a complete composition. 6. No horizontal overflow at 1440, 1280x720, 768, 390. 7. Keyboard focus visible on dark and paper. 8. Screenshot every change and judge it; delete what does not earn its place.

## Process
Work in small committed steps on `creative-experiment`. Screenshots to `/Users/rajat/Documents/Resume/portfolio-redesign-screens/creative/`. Keep the old heroes reachable in dev (`?hero=a|b|c|previous`). Log progress in `OVERNIGHT.md`.
