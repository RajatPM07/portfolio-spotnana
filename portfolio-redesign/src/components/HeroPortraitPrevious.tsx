import { motion, useSpring, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'

// Critically damped, so the portrait settles without overshoot or wobble.
const SPRING = { stiffness: 110, damping: 20, mass: 0.8 }
const SLOW_SPRING = { stiffness: 60, damping: 16, mass: 1 }

export default function HeroPortraitPrevious({ x, y }: { x: MotionValue<number>; y: MotionValue<number> }) {
  const fx = useSpring(x, SPRING)
  const fy = useSpring(y, SPRING)
  const bx = useSpring(x, SLOW_SPRING)
  const by = useSpring(y, SLOW_SPRING)

  const portraitX = useTransform(fx, (v) => v * 18)
  const portraitY = useTransform(fy, (v) => v * 12)
  const rotateY = useTransform(fx, (v) => v * 6)
  const rotateX = useTransform(fy, (v) => v * -4)

  // Background layer moves less than the portrait, and against it.
  const bgX = useTransform(bx, (v) => v * -9)
  const bgY = useTransform(by, (v) => v * -6)

  const lightLeft = useTransform(bx, [-1, 1], ['26%', '74%'])
  const lightTop = useTransform(by, [-1, 1], ['26%', '66%'])

  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[440px] sm:max-w-[500px] lg:aspect-auto lg:h-[min(78vh,700px)] lg:max-w-none">
      {/* Frameless depth: a soft glow and a faint grid that fade out before any edge. */}
      <motion.div className="absolute inset-[-4%]" style={{ x: bgX, y: bgY }}>
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 60% 55% at 50% 42%, rgba(37,196,228,0.16), transparent 72%)' }}
        />
        <div
          className="absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(215,226,234,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(215,226,234,0.5) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
            maskImage: 'radial-gradient(ellipse 52% 48% at 50% 44%, #000 10%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse 52% 48% at 50% 44%, #000 10%, transparent 75%)',
          }}
        />
      </motion.div>

      <motion.div
        className="pointer-events-none absolute h-[62%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: lightLeft,
          top: lightTop,
          background: 'radial-gradient(circle, rgba(37,196,228,0.2) 0%, rgba(37,196,228,0.07) 38%, transparent 66%)',
        }}
      />

      <div className="absolute inset-0 flex items-end justify-center" style={{ perspective: 1100 }}>
        <motion.img
          src="/portrait.webp"
          alt="Rajat Sharma, illustrated portrait"
          width={1100}
          height={1325}
          draggable={false}
          className="portrait-mask block h-full w-auto max-w-full select-none object-contain"
          style={{ x: portraitX, y: portraitY, rotateX, rotateY, willChange: 'transform' }}
        />
      </div>
    </div>
  )
}
