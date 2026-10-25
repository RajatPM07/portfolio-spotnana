import { useRef } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import ApertureField from '../components/ApertureField'
import { usePointerDepth, useMatchMedia } from '../components/usePointerDepth'
import { ContactButton, GhostButton } from '../components/Buttons'

const links = [
  { label: 'Work', href: '#work' },
  { label: 'Builder', href: '#builder' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

const proof = [
  { big: '3 hours to 20 min', label: 'to assess a complex health insurance application, with an AI assistant I led (Ria)', fine: '45% of health cases' },
  { big: 'US$12M to US$36M', label: 'in yearly insurance premiums from a travel product I owned, in 18 months', fine: 'Gross written premium, 10k policies a day' },
]

// Hero D, "the aperture": order emerges where marks cross the gate (see CREATIVE_BRIEF.md).
export default function HeroD() {
  const ref = useRef<HTMLElement>(null)
  const { x, y } = usePointerDepth(ref)
  const reduced = useMatchMedia('(prefers-reduced-motion: reduce)')
  // Below lg the portrait sits under the text, so the marks gather around the portrait instead of behind the words.
  const stacked = useMatchMedia('(max-width: 1023px)')
  const fx = useSpring(x, { stiffness: 90, damping: 20, mass: 0.9 })
  const fy = useSpring(y, { stiffness: 90, damping: 20, mass: 0.9 })
  const px = useTransform(fx, (v) => v * 10)
  const py = useTransform(fy, (v) => v * 6)
  const ry = useTransform(fx, (v) => v * 2.2)

  return (
    <section id="top" ref={ref} className="relative flex flex-col px-6 pb-16 md:px-10 lg:min-h-screen lg:pb-14" style={{ overflowX: 'clip' }}>
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        {!stacked && <ApertureField x={x} reduced={reduced} />}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 70% at 50% 50%, transparent 40%, rgba(12,12,12,0.7) 100%)' }} />
        {/* Keeps the left column calm so the headline reads instantly. */}
        <div className="absolute inset-y-0 left-0 w-[46%]" style={{ background: 'linear-gradient(90deg, rgba(12,12,12,0.78) 0%, rgba(12,12,12,0.5) 45%, transparent 100%)' }} />
      </div>

      <nav className="relative z-30 flex justify-between pt-6 text-sm font-medium uppercase tracking-wider text-mist md:justify-end md:gap-12 md:pt-8 md:text-lg lg:pt-6">
        {links.map((l) => (
          <a key={l.href} href={l.href} className="transition-opacity duration-200 hover:opacity-70">
            {l.label}
          </a>
        ))}
      </nav>

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col gap-8 py-8 lg:justify-center lg:py-4">
        <div className="relative z-20 flex flex-col gap-5 lg:max-w-[50%] lg:gap-6">
          <div>
            <div className="text-xl font-semibold uppercase tracking-wide text-mist md:text-2xl">Rajat Sharma</div>
            <div className="mt-1 text-sm font-medium uppercase tracking-wide text-mist/90 md:text-base">Senior Product Manager, ICICI Lombard</div>
          </div>
          <h1 className="hero-heading-strong font-black uppercase leading-[0.98] tracking-tight" style={{ fontSize: 'clamp(2.3rem, 4.5vw, 4.4rem)' }}>
            I build AI that makes insurance decisions faster and safer.
          </h1>
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {proof.map((p) => (
              <div key={p.big} className="border-l-2 border-signal pl-4">
                <div className="whitespace-nowrap font-black uppercase leading-none text-signal" style={{ fontSize: 'clamp(1.5rem, 2.3vw, 2.2rem)' }}>
                  {p.big}
                </div>
                <div className="mt-1.5 max-w-[26rem] text-base font-normal leading-snug text-mist/90">{p.label}</div>
                <div className="mt-0.5 font-mono text-xs uppercase tracking-wider text-mist/60">{p.fine}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <ContactButton href="#work">Explore my work</ContactButton>
            <GhostButton href="mailto:sharma.rajat70@gmail.com">Email me</GhostButton>
          </div>
        </div>

        {/* The portrait stands in front of the gate. */}
        <motion.div
          className="relative mx-auto aspect-[4/5] w-full max-w-[440px] sm:max-w-[500px] lg:absolute lg:bottom-0 lg:right-[2%] lg:mx-0 lg:aspect-auto lg:h-[92%] lg:w-[46%] lg:max-w-none"
          initial={reduced ? false : { y: 24 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          style={{ perspective: 1100 }}
        >
          {stacked && (
            <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-6 bottom-0" style={{ WebkitMaskImage: 'radial-gradient(ellipse 72% 62% at 50% 52%, #000 35%, transparent 100%)', maskImage: 'radial-gradient(ellipse 72% 62% at 50% 52%, #000 35%, transparent 100%)' }}>
              <ApertureField x={x} reduced={reduced} label={false} />
            </div>
          )}
          <div className="absolute inset-0 flex items-end justify-center">
            <motion.img
              src="/portrait-cutout.webp"
              alt="Rajat Sharma, illustrated portrait"
              width={1100}
              height={1325}
              draggable={false}
              className="portrait-fade block h-full w-auto max-w-full select-none object-contain"
              style={{ x: px, y: py, rotateY: ry, willChange: 'transform', filter: 'drop-shadow(0 0 40px rgba(37,196,228,0.14))' }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
