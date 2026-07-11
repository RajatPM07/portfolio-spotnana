import { useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react'
import { rise } from '../anim.js'

// The signature device: phases connected by a rail that draws itself as you
// scroll, with metric gates between them.
export default function GateRail() {
  const railRef = useRef(null)
  const reduce = useReducedMotion()
  const [pulsed, setPulsed] = useState(false)
  const { scrollYProgress } = useScroll({ target: railRef, offset: ['start 0.85', 'end 0.55'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 26 })

  return (
    <div className="gateflow" ref={railRef}>
      <motion.span className="railline" style={reduce ? undefined : { scaleY }} aria-hidden="true" />

      <motion.div className="phase done" {...rise()}>
        <span className="tag">Phase 1, complete</span>
        <h4>100 percent human review</h4>
        <p>Every AI verdict sat behind a human underwriter. This phase existed to generate the evidence, not to save time.</p>
      </motion.div>

      <motion.div
        className={'gate cleared' + (pulsed ? ' pulse' : '')}
        {...rise(0.08)}
        onViewportEnter={() => setPulsed(true)}
      >
        <span className="gtag">Gate cleared, review coverage allowed to decrease</span>
        <span className="gchip">LLM to underwriter agreement: 95 percent, against a 92 percent bar</span>
        <span className="gchip">Dangerous miss rate, AI more lenient than a human: targeted at near zero</span>
        <p className="gnote">The dangerous miss rate is the number I watch hardest, because it measures harm, not just accuracy.</p>
      </motion.div>

      <motion.div className="phase now" {...rise(0.12)}>
        <span className="tag">Phase 2, live now</span>
        <h4>Risk tiered review</h4>
        <p>Lower risk tiers carry lighter review while high risk cases keep a full human pass. Coverage came down only because the gate above cleared. Trust was earned, not assumed.</p>
      </motion.div>

      <motion.div className="gate pending" {...rise(0.16)}>
        <span className="gtag">Next gate, in active buildout, not yet live</span>
        <span className="gchip">Fairness disparity thresholds across groups</span>
        <span className="gchip">Verdict to transcript traceability, every decision explainable back to its evidence</span>
      </motion.div>

      <motion.div className="phase next" {...rise(0.2)}>
        <span className="tag">Phase 3, planned</span>
        <h4>Wider automation, only if earned</h4>
        <p>The next reduction in review coverage waits on the gate above. Both requirements are in buildout right now, and I would rather say that plainly than claim them early.</p>
      </motion.div>
    </div>
  )
}
