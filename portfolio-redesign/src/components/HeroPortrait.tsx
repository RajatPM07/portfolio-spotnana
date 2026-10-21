import { useCallback, useState } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import ChromeArc from './ChromeArc'
import { useMatchMedia } from './usePointerDepth'

// Critically damped, so nothing overshoots or wobbles.
const SPRING = { stiffness: 110, damping: 20, mass: 0.8 }
const SLOW_SPRING = { stiffness: 55, damping: 15, mass: 1 }

// Used when WebGL is unavailable or fails: the same arc, flat.
function StaticArc() {
  return (
    <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 h-full w-full">
      <defs>
        <linearGradient id="arc-metal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3a4249" />
          <stop offset="0.35" stopColor="#c9d3da" />
          <stop offset="0.6" stopColor="#6b757d" />
          <stop offset="1" stopColor="#1b2126" />
        </linearGradient>
      </defs>
      <path d="M8 74 C 4 28, 58 2, 94 34" fill="none" stroke="url(#arc-metal)" strokeWidth="5" strokeLinecap="round" />
      <path d="M12 66 C 10 32, 56 8, 88 32" fill="none" stroke="#25c4e4" strokeOpacity="0.35" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  )
}

export default function HeroPortrait({ x, y }: { x: MotionValue<number>; y: MotionValue<number> }) {
  const reduced = useMatchMedia('(prefers-reduced-motion: reduce)')
  const [webglFailed, setWebglFailed] = useState(false)
  const onFail = useCallback(() => setWebglFailed(true), [])

  // The portrait moves and tilts less than the sculpture, and the light layer moves least.
  const fx = useSpring(x, SPRING)
  const fy = useSpring(y, SPRING)
  const bx = useSpring(x, SLOW_SPRING)
  const by = useSpring(y, SLOW_SPRING)

  const portraitX = useTransform(fx, (v) => v * 12)
  const portraitY = useTransform(fy, (v) => v * 8)
  const rotateY = useTransform(fx, (v) => v * 3)
  const rotateX = useTransform(fy, (v) => v * -2.5)
  const bgX = useTransform(bx, (v) => v * -6)
  const bgY = useTransform(by, (v) => v * -4)
  const lightLeft = useTransform(bx, [-1, 1], ['30%', '70%'])
  const lightTop = useTransform(by, [-1, 1], ['28%', '62%'])

  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[440px] sm:max-w-[500px] lg:aspect-auto lg:h-[min(80vh,720px)] lg:max-w-none">
      <motion.div aria-hidden className="pointer-events-none absolute inset-[-6%]" style={{ x: bgX, y: bgY }}>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 58% 52% at 50% 44%, rgba(37,196,228,0.13), transparent 72%)' }} />
        <div
          className="absolute inset-0 opacity-[0.13]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(215,226,234,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(215,226,234,0.5) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
            maskImage: 'radial-gradient(ellipse 50% 42% at 50% 50%, #000 10%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse 50% 42% at 50% 50%, #000 10%, transparent 75%)',
          }}
        />
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute h-[56%] w-[56%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: lightLeft,
          top: lightTop,
          background: 'radial-gradient(circle, rgba(37,196,228,0.16) 0%, rgba(37,196,228,0.05) 40%, transparent 66%)',
        }}
      />

      {/* The sculpture sits behind the portrait and spills past the stage. */}
      <div aria-hidden className="pointer-events-none absolute -inset-x-[14%] -inset-y-[8%] z-10">
        {webglFailed ? <StaticArc /> : <ChromeArc x={x} y={y} reduced={reduced} onFail={onFail} />}
      </div>

      <motion.div
        className="absolute inset-x-0 bottom-0 z-20 flex h-[100%] items-end justify-center"
        initial={reduced ? false : { y: 22, scale: 0.97 }}
        animate={{ y: 0, scale: 1 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        style={{ perspective: 1100 }}
      >
        <motion.img
          src="/portrait-cutout.webp"
          alt="Rajat Sharma, illustrated portrait"
          width={1100}
          height={1325}
          draggable={false}
          className="portrait-fade block h-full w-auto max-w-full select-none object-contain"
          style={{ x: portraitX, y: portraitY, rotateX, rotateY, willChange: 'transform' }}
        />
      </motion.div>
    </div>
  )
}
