import { useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, RotateCw } from 'lucide-react'
import { Gate, Phase, Tag } from '../components/GateRail'
import { RiaChart, TripChart, EngineChart, ShareChart } from '../components/MicroCharts'
import { useMatchMedia } from '../components/usePointerDepth'

type Card = {
  id: string
  n: string
  category: string
  name: string
  status: string
  scope: string[]
  stats: { big: string; label: string }[]
  chart: ReactNode
  rows: [string, string][]
  visual?: { label: string; node: ReactNode }
  note?: string
}

const riaGates = (
  <div>
    <Phase tag="Complete" tone="live" title="Phase 1, 100% human review" text="Every verdict checked by an underwriter." />
    <Gate title="Gate before phase 2" items={[
      { text: 'LLM to underwriter agreement: 95% on 8,400 cases against a 92% bar set by underwriting.', tone: 'live', tag: 'Cleared' },
      { text: 'Dangerous miss rate, where AI is more lenient than a human: targeted at near zero.', tone: 'target', tag: 'Target' },
    ]} />
    <Phase tag="Live now" tone="live" title="Phase 2, risk tiered review" text="Review is tiered by risk." />
    <Gate title="Gate before phase 3" items={[
      { text: 'Fairness disparity thresholds across groups.', tone: 'pending', tag: 'In buildout' },
      { text: 'Verdict to transcript traceability.', tone: 'pending', tag: 'In buildout' },
    ]} />
    <Phase tag="In buildout, not live" tone="pending" title="Phase 3" text="Not live. Its gates are still being built." />
    <div className="mt-4 rounded-xl border border-ink/15 bg-raised p-4">
      <div className="font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">Not yet in place</div>
      <ul className="mt-2 flex flex-col gap-2 text-[16px] text-ink">
        <li className="flex flex-wrap items-center gap-2"><Tag tone="target">Target</Tag> PII masking, being built toward.</li>
        <li className="flex flex-wrap items-center gap-2"><Tag tone="pending">Planned</Tag> Structured hallucination tracking.</li>
      </ul>
    </div>
  </div>
)

const step = (n: string, k: string, t: string, d: string) => (
  <div key={k} className="rounded-xl border border-ink/15 bg-raised p-4">
    <div className="font-mono text-xs uppercase tracking-[0.12em] text-teal">{n} {k}</div>
    <div className="mt-1 text-lg font-semibold text-ink">{t}</div>
    <p className="text-[16px] leading-snug text-ink">{d}</p>
  </div>
)
const down = (k: string) => <div key={k} aria-hidden className="py-0.5 text-center font-mono text-ink-soft">↓</div>
const enginePipeline = (
  <div>
    {step('1', 'Inputs', '10+ customer signals', 'Tenure, claim history, engagement, policy type.')}{down('a')}
    {step('2', 'Model', '0.82 AUC ROC', 'Predicts churn risk and cross sell propensity simultaneously.')}{down('b')}
    {step('3', 'Decision', 'Next best action', 'At portfolio scale.')}{down('c')}
    {step('4', 'Surface', 'One click offer in checkout', 'Cohort targeted by ML, with zero cannibalization of the core purchase journey.')}
  </div>
)

const cards: Card[] = [
  {
    id: 'ria', n: '01', category: 'Health insurance, AI underwriting', name: 'Ria', status: 'Phase 2 live',
    scope: ['Sole IC PM', '8 teams', '5 platforms', 'Pilot in 2 months'],
    stats: [{ big: '3 hours to 20 minutes', label: 'decision time on 45% of health cases' }, { big: '95% agreement', label: 'on 8,400 cases, vs a 92% bar set by underwriting' }, { big: '20 to 30 crore rupees', label: 'estimated cost saving from the AI agent' }],
    chart: <RiaChart />,
    rows: [
      ['Problem', 'About 45% of monthly health insurance proposals were non standard and needed manual underwriting review, about 3 hours per case.'],
      ['My ownership', 'Sole individual contributor PM, from definition to pilot in 2 months, across 8 teams and 5 integrated platforms, at CXO level priority.'],
      ['Pivotal decision', 'Roll out in phases behind metric gates, not all at once. Start with 100% human review, then move to risk tiered review once LLM to underwriter agreement cleared its bar, with the dangerous miss rate targeted at near zero.'],
      ['Governance', 'Defined the decision thresholds, a human review fallback (low confidence cases routed to underwriters) and monitoring. Authored the responsible AI framework adopted as the engine team\'s standard: 7 domains, about 35 metrics.'],
      ['Outcome', 'Decision time went from 3 hours to 20 minutes on 45% of health cases. Launch gated at 95% agreement with underwriter decisions on 8,400 cases (one week of cases), against a 92% acceptance threshold set by underwriting. Approvals of high risk or under loaded cases fell from 15% under manual review to 5%. Inference latency went from 3s to 1s. Estimated cost saving from the AI agent: about 20 to 30 crore rupees.'],
    ],
    visual: { label: 'Rollout gates', node: riaGates },
  },
  {
    id: 'tripsecure', n: '02', category: 'Travel insurance, 0 to 1', name: 'TripSecure+', status: 'Shipped',
    scope: ['Strategy, roadmap, delivery', '10 person team', '10k policies a day'],
    stats: [{ big: 'US$12M to US$36M', label: 'annual GWP in 18 months, profitable in 6' }, { big: 'Loss ratio down 3.71 points', label: 'while the book tripled' }],
    chart: <TripChart />,
    rows: [
      ['Problem', 'The old product was about 10 years old: rigid coverage, fixed outdated pricing, limited distribution, low awareness, no broker or partner availability, and a broken claims experience.'],
      ['My ownership', 'Owned strategy, roadmap and delivery. Led a 10 person cross functional team from discovery through launch, backed by 100+ traveller interviews.'],
      ['Pivotal decision', 'Build a new product from scratch, with direct retail and broker or partner channels together from the start. The post pandemic travel rebound and competitive research showed how far behind the old product was.'],
      ['Tradeoff', 'Chose risk based dynamic pricing over flat rates, accepting slower conversion.'],
      ['Outcome', 'Annual GWP from US$12M to US$36M in 18 months, profitable in 6. Loss ratio cut 3.71 percentage points while the book tripled. 10k policies a day, 100k on peak days, 100+ destinations. Distribution partners grew from 60 to 150, the broker channel reached 23% of the portfolio, and an international partner launch went live in Dubai.'],
    ],
    note: 'The same shape as owning a booking flow end to end: discovery, pricing, distribution and the partner launch, as one product.',
  },
  {
    id: 'elevate', n: '03', category: 'Health portfolio strategy', name: 'Elevate', status: 'FY24 to 25',
    scope: ['PRDs for coverage and pricing', 'Mentored one APM'],
    stats: [{ big: 'Share now 5.1%', label: 'up from 2.3% to 3.1% in FY24 to 25, a 35% relative gain' }, { big: 'US$180M', label: 'health portfolio the strategy covered' }],
    chart: <ShareChart />,
    rows: [
      ['My ownership', 'Authored PRDs defining coverage architecture and pricing across segments, assessed the competitive landscape for positioning gaps, and mentored one Associate PM to independent ownership.'],
      ['Outcome', 'The FY24 to 25 strategy grew market share from 2.3% to 3.1%, a 35% relative gain, on a US$180M health portfolio. Market share has since risen to 5.1%.'],
    ],
    note: 'This share gain belongs to the strategy as a whole. The recommendation engine is separate work, and is not credited with the full increase.',
  },
  {
    id: 'engine', n: '04', category: 'Personalization', name: 'Recommendation engine', status: 'In production',
    scope: ['Applied science partnership', '0.82 AUC ROC'],
    stats: [{ big: 'Attach 1.5% to 8%', label: 'A/B test, rule based control vs ML model' }, { big: 'ARPU up 10%', label: 'without reducing core renewal conversion' }],
    chart: <EngineChart />,
    rows: [
      ['My ownership', 'Partnered with applied science on feature engineering, evaluation metrics and production guardrails.'],
      ['Solution', 'A production ML engine using 10 plus customer signals. It predicts churn risk and cross sell propensity simultaneously, and the scores feed a one click, ML cohort targeted cross sell surface in checkout.'],
      ['Test', 'A/B tested the ML propensity offer (0.82 AUC ROC) against rule based targeting in the health checkout, skipping high churn customers.'],
      ['Outcome', 'Attach 1.5% (control) against 8% (model), 5.3x. ARPU up 10% without reducing core renewal conversion. Also: retention up 2.5% and 18% CTR, with zero cannibalization of the core purchase journey.'],
    ],
    visual: { label: 'Pipeline', node: enginePipeline },
  },
]

export default function CaseDeck() {
  const [active, setActive] = useState(0)
  const [flipped, setFlipped] = useState<string | null>(null)
  const [tab, setTab] = useState<Record<string, 'story' | 'visual'>>({})
  const stageRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [stageW, setStageW] = useState(1200)
  const reduced = useMatchMedia('(prefers-reduced-motion: reduce)')
  const n = cards.length
  const activeRef = useRef(0)
  activeRef.current = active

  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const ro = new ResizeObserver(() => setStageW(el.getBoundingClientRect().width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const go = useCallback((i: number) => {
    setActive(((i % n) + n) % n)
    setFlipped(null)
  }, [n])

  // Links like #ria, #tripsecure, #elevate, #engine open that card and bring the deck into view.
  useEffect(() => {
    const open = () => {
      const i = cards.findIndex((c) => `#${c.id}` === window.location.hash)
      if (i >= 0) {
        go(i)
        sectionRef.current?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
      }
    }
    open()
    window.addEventListener('hashchange', open)
    return () => window.removeEventListener('hashchange', open)
  }, [go, reduced])

  // Trackpad and mouse side scroll: a clear horizontal gesture moves one card, then waits.
  const wheelLock = useRef(0)
  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) < 24 || Math.abs(e.deltaX) < Math.abs(e.deltaY)) return
      e.preventDefault()
      const now = performance.now()
      if (now - wheelLock.current < 650) return
      wheelLock.current = now
      go(activeRef.current + (e.deltaX > 0 ? 1 : -1))
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [go])

  const cardW = Math.min(560, stageW * 0.86)
  const gap = Math.min(cardW * 0.78, stageW * 0.34)

  // swipe
  const startX = useRef<number | null>(null)
  const onPointerDown = (e: React.PointerEvent) => { startX.current = (e.target as HTMLElement).closest('button, [role=tab]') ? null : e.clientX }
  const onPointerUp = (e: React.PointerEvent) => {
    if (startX.current === null) return
    const dx = e.clientX - startX.current
    startX.current = null
    if (Math.abs(dx) > 60) go(active + (dx < 0 ? 1 : -1))
  }

  return (
    <section id="cases" ref={sectionRef} className="paper-section grain relative scroll-mt-0 overflow-hidden bg-paper px-5 pb-20 pt-4 sm:px-8 md:px-10 md:pb-28">
      {cards.map((c) => <span key={c.id} id={c.id} aria-hidden className="absolute left-0 top-0 h-px w-px" />)}
      <div className="relative z-10 mx-auto max-w-[1280px]">
        <div className="border-t border-ink/20 pt-14 md:pt-20">
          <h2 className="font-semibold leading-none text-ink" style={{ fontSize: 'clamp(2.4rem, 5.4vw, 4.4rem)' }}>Case studies</h2>
          <p className="mt-4 max-w-xl text-lg text-ink-soft">Four cards. Pick one, then flip it for the story.</p>
        </div>

        <div
          ref={stageRef}
          role="group"
          aria-roledescription="carousel"
          aria-label="Case study cards"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') { e.preventDefault(); go(active + 1) }
            if (e.key === 'ArrowLeft') { e.preventDefault(); go(active - 1) }
          }}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          className="relative mx-auto mt-10 h-[780px] select-none outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal md:mt-14 md:h-[820px]"
          style={{ perspective: 1700, touchAction: 'pan-y' }}
        >
          {/* A soft floor under the deck. */}
          <div aria-hidden className="pointer-events-none absolute inset-x-[8%] bottom-6 h-16 rounded-[50%]" style={{ background: 'radial-gradient(ellipse at center, rgba(32,36,34,0.20), transparent 70%)', filter: 'blur(6px)' }} />

          {cards.map((c, i) => {
            let o = i - active
            if (o > n / 2) o -= n
            if (o < -n / 2) o += n
            const abs = Math.abs(o)
            const isActive = o === 0
            const isFlipped = flipped === c.id && isActive
            const t = tab[c.id] ?? 'story'
            return (
              <motion.div
                key={c.id}
                className="absolute left-1/2 top-0"
                style={{ width: cardW, height: 'min(700px, 92%)', marginLeft: -cardW / 2, transformStyle: 'preserve-3d', zIndex: 10 - abs * 2, pointerEvents: abs > 1 ? 'none' : 'auto' }}
                initial={false}
                animate={{ x: o * gap, rotateY: -o * 36, scale: 1 - 0.12 * abs, z: -abs * 140, opacity: abs > 1 ? 0 : 1 - abs * 0.35 }}
                transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 140, damping: 22, mass: 0.9 }}
              >
                <motion.div
                  className="relative h-full w-full"
                  style={{ transformStyle: 'preserve-3d' }}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 120, damping: 20, mass: 0.9 }}
                >
                  {/* Front */}
                  <div
                    className="absolute inset-0 flex flex-col overflow-hidden rounded-3xl border border-ink/15 bg-raised p-6 shadow-card-lift md:p-8"
                    style={{ backfaceVisibility: 'hidden' }}
                    aria-hidden={!isActive || isFlipped}
                    {...(!isActive || isFlipped ? { inert: '' as unknown as boolean } : {})}
                  >
                    <div className="font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">Case {c.n} <span aria-hidden>/</span> {c.category}</div>
                    <h3 className="mt-3 text-[2rem] font-semibold leading-tight text-ink md:text-[2.4rem]">{c.name}</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Tag tone="live">{c.status}</Tag>
                      {c.scope.map((s) => <span key={s} className="rounded-full border border-ink/25 bg-paper px-3 py-1 text-sm font-medium text-ink">{s}</span>)}
                    </div>
                    <div className="mt-5 grid gap-3">
                      {c.stats.map((s) => (
                        <div key={s.big} className="rounded-xl border border-ink/15 bg-paper/70 px-4 py-3">
                          <div className="text-[1.5rem] font-semibold leading-tight text-teal">{s.big}</div>
                          <div className="text-base text-ink-soft">{s.label}</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5">{c.chart}</div>
                    <button
                      type="button"
                      onClick={() => setFlipped(c.id)}
                      tabIndex={isActive ? 0 : -1}
                      className="mt-auto inline-flex items-center justify-center gap-2 rounded-full border-2 border-teal px-5 py-3 text-base font-semibold text-teal transition-colors hover:bg-teal/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
                    >
                      <RotateCw size={18} aria-hidden /> Flip for the story
                    </button>
                  </div>

                  {/* Side cards: one big button over the whole card brings it forward. It sits outside the inert faces. */}
                  {!isActive && abs <= 1 && (
                    <button
                      type="button"
                      aria-label={`Show case ${c.n}: ${c.name}`}
                      onClick={() => go(i)}
                      className="absolute inset-0 z-20 cursor-pointer rounded-3xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"
                      style={{ transform: 'translateZ(2px)' }}
                    />
                  )}

                  {/* Back */}
                  <div
                    className="absolute inset-0 flex flex-col overflow-hidden rounded-3xl border border-ink/15 bg-raised p-6 shadow-card-lift md:p-8"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                    aria-hidden={!isFlipped}
                    {...(!isFlipped ? { inert: '' as unknown as boolean } : {})}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">Case {c.n}</div>
                        <h3 className="text-2xl font-semibold leading-tight text-ink">{c.name}</h3>
                      </div>
                      <button type="button" onClick={() => setFlipped(null)} className="inline-flex flex-none items-center gap-2 rounded-full border-2 border-teal px-4 py-2 text-sm font-semibold text-teal transition-colors hover:bg-teal/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal">
                        <RotateCw size={16} aria-hidden /> Back
                      </button>
                    </div>
                    {c.visual && (
                      <div role="tablist" aria-label="Card view" className="mt-4 inline-flex w-fit rounded-full border border-ink/20 bg-paper p-1 text-sm font-semibold">
                        {(['story', 'visual'] as const).map((k) => (
                          <button key={k} role="tab" aria-selected={t === k} type="button" onClick={() => setTab((s) => ({ ...s, [c.id]: k }))}
                            className={`rounded-full px-4 py-1.5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal ${t === k ? 'bg-teal text-raised' : 'text-ink'}`}>
                            {k === 'story' ? 'Story' : c.visual!.label}
                          </button>
                        ))}
                      </div>
                    )}
                    <div tabIndex={isFlipped ? 0 : -1} role="region" aria-label={`${c.name} story, scrollable`} className="mt-4 min-h-0 flex-1 overflow-y-auto pr-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal">
                      {t === 'visual' && c.visual ? c.visual.node : (
                        <dl>
                          {c.rows.map(([label, text]) => (
                            <div key={label} className="border-t border-ink/15 py-3 first:border-t-0 first:pt-0">
                              <dt className="font-mono text-xs uppercase tracking-[0.12em] text-teal">{label}</dt>
                              <dd className="mt-1 text-[16px] leading-relaxed text-ink">{text}</dd>
                            </div>
                          ))}
                          {c.note && <p className="mt-2 border-l-2 border-teal pl-3 text-[16px] leading-relaxed text-ink-soft">{c.note}</p>}
                        </dl>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
          <button type="button" aria-label="Previous case" onClick={() => go(active - 1)} className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink/40 text-ink transition-colors hover:bg-ink/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal"><ChevronLeft size={20} /></button>
          <div className="order-last flex w-full flex-wrap items-center justify-center gap-2 sm:order-none sm:w-auto" role="tablist" aria-label="Cases">
            {cards.map((c, i) => (
              <button key={c.id} role="tab" aria-selected={i === active} type="button" onClick={() => go(i)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal ${i === active ? 'bg-teal text-raised' : 'border border-ink/30 text-ink hover:bg-ink/5'}`}>
                {c.name === 'Recommendation engine' ? 'Engine' : c.name.split(' ')[0]}
              </button>
            ))}
          </div>
          <button type="button" aria-label="Next case" onClick={() => go(active + 1)} className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink/40 text-ink transition-colors hover:bg-ink/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal"><ChevronRight size={20} /></button>
        </div>
      </div>
    </section>
  )
}
