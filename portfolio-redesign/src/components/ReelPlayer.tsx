import { useEffect, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { useMatchMedia } from './usePointerDepth'

// A tiny silent loop for a card. Plays only while `active`, on screen, the tab is visible,
// the viewer has not paused it, and motion is allowed. Reduced motion shows the poster still.
export default function ReelPlayer({ src, poster, active, label, aspect = 720 / 250 }: { src: string; poster: string; active: boolean; label: string; aspect?: number }) {
  const reduced = useMatchMedia('(prefers-reduced-motion: reduce)')
  const ref = useRef<HTMLVideoElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const [docVisible, setDocVisible] = useState(!document.hidden)
  const [userPaused, setUserPaused] = useState(false)

  useEffect(() => {
    const el = boxRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 })
    io.observe(el)
    const onVis = () => setDocVisible(!document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  const shouldPlay = active && inView && docVisible && !userPaused && !reduced
  useEffect(() => {
    const v = ref.current
    if (!v) return
    if (shouldPlay) void v.play().catch(() => {})
    else v.pause()
  }, [shouldPlay])

  return (
    <div ref={boxRef} className="relative overflow-hidden rounded-xl border border-ink/15" style={{ aspectRatio: String(aspect) }}>
      {reduced ? (
        <img src={poster} alt={label} className="h-full w-full object-cover" />
      ) : (
        <>
          <video ref={ref} className="h-full w-full object-cover" src={src} poster={poster} muted loop playsInline preload="none" aria-label={label} />
          {active && (
            <button
              type="button"
              onClick={() => setUserPaused((p) => !p)}
              aria-pressed={userPaused}
              aria-label={userPaused ? 'Play reel' : 'Pause reel'}
              className="absolute bottom-2 right-2 flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-black/70 text-white transition-colors hover:bg-black/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
            >
              {userPaused ? <Play size={16} aria-hidden /> : <Pause size={16} aria-hidden />}
            </button>
          )}
        </>
      )}
    </div>
  )
}
