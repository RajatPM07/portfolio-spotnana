import { useEffect, useState } from 'react'
import type { RefObject } from 'react'
import { useMotionValue } from 'framer-motion'

const clamp = (v: number) => Math.max(-1, Math.min(1, v))

// Tracks a media query, including changes while the page is open.
export function useMatchMedia(query: string) {
  const [matches, setMatches] = useState(() => (typeof window === 'undefined' ? false : window.matchMedia(query).matches))
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setMatches(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])
  return matches
}

// Normalised pointer position (-1 to 1) over a target element. Stays at 0 for
// touch input, coarse pointers and reduced motion (checked live), and returns
// to 0 on pointer exit, window blur and tab hide.
export function usePointerDepth(target: RefObject<HTMLElement>) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  useEffect(() => {
    const el = target.current
    if (!el) return
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')

    const reset = () => {
      x.set(0)
      y.set(0)
    }
    const move = (e: PointerEvent) => {
      if (e.pointerType === 'touch' || !finePointer.matches || reduced.matches) {
        reset()
        return
      }
      const r = el.getBoundingClientRect()
      x.set(clamp(((e.clientX - r.left) / r.width) * 2 - 1))
      y.set(clamp(((e.clientY - r.top) / r.height) * 2 - 1))
    }
    const onVisibility = () => {
      if (document.hidden) reset()
    }

    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', reset)
    window.addEventListener('blur', reset)
    document.addEventListener('visibilitychange', onVisibility)
    reduced.addEventListener('change', reset)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', reset)
      window.removeEventListener('blur', reset)
      document.removeEventListener('visibilitychange', onVisibility)
      reduced.removeEventListener('change', reset)
    }
  }, [target, x, y])

  return { x, y }
}
