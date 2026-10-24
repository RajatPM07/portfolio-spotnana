import { useEffect, useRef } from 'react'
import { ContactButton, GhostButton } from '../components/Buttons'
import { useMatchMedia } from '../components/usePointerDepth'

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

// Hero C, video: a silent seamless loop fills the hero behind the text.
// The page keeps all real content as text. A dark fade on the left protects readability.
export default function HeroC() {
  const reduced = useMatchMedia('(prefers-reduced-motion: reduce)')
  const narrow = useMatchMedia('(max-width: 767px)')
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  // Play only while the hero is on screen.
  useEffect(() => {
    const v = videoRef.current
    const s = sectionRef.current
    if (!v || !s) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) void v.play().catch(() => {})
      else v.pause()
    })
    io.observe(s)
    return () => io.disconnect()
  }, [reduced, narrow])

  const poster = narrow ? '/hero-poster-port.jpg' : '/hero-poster-land.jpg'
  const src = narrow ? '/hero-loop-port.mp4' : '/hero-loop-land.mp4'

  return (
    <section ref={sectionRef} className="relative flex flex-col px-6 pb-16 md:px-10 lg:min-h-screen lg:pb-14" style={{ overflowX: 'clip', background: '#0c0c0c' }}>
      {/* Media layer: a still for reduced motion, otherwise the loop. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        {reduced ? (
          <img src={poster} alt="" className={`h-full w-full object-cover ${narrow ? "object-bottom" : "object-right"}`} />
        ) : (
          <video key={src} ref={videoRef} className={`h-full w-full object-cover ${narrow ? "object-bottom" : "object-right"}`} src={src} poster={poster} autoPlay muted loop playsInline preload="auto" />
        )}
        {/* Dark fade on the left, so the headline and buttons stay readable. Top to bottom on phones. */}
        <div className="absolute inset-0 hidden md:block" style={{ background: 'linear-gradient(90deg, #0c0c0c 0%, #0c0c0c 30%, rgba(12,12,12,0.82) 46%, rgba(12,12,12,0.25) 66%, transparent 82%)' }} />
        <div className="absolute inset-0 md:hidden" style={{ background: 'linear-gradient(180deg, #0c0c0c 0%, #0c0c0c 38%, rgba(12,12,12,0.7) 52%, transparent 72%)' }} />
        <div className="absolute inset-x-0 bottom-0 h-24" style={{ background: 'linear-gradient(to top, #0c0c0c, transparent)' }} />
      </div>

      <nav className="relative z-30 flex justify-between pt-6 text-sm font-medium uppercase tracking-wider text-mist md:justify-end md:gap-12 md:pt-8 md:text-lg lg:pt-6">
        {links.map((l) => (
          <a key={l.href} href={l.href} className="transition-opacity duration-200 hover:opacity-70">
            {l.label}
          </a>
        ))}
      </nav>

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col gap-8 py-8 lg:justify-center lg:py-4">
        <div className="flex flex-col gap-5 lg:max-w-[50%] lg:gap-6">
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
        {/* On phones the text sits over the dark top of the video; this spacer lets the portrait show below. */}
        <div aria-hidden className="h-[46vh] md:hidden" />
      </div>
    </section>
  )
}
