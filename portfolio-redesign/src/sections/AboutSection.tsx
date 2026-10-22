import FadeIn from '../components/FadeIn'

const earlier = [
  { co: 'Acko', role: 'Product Manager, Claims Experience', line: 'Withdrawn claims cut from 40% to 25%. Support calls per claim halved, 3.9 to 2.0, with a unified agent console.' },
  { co: 'Mediaqart', role: 'Product Manager, AdTech', line: 'Launched MQ Sync 0 to 1, scaling to 1500+ retailers and 5 enterprise brands. Quarterly revenue up 15%.' },
  { co: 'SHL', role: 'Product Analyst', line: 'Assessment completion up 20% across 2.5M monthly users, through a warmup feature.' },
]

export default function AboutSection() {
  return (
    <section id="about" className="bg-void px-5 py-16 sm:px-8 md:px-10 md:py-24">
      <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[5fr_7fr] lg:gap-14">
        <FadeIn duration={0.5}>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight" style={{ fontSize: 'clamp(2.5rem, 9vw, 120px)' }}>
            About
          </h2>
        </FadeIn>
        <FadeIn duration={0.5} delay={0.1}>
          <div className="max-w-2xl">
            <p className="text-lg font-normal leading-relaxed text-mist md:text-xl">
              Senior product manager at ICICI Lombard in Mumbai, promoted in 2026. Seven plus years in product, about five of them in PM titled roles and nearly four in insurance. I own products from a blank page to production, and care as much about governance as about shipping.
            </p>
            <h3 className="mt-10 font-mono text-xs uppercase tracking-[0.12em] text-mist/70">Before ICICI Lombard</h3>
            <ul className="mt-3 divide-y divide-white/15 border-y border-white/15">
              {earlier.map((e) => (
                <li key={e.co} className="py-3 text-base leading-snug text-mist/90">
                  <span className="font-semibold text-mist">{e.co}</span>, {e.role}. {e.line}
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
