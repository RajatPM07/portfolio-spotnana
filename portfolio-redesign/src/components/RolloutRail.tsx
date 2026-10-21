import { useEffect, useState } from 'react'

// The page as a rollout: five phases with a gate between each. A gate reads Cleared once you have
// passed it, Pending until then. State is shown by line style and a text label, never colour alone.
const phases = [
  { id: 'top', label: 'Hook' },
  { id: 'work', label: 'Evidence' },
  { id: 'cases', label: 'Cases' },
  { id: 'builder', label: 'Builder' },
  { id: 'about', label: 'About and contact' },
]

export default function RolloutRail() {
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const line = window.innerHeight * 0.45
      let a = 0
      phases.forEach((p, i) => {
        const el = document.getElementById(p.id)
        if (el && el.getBoundingClientRect().top <= line) a = i
      })
      setActive(a)
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      {/* Phones and tablets: a thin progress line. */}
      <div aria-hidden className="fixed inset-x-0 top-0 z-50 h-[3px] bg-transparent lg:hidden">
        <div className="h-full origin-left bg-signal" style={{ transform: `scaleX(${progress})` }} />
      </div>

      <nav aria-label="Page progress" className="fixed right-3 top-1/2 z-50 hidden -translate-y-1/2 lg:flex lg:flex-col lg:items-center">
        {phases.map((p, i) => {
          const isActive = i === active
          const passed = i < active
          return (
            <div key={p.id} className="flex flex-col items-center">
              <a
                href={`#${p.id}`}
                aria-label={`${p.label}, phase ${i + 1} of ${phases.length}${isActive ? ', current' : ''}`}
                aria-current={isActive ? 'step' : undefined}
                className="group relative flex h-6 w-6 items-center justify-center rounded-full"
              >
                <span
                  className={`block rounded-full border-2 transition-all duration-200 ${isActive ? 'h-4 w-4 border-signal bg-signal' : passed ? 'h-3 w-3 border-teal bg-teal' : 'h-3 w-3 border-ink/50 bg-raised'}`}
                />
                <span
                  className={`pointer-events-none absolute right-8 whitespace-nowrap rounded-full border border-ink/25 bg-raised px-3 py-1 font-mono text-xs uppercase tracking-wider text-ink shadow-card transition-opacity duration-200 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100`}
                >
                  {p.label}
                </span>
              </a>
              {i < phases.length - 1 && (
                <div className="flex flex-col items-center">
                  <span
                    aria-hidden
                    className={`block h-7 w-0 border-l-2 ${i < active ? 'border-solid border-teal' : 'border-dashed border-ink/50'}`}
                  />
                  <span className="sr-only">{i < active ? 'Gate cleared' : 'Gate pending'}</span>
                </div>
              )}
            </div>
          )
        })}
      </nav>
    </>
  )
}
