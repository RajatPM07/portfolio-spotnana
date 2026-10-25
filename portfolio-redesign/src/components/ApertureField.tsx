import { useEffect, useRef } from 'react'
import type { MotionValue } from 'framer-motion'

// The hero's physical rule made visible: marks drift left to right. Before the gate they jitter and
// wander (noise). They pass through the gate and leave as even, aligned lanes (order).
// Every mark is a pure function of time and its id, so nothing is stored per frame.

const LANE_GAP = 24
const SPACING = 38
const SPEED = 46 // px per second
const FUNNEL = 0.52 // fraction of the width, left of the gate, over which noise relaxes
const ENTRANCE_MS = 900

const hash = (n: number) => {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453
  return s - Math.floor(s)
}
const smooth = (a: number, b: number, v: number) => {
  const t = Math.min(1, Math.max(0, (v - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

type Props = { x: MotionValue<number>; reduced: boolean; label?: boolean }

export default function ApertureField({ x, reduced, label = true }: Props) {
  const ref = useRef<HTMLCanvasElement>(null)
  const labelRef = useRef(label)
  labelRef.current = label
  const reducedRef = useRef(reduced)
  const kick = useRef<() => void>(() => {})

  useEffect(() => {
    reducedRef.current = reduced
    kick.current()
  }, [reduced])

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    let w = 1, h = 1, dpr = 1
    let raf = 0
    let onScreen = true
    let docVisible = !document.hidden
    const start = performance.now()
    let gate = 0.56
    let last = start

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const r = canvas.getBoundingClientRect()
      w = Math.max(1, Math.round(r.width))
      h = Math.max(1, Math.round(r.height))
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (now: number) => {
      const isReduced = reducedRef.current
      const t = isReduced ? 5 : (now - start) / 1000
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const ent = isReduced ? 1 : Math.min(1, (now - start) / ENTRANCE_MS)
      const ease = 1 - Math.pow(1 - ent, 3)
      // The gate drifts with the pointer, slowly, and never snaps.
      const target = 0.56 + (isReduced ? 0 : x.get() * 0.05)
      gate += (target - gate) * (1 - Math.exp(-dt * 2.2))
      const gx = gate * w

      ctx.clearRect(0, 0, w, h)
      const lanes = Math.ceil(h / LANE_GAP)
      const per = Math.ceil(w / SPACING) + 2
      const funnel = FUNNEL * w
      for (let l = 0; l < lanes; l++) {
        const baseY = l * LANE_GAP + LANE_GAP / 2
        for (let k = 0; k < per; k++) {
          const id = l * 131 + k
          const base = (k * SPACING + SPEED * t + hash(l) * SPACING) % (per * SPACING)
          const px0 = base - SPACING
          const wob = Math.min(1, Math.max(0, 1 - smooth(gx - funnel, gx, px0)))
          const a1 = hash(id) * 6.283, a2 = hash(id + 7.7) * 6.283
          const nx = Math.sin(t * 0.9 + a1) * 0.6 + Math.sin(t * 1.7 + a2) * 0.4
          const ny = Math.sin(t * 1.1 + a2) * 0.6 + Math.sin(t * 2.1 + a1) * 0.4
          const jitter = wob * (isReduced ? 1 : ease)
          const px = px0 + nx * 26 * jitter
          const py = baseY + ny * 34 * jitter
          if (px < -6 || px > w + 6) continue
          const after = smooth(gx - 24, gx + 90, px)
          const alpha = (0.26 + 0.42 * after) * (0.5 + 0.5 * ease)
          // before the gate: cool grey; after: cyan
          const r = Math.round(150 + (37 - 150) * after)
          const g = Math.round(165 + (196 - 165) * after)
          const b = Math.round(178 + (228 - 178) * after)
          ctx.fillStyle = `rgba(${r},${g},${b},${alpha.toFixed(3)})`
          const len = 3 + 7 * after
          ctx.fillRect(px - len / 2, py - 1, len, 2)
        }
      }

      // The gate itself: one hairline with a soft band, drawn in from the middle.
      const gh = h * ease
      const y0 = (h - gh) / 2
      const grad = ctx.createLinearGradient(0, y0, 0, y0 + gh)
      grad.addColorStop(0, 'rgba(215,226,234,0)')
      grad.addColorStop(0.25, 'rgba(215,226,234,0.55)')
      grad.addColorStop(0.75, 'rgba(215,226,234,0.55)')
      grad.addColorStop(1, 'rgba(215,226,234,0)')
      ctx.fillStyle = grad
      ctx.fillRect(gx - 0.5, y0, 1, gh)
      const band = ctx.createLinearGradient(gx - 60, 0, gx + 60, 0)
      band.addColorStop(0, 'rgba(37,196,228,0)')
      band.addColorStop(0.5, 'rgba(37,196,228,0.10)')
      band.addColorStop(1, 'rgba(37,196,228,0)')
      ctx.fillStyle = band
      ctx.fillRect(gx - 60, y0, 120, gh)
      // The gate is the bar from the Ria case. Decorative label, drawn on the canvas.
      if (labelRef.current && ease > 0.9 && h > 420) {
        ctx.font = '12px ui-monospace, Menlo, monospace'
        const label = 'THE GATE'
        const ly = Math.max(112, y0 + 28)
        ctx.fillStyle = 'rgba(12,12,12,0.92)'
        ctx.fillRect(gx + 8, ly - 14, ctx.measureText(label).width + 12, 20)
        ctx.fillStyle = 'rgba(215,226,234,0.8)'
        ctx.fillText(label, gx + 14, ly)
      }
    }

    const needsLoop = () => !reducedRef.current && onScreen && docVisible
    const loop = (now: number) => {
      raf = 0
      draw(now)
      if (needsLoop()) raf = requestAnimationFrame(loop)
    }
    const run = () => {
      cancelAnimationFrame(raf)
      raf = 0
      last = performance.now()
      if (needsLoop()) raf = requestAnimationFrame(loop)
      else draw(performance.now())
    }
    kick.current = run

    const ro = new ResizeObserver(() => {
      resize()
      draw(performance.now())
    })
    ro.observe(canvas)
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting
      run()
    })
    io.observe(canvas)
    const onVis = () => {
      docVisible = !document.hidden
      run()
    }
    document.addEventListener('visibilitychange', onVis)
    resize()
    run()
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      kick.current = () => {}
    }
  }, [x])

  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />
}
