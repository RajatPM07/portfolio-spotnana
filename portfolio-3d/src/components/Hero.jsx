import { motion, useReducedMotion } from 'motion/react'
import { useTilt } from '../hooks/useTilt.js'

const stagger = {
  animate: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}
const item = {
  initial: { opacity: 0, y: 26 },
  animate: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 18 } },
}

export default function Hero() {
  const reduce = useReducedMotion()
  const tilt = useTilt(3.5)

  return (
    <header id="top" style={{ perspective: 1200 }}>
      <motion.div
        className="wrap hero3d"
        variants={stagger}
        initial="initial"
        animate="animate"
        style={reduce ? undefined : { rotateX: tilt.rotateX, rotateY: tilt.rotateY }}
        onPointerMove={reduce ? undefined : tilt.onPointerMove}
        onPointerLeave={reduce ? undefined : tilt.onPointerLeave}
      >
        <motion.span className="kicker" variants={item} style={{ translateZ: 40 }}>
          Product portfolio, 2026
        </motion.span>
        <motion.h1 variants={item} style={{ translateZ: 80 }}>
          I ship AI products
          <br />
          that <em>earn</em> trust.
        </motion.h1>
        <motion.p className="lede" variants={item} style={{ translateZ: 30 }}>
          Rajat Sharma. Senior Product Manager building AI native products, with an InsurTech
          foundation in high stakes, regulated decision systems.
        </motion.p>
        <motion.p className="why" variants={item} style={{ translateZ: 12 }}>
          The through line in my work:{' '}
          <strong>
            I take products that carry real money and real risk, rebuild them end to end, and ship
            AI into them with the governance to deserve production.
          </strong>{' '}
          Below are three case studies and two things I built myself.
        </motion.p>
      </motion.div>
    </header>
  )
}
