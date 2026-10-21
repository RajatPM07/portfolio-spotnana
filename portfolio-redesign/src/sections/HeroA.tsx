import { useRef } from 'react'
import PortraitA from '../components/PortraitA'
import { usePointerDepth } from '../components/usePointerDepth'
import { ContactButton, GhostButton } from '../components/Buttons'

const links = [
  { label: 'Work', href: '#work' },
  { label: 'Builder', href: '#builder' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

const proof = [
  { big: '95%', label: 'AI to underwriter agreement, Ria' },
  { big: '₹100 cr to ₹300 cr', label: 'Revenue in 18 months, TripSecure+' },
]

// Hero A, editorial: a large headline on the left, a large frameless portrait bleeding into the right.
export default function HeroA() {
  const ref = useRef<HTMLElement>(null)
  const { x, y } = usePointerDepth(ref)

  return (
    <section ref={ref} className="relative flex flex-col px-6 pb-16 md:px-10 lg:min-h-screen lg:pb-14" style={{ overflowX: 'clip' }}>
      <nav className="relative z-30 flex justify-between pt-6 text-sm font-medium uppercase tracking-wider text-mist md:justify-end md:gap-12 md:pt-8 md:text-lg lg:pt-6">
        {links.map((l) => (
          <a key={l.href} href={l.href} className="transition-opacity duration-200 hover:opacity-70">
            {l.label}
          </a>
        ))}
      </nav>

      <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col gap-8 py-8 lg:justify-center lg:py-4">
        <div className="relative z-10 flex flex-col gap-5 lg:max-w-[52%] lg:gap-6">
          <div>
            <div className="text-xl font-semibold uppercase tracking-wide text-mist md:text-2xl">Rajat Sharma</div>
            <div className="mt-1 text-sm font-medium uppercase tracking-wide text-mist/90 md:text-base">Senior Product Manager, ICICI Lombard</div>
          </div>

          <h1 className="hero-heading-strong font-black uppercase leading-[0.98] tracking-tight" style={{ fontSize: 'clamp(2.5rem, 5.6vw, 5.4rem)' }}>
            I build AI for high stakes decisions.
          </h1>

          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {proof.map((p) => (
              <div key={p.big} className="border-l-2 border-signal pl-4">
                <div className="whitespace-nowrap font-black uppercase leading-none text-signal" style={{ fontSize: 'clamp(1.5rem, 2.3vw, 2.2rem)' }}>
                  {p.big}
                </div>
                <div className="mt-1.5 text-base font-normal text-mist/90">{p.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <ContactButton href="#work">Explore my work</ContactButton>
            <GhostButton href="mailto:sharma.rajat70@gmail.com">Email me</GhostButton>
          </div>
        </div>

        <PortraitA x={x} y={y} />
      </div>
    </section>
  )
}
