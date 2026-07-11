import { motion } from 'motion/react'
import { rise, swingIn } from '../anim.js'

// facts: [{ dt, dd }]
export function Facts({ items }) {
  return (
    <motion.div className="facts" {...rise()}>
      {items.map((f) => (
        <div className="fact" key={f.dt}>
          <dt>{f.dt}</dt>
          <dd>{f.dd}</dd>
        </div>
      ))}
    </motion.div>
  )
}

export function Callout({ lead, children }) {
  return (
    <motion.div className="callout" {...rise()}>
      <strong>{lead}</strong> {children}
    </motion.div>
  )
}

export function SectionHead({ label, title, sub }) {
  return (
    <>
      <motion.div className="section-label" {...rise()}>{label}</motion.div>
      <motion.h2 {...rise(0.06)}>{title}</motion.h2>
      <motion.p className="sub" {...rise(0.12)}>{sub}</motion.p>
    </>
  )
}

export function H3({ n, children }) {
  return (
    <motion.h3 {...rise()}>
      <span className="n">{n}</span> {children}
    </motion.h3>
  )
}

const FLOW = [
  { fk: 'Inputs', h: '10 plus customer signals', p: 'Tenure, claim history, engagement, policy type, and more' },
  { fk: 'Model', h: 'One engine, two predictions', p: 'Churn risk and cross sell propensity together, 0.82 AUC-ROC in production' },
  { fk: 'Decision', h: 'Next best action', p: 'Assigned to every customer at portfolio scale' },
  { fk: 'Surface', h: '1 click cross sell in checkout', p: 'ML cohort targeted, zero cannibalization of the core journey' },
]

export function PipelineFlow() {
  return (
    <div className="flow">
      {FLOW.map((s, i) => (
        <div key={s.fk} style={{ display: 'contents' }}>
          {i > 0 && <div className="farrow">&rarr;</div>}
          <motion.div className="fstep" {...swingIn(i * 0.1)}>
            <div className="fk">{s.fk}</div>
            <h5>{s.h}</h5>
            <p>{s.p}</p>
          </motion.div>
        </div>
      ))}
    </div>
  )
}
