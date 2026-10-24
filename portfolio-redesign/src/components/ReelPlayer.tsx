import { useEffect, useRef } from 'react'
import { useMatchMedia } from './usePointerDepth'

// A tiny silent loop for a card. Plays only while `active`, and only if motion is allowed.
// Reduced motion, or a card that is not in front, shows the poster still.
export default function ReelPlayer({ src, poster, active, label, aspect = 720 / 250 }: { src: string; poster: string; active: boolean; label: string; aspect?: number }) {
  const reduced = useMatchMedia('(prefers-reduced-motion: reduce)')
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    if (active && !reduced) void v.play().catch(() => {})
    else v.pause()
  }, [active, reduced])

  return (
    <div className="overflow-hidden rounded-xl border border-ink/15" style={{ aspectRatio: String(aspect) }}>
      {reduced ? (
        <img src={poster} alt={label} className="h-full w-full object-cover" />
      ) : (
        <video ref={ref} className="h-full w-full object-cover" src={src} poster={poster} muted loop playsInline preload="none" aria-label={label} />
      )}
    </div>
  )
}
