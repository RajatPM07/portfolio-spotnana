import { motion, useSpring, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'

const SPRING = { stiffness: 110, damping: 20, mass: 0.8 }
const SLOW_SPRING = { stiffness: 55, damping: 15, mass: 1 }

// Hero B: the portrait stands on a perspective floor grid under a soft spotlight cone.
// The cone follows the pointer slowly, the floor shifts a little, the portrait moves most.
export default function PortraitB({ x, y }: { x: MotionValue<number>; y: MotionValue<number> }) {
  const fx = useSpring(x, SPRING)
  const fy = useSpring(y, SPRING)
  const bx = useSpring(x, SLOW_SPRING)
  const by = useSpring(y, SLOW_SPRING)

  const portraitX = useTransform(fx, (v) => v * 12)
  const portraitY = useTransform(fy, (v) => v * 7)
  const rotateY = useTransform(fx, (v) => v * 3)
  const rotateX = useTransform(fy, (v) => v * -2.5)
  const floorX = useTransform(bx, (v) => v * -10)
  const coneRotate = useTransform(bx, (v) => v * 7)
  const glowLeft = useTransform(bx, [-1, 1], ['38%', '62%'])
  const glowTop = useTransform(by, [-1, 1], ['26%', '46%'])

  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[440px] sm:max-w-[500px] lg:aspect-auto lg:h-[min(80vh,720px)] lg:max-w-none">
      {/* Spotlight cone from above. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-[-30%] top-[4%] h-[92%] origin-top"
        style={{
          rotate: coneRotate,
          background:
            'conic-gradient(from 180deg at 50% 0%, rgba(215,226,234,0.20) 0deg, rgba(215,226,234,0.13) 16deg, transparent 36deg, transparent 324deg, rgba(215,226,234,0.13) 344deg, rgba(215,226,234,0.20) 360deg)',
          maskImage: 'linear-gradient(to bottom, #000 0%, #000 45%, transparent 92%)',
          WebkitMaskImage: 'linear-gradient(to bottom, #000 0%, #000 45%, transparent 92%)',
        }}
      />

      {/* Perspective floor. */}
      <motion.div aria-hidden className="pointer-events-none absolute inset-x-[-14%] bottom-0 h-[52%] overflow-hidden" style={{ x: floorX, perspective: 520 }}>
        <div
          className="absolute inset-x-0 bottom-0 h-[220%] origin-bottom"
          style={{
            transform: 'rotateX(68deg)',
            backgroundImage:
              'linear-gradient(rgba(37,196,228,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(37,196,228,0.55) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            backgroundPosition: 'center bottom',
            opacity: 0.75,
            maskImage: 'radial-gradient(ellipse 70% 80% at 50% 100%, #000 25%, transparent 85%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 80% at 50% 100%, #000 25%, transparent 85%)',
          }}
        />
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute h-[56%] w-[56%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: glowLeft,
          top: glowTop,
          background: 'radial-gradient(circle, rgba(37,196,228,0.14) 0%, rgba(37,196,228,0.05) 42%, transparent 68%)',
        }}
      />

      <div className="absolute inset-0 flex items-end justify-center" style={{ perspective: 1100 }}>
        <motion.img
          src="/portrait-cutout.webp"
          alt="Rajat Sharma, illustrated portrait"
          width={1100}
          height={1325}
          draggable={false}
          className="portrait-fade block h-[96%] w-auto max-w-full select-none object-contain"
          style={{ x: portraitX, y: portraitY, rotateX, rotateY, willChange: 'transform' }}
        />
      </div>
    </div>
  )
}
