import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useTilt } from '../hooks/useTilt.js'
import { spring } from '../anim.js'

// Schematic product mockup: rests at a product shot angle, springs flat on
// hover, tilts with the pointer, and drifts with scroll parallax.
export default function Mock({ ariaLabel, flip = false, children }) {
  const wrapRef = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [46, -46])
  const tilt = useTilt(7)
  const restY = flip ? 13 : -13

  if (reduce) {
    return (
      <div className="mockwrap" ref={wrapRef}>
        <div className="mock" role="img" aria-label={ariaLabel}>
          {children}
        </div>
        <div className="mcap">Illustrative, not actual product UI</div>
      </div>
    )
  }

  return (
    <motion.div className="mockwrap" ref={wrapRef} style={{ y }}>
      <motion.div
        initial={{ rotateY: restY, rotateX: 5 }}
        whileHover={{ rotateY: 0, rotateX: 0 }}
        transition={spring}
        style={{ transformStyle: 'preserve-3d' }}
        onPointerMove={tilt.onPointerMove}
        onPointerLeave={tilt.onPointerLeave}
      >
        <motion.div
          className="mock"
          role="img"
          aria-label={ariaLabel}
          style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY }}
          animate={{ y: [0, -8, 0] }}
          transition={{ y: { repeat: Infinity, duration: 6, ease: 'easeInOut' } }}
        >
          {children}
        </motion.div>
      </motion.div>
      <div className="mcap">Illustrative, not actual product UI</div>
    </motion.div>
  )
}

export function RiaMock() {
  return (
    <Mock ariaLabel="Illustrative schematic of an AI underwriting verdict panel with human review">
      <div className="chrome"><i /><i /><i /></div>
      <div className="pane">
        <div className="mbar w55" />
        <div className="mbar w85" />
        <div className="mbar w70" />
        <div className="mrow" style={{ borderTop: 'none', marginTop: 8 }}>
          <span className="mtag teal">AI verdict</span>
          <span className="mtag amber">Human review</span>
        </div>
        <div className="mmeter"><i /></div>
        <div className="mbar w40" />
      </div>
    </Mock>
  )
}

export function TripMock() {
  return (
    <Mock ariaLabel="Illustrative schematic of a travel insurance checkout, discover, configure, pay" flip>
      <div className="chrome"><i /><i /><i /></div>
      <div className="pane">
        <div className="mtag teal" style={{ display: 'inline-block', marginBottom: 6 }}>Destination</div>
        <div className="mbar w70" />
        <div className="mrow"><div className="mbar w55" style={{ margin: 0 }} /><span className="mtoggle on" /></div>
        <div className="mrow"><div className="mbar w40" style={{ margin: 0 }} /><span className="mtoggle" /></div>
        <div className="mrow"><div className="mbar w40" style={{ margin: 0 }} /><div className="mbar" style={{ margin: 0, width: '26%', background: 'var(--ink)' }} /></div>
        <span className="mbtn">Pay</span>
      </div>
    </Mock>
  )
}

export function CrossSellMock() {
  return (
    <Mock ariaLabel="Illustrative schematic of a checkout with a one click cross sell card">
      <div className="chrome"><i /><i /><i /></div>
      <div className="pane">
        <div className="mbar w70" />
        <div className="mbar w55" />
        <div className="mrow"><div className="mbar w40" style={{ margin: 0 }} /><div className="mbar" style={{ margin: 0, width: '24%', background: 'var(--ink)' }} /></div>
        <div style={{ border: '1px solid rgba(74,214,168,0.4)', borderRadius: 10, padding: 12, marginTop: 12, background: 'var(--teal-dim)' }}>
          <div className="mrow" style={{ borderTop: 'none', padding: '0 0 4px' }}>
            <div className="mbar w55" style={{ margin: 0 }} />
            <span className="mtag teal">1 click add</span>
          </div>
          <div className="mbar w85" style={{ marginBottom: 0 }} />
        </div>
      </div>
    </Mock>
  )
}
