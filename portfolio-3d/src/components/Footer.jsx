import { motion } from 'motion/react'
import { rise } from '../anim.js'

export default function Footer() {
  return (
    <footer id="contact">
      <div className="wrap">
        <motion.h2 {...rise()}>
          Let's build something <em>trustworthy</em>.
        </motion.h2>
        <motion.p {...rise(0.06)} style={{ maxWidth: 520, margin: '0 auto', color: 'var(--muted)' }}>
          Based in Mumbai, India. Happy to walk through any of this work in as much depth as you would like.
        </motion.p>
        <motion.div className="contact" {...rise(0.12)}>
          <a className="chip" href="mailto:sharma.rajat70@gmail.com">&#9993; sharma.rajat70@gmail.com</a>
          <a className="chip" href="tel:+917358467199">&#128222; +91 7358 467199</a>
          <a className="chip" href="https://www.linkedin.com/in/rajat-sharma-70/" target="_blank" rel="noopener noreferrer">in&nbsp; LinkedIn</a>
          <a className="chip" href="https://github.com/RajatPM07" target="_blank" rel="noopener noreferrer">&#11089; github.com/RajatPM07</a>
        </motion.div>
        <motion.p className="resume" {...rise(0.18)}>
          Prefer a traditional format? A resume is available as an optional download,{' '}
          <a href="mailto:sharma.rajat70@gmail.com?subject=Resume%20request">just ask</a> and I will send it right over.
        </motion.p>
      </div>
    </footer>
  )
}
