import { motion, useReducedMotion, useTransform } from 'motion/react'
import { flipIn } from '../anim.js'
import { SectionHead } from './Blocks.jsx'
import { useTilt } from '../hooks/useTilt.js'

function ProjectCard({ delay, children }) {
  const reduce = useReducedMotion()
  const tilt = useTilt(6)
  const gx = useTransform(tilt.px, [0, 1], ['-28%', '28%'])
  const gy = useTransform(tilt.py, [0, 1], ['-28%', '28%'])

  return (
    <motion.div
      className="project"
      {...flipIn(delay)}
      style={reduce ? undefined : { rotateX: tilt.rotateX, rotateY: tilt.rotateY }}
      onPointerMove={reduce ? undefined : tilt.onPointerMove}
      onPointerLeave={reduce ? undefined : tilt.onPointerLeave}
    >
      {!reduce && <motion.div className="glare" style={{ x: gx, y: gy }} aria-hidden="true" />}
      {children}
    </motion.div>
  )
}

export default function Builder() {
  return (
    <section id="builder">
      <div className="wrap">
        <SectionHead
          label="Off the Clock"
          title="I ship things myself"
          sub="Because the fastest way to have an opinion about AI products is to build them."
        />

        <div className="projects">
          <ProjectCard delay={0}>
            <h4>Lenny Live</h4>
            <div className="win">&#127942; First place, Lenny's Data Competition 2026</div>
            <p>
              A Chrome extension built as an ambient AI mentor. It watches your active workspace and surfaces contextual product advice over a curated corpus of Lenny Rachitsky's newsletter and podcast transcripts, spoken in a cloned voice, at the moment you are actually inside the problem.
            </p>
            <div className="stack">Chrome extension &middot; RAG via Supabase pgvector &middot; ElevenLabs voice synthesis &middot; agentic orchestration</div>
            <div className="plinks">
              <a className="btn" href="https://landing-mu-nine-76.vercel.app/" target="_blank" rel="noopener noreferrer">See it live</a>
              <a className="btn ghost" href="https://github.com/RajatPM07/LennyLive" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </ProjectCard>
          <ProjectCard delay={0.1}>
            <h4>personal-finance-agent</h4>
            <div className="win">Single user production deployment, runs continuously</div>
            <p>
              A solo Python build that uses Gmail integration to fetch and parse financial data into a Supabase store, surfaced through a Telegram bot for personal cash flow tracking. Not a demo, a system I rely on every day.
            </p>
            <div className="stack">Python &middot; Gmail integration &middot; Supabase &middot; Telegram bot</div>
            <div className="plinks">
              <a className="btn ghost" href="https://github.com/RajatPM07/personal-finance-agent" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </ProjectCard>
        </div>
      </div>
    </section>
  )
}
