import { RiaChart, TripChart, EngineChart } from '../components/MicroCharts'

const charts = [RiaChart, TripChart, EngineChart]

const summaries = [
  {
    n: '01',
    sector: 'Health insurance, AI underwriting',
    name: 'Ria',
    href: '#ria',
    headline: '3 hours to minutes per case',
    built: 'AI review of non standard proposals.',
    owned: 'Sole IC PM, 8 teams, 5 platforms.',
    changed: '95% agreement vs a 92% bar.',
  },
  {
    n: '02',
    sector: 'Travel insurance, 0 to 1',
    name: 'TripSecure+',
    href: '#tripsecure',
    headline: 'Profitable in 6 months',
    built: 'New product replacing a decade old one.',
    owned: 'Discovery to launch, 10 person team.',
    changed: '₹100 cr to ₹300 cr in 18 months.',
  },
  {
    n: '03',
    sector: 'Health portfolio and personalization',
    name: 'Recommendation engine',
    href: '#engine',
    headline: 'Cross sell acceptance up 5.3x',
    built: 'ML for churn and cross sell, in checkout.',
    owned: 'Partnered with applied science.',
    changed: '1.5% to 8%, with a 10% ARPU lift.',
  },
]

const rows = [
  ['Built', 'built'],
  ['Owned', 'owned'],
  ['Changed', 'changed'],
] as const

export default function WorkSummary() {
  return (
    <section
      id="work"
      className="paper-section grain relative -mt-10 scroll-mt-0 rounded-t-[36px] bg-paper px-5 pb-16 pt-14 shadow-[0_-18px_40px_-20px_rgba(0,0,0,0.7)] sm:px-8 md:px-10 md:pb-24 md:pt-20"
    >
      <div className="relative z-10 mx-auto max-w-[1280px]">
        <h2 className="font-semibold leading-none text-ink" style={{ fontSize: 'clamp(2.4rem, 5.4vw, 4.4rem)' }}>
          Selected work
        </h2>
        <p className="mt-4 max-w-2xl text-lg font-normal leading-relaxed text-ink-soft">Three products I took to production.</p>

        {/* On desktop each card is a subgrid over seven shared rows, so titles, outcomes and
            Built, Owned, Changed line up across cards. On smaller screens cards simply stack. */}
        <div className="mt-10 grid gap-5 md:mt-14 lg:grid-cols-3 lg:grid-rows-[repeat(8,auto)] lg:gap-y-0">
          {summaries.map((s, idx) => {
          const Chart = charts[idx]
          return (
            <a
              key={s.n}
              href={s.href}
              className="group flex flex-col rounded-2xl border border-ink/15 bg-raised p-6 shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-card-lift focus-visible:-translate-y-1 focus-visible:shadow-card-lift focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal motion-reduce:transform-none motion-reduce:transition-none md:p-7 lg:row-span-8 lg:grid lg:grid-rows-subgrid"
            >
              <div className="font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                Case {s.n} <span aria-hidden>/</span> {s.sector}
              </div>
              <h3 className="mt-3 text-[1.7rem] font-semibold leading-tight text-ink md:text-[1.9rem]">{s.name}</h3>
              <p className="mt-2 text-xl font-semibold leading-snug text-teal">{s.headline}</p>
              <div className="mb-5 mt-4 min-h-[76px]"><Chart /></div>

              {rows.map(([label, key]) => (
                <div key={key} className="border-t border-ink/15 py-2.5">
                  <div className="font-mono text-xs uppercase tracking-[0.12em] text-teal">{label}</div>
                  <p className="mt-0.5 text-[17px] font-medium leading-snug text-ink">{s[key]}</p>
                </div>
              ))}

              <span className="mt-4 self-end text-base font-semibold text-teal underline-offset-4 group-hover:underline group-focus-visible:underline lg:self-end">
                Read the case <span aria-hidden>→</span>
              </span>
            </a>
          )})}
        </div>
      </div>
    </section>
  )
}
