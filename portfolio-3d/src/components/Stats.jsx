import { useEffect, useRef } from 'react'
import { animate, motion, useInView, useReducedMotion } from 'motion/react'
import { flipIn } from '../anim.js'

// Animated number that counts up from zero when it scrolls into view.
export function Count({ value, decimals = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!inView || reduce) return
    const controls = animate(0, value, {
      duration: 1.2,
      ease: 'easeOut',
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = v.toFixed(decimals)
      },
    })
    return () => controls.stop()
  }, [inView, reduce, value, decimals])

  return (
    <span ref={ref} className="cnt">
      {reduce ? value.toFixed(decimals) : (0).toFixed(decimals)}
    </span>
  )
}

// stats: [{ num: <jsx>, label: string }]
export default function Stats({ items }) {
  return (
    <div className="stats">
      {items.map((s, i) => (
        <motion.div className="stat" key={s.label} {...flipIn(i * 0.08)}>
          <div className="num">{s.num}</div>
          <div className="lbl">{s.label}</div>
        </motion.div>
      ))}
    </div>
  )
}
