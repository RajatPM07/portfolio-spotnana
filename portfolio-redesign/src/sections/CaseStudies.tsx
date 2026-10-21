import type { ReactNode } from 'react'
import { Gate, Phase, Tag } from '../components/GateRail'

type Stat = { big: string; label: string }
type Group = {
  label?: string
  stats: Stat[]
  rows: [string, string][]
  extra?: ReactNode
  note?: string
}
type Case = {
  id: string
  n: string
  category: string
  name: string
  status: string
  scope: string[]
  groups: Group[]
  // Fill in with a real tradeoff from Rajat. Rendered only when set.
  tradeoff?: string
}

const riaGates = (
  <div>
    <div className="mb-4 font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">Metric gated rollout</div>
    <Phase tag="Complete" tone="live" title="Phase 1, 100% human review" text="Every verdict checked by an underwriter." />
    <Gate
      title="Gate before phase 2"
      items={[
        { text: 'LLM to underwriter agreement: 95% against a 92% bar.', tone: 'live', tag: 'Cleared' },
        { text: 'Dangerous miss rate, where AI is more lenient than a human: targeted at near zero.', tone: 'target', tag: 'Target' },
      ]}
    />
    <Phase tag="Live now" tone="live" title="Phase 2, risk tiered review" text="Review is tiered by risk." />
    <Gate
      title="Gate before phase 3"
      items={[
        { text: 'Fairness disparity thresholds across groups.', tone: 'pending', tag: 'In buildout' },
        { text: 'Verdict to transcript traceability.', tone: 'pending', tag: 'In buildout' },
      ]}
    />
    <Phase tag="In buildout, not live" tone="pending" title="Phase 3" text="Not live. Its gates are still being built." />
    <div className="mt-6 rounded-xl border border-ink/15 bg-raised p-5">
      <div className="font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">Not yet in place</div>
      <ul className="mt-3 flex flex-col gap-3">
        <li className="flex flex-wrap items-center gap-3 text-[17px] text-ink">
          <Tag tone="target">Target</Tag> PII masking, being built toward.
        </li>
        <li className="flex flex-wrap items-center gap-3 text-[17px] text-ink">
          <Tag tone="pending">Planned</Tag> Structured hallucination tracking.
        </li>
      </ul>
    </div>
  </div>
)

const flowStep = (n: string, k: string, t: string, d: string) => (
  <div key={k} className="rounded-xl border border-ink/15 bg-raised p-4">
    <div className="font-mono text-xs uppercase tracking-[0.12em] text-teal">
      {n} {k}
    </div>
    <div className="mt-1 text-xl font-semibold text-ink">{t}</div>
    <p className="text-[17px] leading-relaxed text-ink">{d}</p>
  </div>
)
const arrow = (k: string) => (
  <div key={k} aria-hidden className="py-1 text-center font-mono text-lg text-ink-soft">
    ↓
  </div>
)

const enginePipeline = (
  <div>
    <div className="mb-3 font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">Recommendation engine pipeline</div>
    {flowStep('1', 'Inputs', '10+ customer signals', 'Tenure, claim history, engagement, policy type.')}
    {arrow('a1')}
    {flowStep('2', 'Model', '0.82 AUC ROC', 'Predicts churn risk and cross sell propensity simultaneously.')}
    {arrow('a2')}
    {flowStep('3', 'Decision', 'Next best action', 'At portfolio scale.')}
    {arrow('a3')}
    {flowStep('4', 'Surface', 'One click offer in checkout', 'Cohort targeted by ML, with zero cannibalization of the core purchase journey.')}
  </div>
)

const cases: Case[] = [
  {
    id: 'ria',
    n: '01',
    category: 'Health insurance, AI underwriting',
    name: 'Ria',
    status: 'Phase 2 live',
    scope: ['Sole IC PM', '8 teams', '5 integrated platforms', 'Pilot in 2 months', 'CXO priority'],
    groups: [
      {
        stats: [
          { big: '3 hours to minutes', label: 'per non standard case' },
          { big: '95% agreement', label: 'AI to underwriter, against a 92% bar' },
          { big: '3s to 1s', label: 'inference latency' },
        ],
        rows: [
          ['Problem', 'About 45% of monthly health insurance proposals were non standard and needed manual underwriting review, about 3 hours per case.'],
          ['My ownership', 'Sole individual contributor PM, from definition to pilot in 2 months, across 8 teams and 5 integrated platforms, at CXO level priority.'],
          ['Pivotal decision', 'Roll out in phases behind metric gates, not all at once. Start with 100% human review, then move to risk tiered review once LLM to underwriter agreement cleared its bar, with the dangerous miss rate targeted at near zero.'],
          ['Outcome', '95% AI to underwriter agreement against a 92% bar, and about 90% per insured accuracy. Projected: 20 to 30 crore rupees annual savings at full rollout.'],
        ],
        extra: riaGates,
      },
    ],
  },
  {
    id: 'tripsecure',
    n: '02',
    category: 'Travel insurance, 0 to 1',
    name: 'TripSecure+',
    status: 'Shipped',
    scope: ['Discovery to launch', '10 person cross functional team', 'Retail and broker channels'],
    groups: [
      {
        stats: [
          { big: 'Profitable in 6 months', label: 'revenue of 100 to 300 crore rupees in 18 months' },
          { big: '23% broker share', label: 'of the portfolio, from a dynamic pricing engine' },
          { big: '100+ destinations', label: 'plus an international partner launch in Dubai' },
        ],
        rows: [
          ['Problem', 'The old product was about 10 years old: rigid coverage, fixed outdated pricing, limited distribution, low awareness, no broker or partner availability, and a broken claims experience.'],
          ['My ownership', 'Directed a 10 person cross functional team from discovery through launch, backed by 100 plus generative customer interviews.'],
          ['Pivotal decision', 'Build a new product from scratch, with direct retail and broker or partner channels together from the start. The post pandemic travel rebound and competitive research showed how far behind the old product was.'],
          ['Outcome', 'Profitable in 6 months, revenue of 100 to 300 crore rupees in 18 months, 100 plus destinations, and a dynamic pricing engine that grew the broker channel to 23% of the portfolio.'],
        ],
        note: 'The same shape as owning a booking flow end to end: discovery, pricing, distribution and the partner launch, as one product.',
      },
    ],
  },
  {
    id: 'elevate',
    n: '03',
    category: 'Health portfolio strategy and personalization',
    name: 'Elevate & Personalization',
    status: 'FY24 to 25',
    scope: ['PRDs for coverage and pricing', 'Applied science partnership', 'Mentored one APM'],
    groups: [
      {
        label: 'Elevate: portfolio strategy',
        stats: [
          { big: '2.3% to 3.1%', label: 'market share, a 35% relative gain' },
          { big: '1,500 crore', label: 'health portfolio the strategy covered' },
        ],
        rows: [
          ['My ownership', 'Authored PRDs defining coverage architecture and pricing across segments, assessed the competitive landscape for positioning gaps, and mentored one Associate PM to independent ownership.'],
          ['Outcome', 'The FY24 to 25 strategy grew market share from 2.3% to 3.1%, a 35% relative gain, on a 1,500 crore health portfolio.'],
        ],
        note: 'This share gain belongs to the strategy as a whole. The recommendation engine below is separate work, and is not credited with the full increase.',
      },
      {
        label: 'Recommendation engine',
        stats: [
          { big: '5.3x cross sell', label: 'acceptance, from 1.5% to 8%' },
          { big: '+2.5% retention', label: 'recommendation engine result' },
          { big: '18% CTR', label: 'and a 10% ARPU lift on the checkout offer' },
        ],
        rows: [
          ['My ownership', 'Partnered with applied science on feature engineering, evaluation metrics and production guardrails.'],
          ['Solution', 'A production ML engine, 0.82 AUC ROC, using 10 plus customer signals. It predicts churn risk and cross sell propensity simultaneously, and the scores feed a one click, ML cohort targeted cross sell surface in checkout.'],
          ['Outcome', 'Retention up 2.5%, cross sell acceptance from 1.5% to 8% (5.3x), 18% CTR and a 10% ARPU lift, with zero cannibalization of the core purchase journey.'],
        ],
        extra: enginePipeline,
      },
    ],
  },
]

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-1 border-t border-ink/15 py-5 md:grid-cols-[140px_1fr] md:gap-6">
      <dt className="font-mono text-xs uppercase tracking-[0.12em] text-teal md:pt-1.5">{label}</dt>
      <dd className="max-w-[62ch] text-[17px] font-normal leading-relaxed text-ink md:text-lg">{children}</dd>
    </div>
  )
}

export default function CaseStudies() {
  return (
    <section className="paper-section grain relative bg-paper px-5 pb-28 pt-4 sm:px-8 md:px-10 md:pb-36">
      <div className="relative z-10 mx-auto max-w-[1280px]">
        <div className="border-t border-ink/20 pt-14 md:pt-20">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-soft">Full cases</p>
          <h2 className="mt-3 font-semibold leading-none text-ink" style={{ fontSize: 'clamp(2.4rem, 5.4vw, 4.4rem)' }}>
            Case studies
          </h2>
        </div>

        <div className="mt-14 flex flex-col gap-20 md:mt-20 md:gap-28">
          {cases.map((c) => (
            <article key={c.id} id={c.id} className="grid scroll-mt-8 gap-8 lg:grid-cols-[5fr_7fr] lg:gap-14">
              <div className="lg:sticky lg:top-8 lg:self-start">
                <div className="font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                  Case {c.n} <span aria-hidden>/</span> {c.category}
                </div>
                <h3 className="mt-3 font-semibold leading-tight text-ink" style={{ fontSize: 'clamp(2rem, 3.6vw, 3.1rem)' }}>
                  {c.name}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Tag tone="live">{c.status}</Tag>
                  {c.scope.map((s) => (
                    <span key={s} className="rounded-full border border-ink/25 bg-raised px-3 py-1 text-sm font-medium text-ink">
                      {s}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-col gap-5">
                  {c.groups.map((g, gi) => (
                    <div key={gi}>
                      {g.label && <div className="mb-2 font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">{g.label}</div>}
                      <div className="flex flex-col gap-3">
                        {g.stats.map((s) => (
                          <div key={s.big} className="rounded-xl border border-ink/15 bg-raised p-5 shadow-card">
                            <div className="text-[1.7rem] font-semibold leading-tight text-teal">{s.big}</div>
                            <div className="mt-1 text-base text-ink-soft">{s.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-10">
                {c.groups.map((g, gi) => (
                  <div key={gi}>
                    {g.label && <h4 className="mb-3 text-2xl font-semibold text-ink">{g.label}</h4>}
                    <dl>
                      {g.rows.map(([label, text]) => (
                        <Row key={label} label={label}>
                          {text}
                        </Row>
                      ))}
                      {gi === 0 && c.tradeoff && <Row label="Tradeoff">{c.tradeoff}</Row>}
                    </dl>
                    {g.note && <p className="mt-4 max-w-[62ch] border-l-2 border-teal pl-4 text-[17px] leading-relaxed text-ink-soft">{g.note}</p>}
                    {g.extra && <div className="mt-6 rounded-2xl border border-ink/15 bg-paper/70 p-5 md:p-7">{g.extra}</div>}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
