import { useEffect, useRef, useState } from 'react'

// Plays once when scrolled into view, then rests. Reduced motion renders the finished state.
function usePlayOnce() {
  const ref = useRef<HTMLDivElement>(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOn(true)
      return
    }
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setOn(true)
        io.disconnect()
      }
    }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return { ref, on }
}

const ease = 'cubic-bezier(0.22, 1, 0.36, 1)'

function Caption({ children }: { children: string }) {
  return <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">{children}</p>
}

// Ria: a baseline bar collapses. Shapes are drawn, not data.
export function RiaChart() {
  const { ref, on } = usePlayOnce()
  return (
    <div ref={ref} role="img" aria-label="Chart: 3 hours per case before, 20 minutes now, to scale.">
      <div className="flex items-baseline justify-between font-mono text-xs uppercase tracking-wider text-ink">
        <span>Before: 3 hours</span>
        <span className="text-teal">Now: 20 minutes</span>
      </div>
      <div className="mt-2 h-3 overflow-hidden rounded-sm bg-ink/10">
        <div className="h-full origin-left rounded-sm bg-ink/70" style={{ width: '100%', transform: `scaleX(${on ? 0.111 : 1})`, backgroundColor: on ? '#126879' : undefined, transition: `transform 900ms ${ease} 450ms, background-color 600ms ease 450ms` }} />
      </div>
      <Caption>Decision time, to scale</Caption>
    </div>
  )
}

// TripSecure+: a line that crosses zero at month 6. Only the break even point is real.
export function TripChart() {
  const { ref, on } = usePlayOnce()
  const len = 260
  return (
    <div ref={ref} role="img" aria-label="Chart: profitable after 6 months. Illustrative, not to scale.">
      <svg viewBox="0 0 280 76" className="h-[76px] w-full" fill="none">
        <line x1="0" y1="40" x2="280" y2="40" stroke="#202422" strokeOpacity="0.35" strokeDasharray="3 4" />
        <path d="M4 56 C 70 54, 110 46, 150 40 S 230 12, 276 6" stroke="#126879" strokeWidth="2.5" strokeLinecap="round" style={{ strokeDasharray: len, strokeDashoffset: on ? 0 : len, transition: `stroke-dashoffset 1100ms ${ease} 300ms` }} />
        <circle cx="150" cy="40" r="5" fill="#f4f1eb" stroke="#126879" strokeWidth="2.5" style={{ opacity: on ? 1 : 0, transition: 'opacity 300ms ease 1100ms' }} />
        <text x="150" y="68" textAnchor="middle" fontSize="11" fill="#202422" fontFamily="ui-monospace, Menlo, monospace" style={{ opacity: on ? 1 : 0, transition: 'opacity 300ms ease 1200ms' }}>MONTH 6</text>
      </svg>
      <div className="flex justify-between font-mono text-[11px] uppercase tracking-wider text-ink-soft">
        <span>Launch</span>
        <span>Profitable in 6 months</span>
      </div>
      <Caption>Illustrative, not to scale</Caption>
    </div>
  )
}

// Recommendation engine: the two real numbers, drawn at true proportion (1.5 to 8).
export function EngineChart() {
  const { ref, on } = usePlayOnce()
  const bar = (label: string, value: number, strong: boolean, delay: number) => (
    <div className="flex items-center gap-3">
      <span className="w-24 flex-none font-mono text-xs uppercase tracking-wider text-ink-soft">{label}</span>
      <div className="relative h-4 flex-1 rounded-sm bg-ink/10">
        <div className="h-full origin-left rounded-sm" style={{ width: `${(value / 8) * 100}%`, transform: `scaleX(${on ? 1 : 0})`, backgroundColor: strong ? '#126879' : 'rgba(32,36,34,0.55)', transition: `transform 900ms ${ease} ${delay}ms` }} />
      </div>
      <span className="w-10 flex-none text-right text-base font-semibold text-ink">{value}%</span>
    </div>
  )
  return (
    <div ref={ref} role="img" aria-label="Chart: attach in an A/B test, 1.5 percent for rule based targeting, 8 percent for the ML model, to scale.">
      <div className="flex flex-col gap-2">
        {bar('Rule based', 1.5, false, 300)}
        {bar('ML model', 8, true, 700)}
      </div>
      <Caption>Attach in A/B test, to scale</Caption>
    </div>
  )
}

// Elevate: market share, real numbers at true proportion (2.3, 3.1, now 5.1).
export function ShareChart() {
  const { ref, on } = usePlayOnce()
  const bar = (label: string, value: number, strong: boolean, delay: number) => (
    <div className="flex items-center gap-3">
      <span className="w-14 flex-none font-mono text-xs uppercase tracking-wider text-ink-soft">{label}</span>
      <div className="relative h-4 flex-1 rounded-sm bg-ink/10">
        <div className="h-full origin-left rounded-sm" style={{ width: `${(value / 5.1) * 100}%`, transform: `scaleX(${on ? 1 : 0})`, backgroundColor: strong ? '#126879' : 'rgba(32,36,34,0.55)', transition: `transform 900ms ${ease} ${delay}ms` }} />
      </div>
      <span className="w-12 flex-none text-right text-base font-semibold text-ink">{value}%</span>
    </div>
  )
  return (
    <div ref={ref} role="img" aria-label="Chart: market share was 2.3 percent, then 3.1 percent in FY25, and is now 5.1 percent, to scale.">
      <div className="flex flex-col gap-2">
        {bar('FY23', 2.3, false, 300)}
        {bar('FY25', 3.1, false, 600)}
        {bar('Now', 5.1, true, 900)}
      </div>
      <Caption>Market share, to scale</Caption>
    </div>
  )
}
