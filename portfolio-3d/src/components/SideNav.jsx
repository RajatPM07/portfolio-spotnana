import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'

const LINKS = [
  { href: '#ria', label: 'Ria' },
  { href: '#tripsecure', label: 'TripSecure+' },
  { href: '#elevate', label: 'Elevate' },
  { href: '#builder', label: 'Builder' },
  { href: '#contact', label: 'Contact' },
]

export default function SideNav() {
  const [active, setActive] = useState('')
  const { scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 26 })

  useEffect(() => {
    const sections = LINKS.map((l) => document.querySelector(l.href)).filter(Boolean)
    const so = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive('#' + e.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    sections.forEach((s) => so.observe(s))
    return () => so.disconnect()
  }, [])

  return (
    <>
      <nav className="sidenav" aria-label="Sections">
        <div className="progress" aria-hidden="true">
          <motion.span style={{ scaleY }} />
        </div>
        <div>
          <span className="brand">Rajat Sharma</span>
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className={active === l.href ? 'active' : ''}>
              {l.label}
            </a>
          ))}
        </div>
      </nav>
      <div className="topbar">
        <span className="brand">Rajat Sharma</span>
        <span className="tlinks">
          <a href="#ria">Work</a>
          <a href="#builder">Builder</a>
          <a href="#contact">Contact</a>
        </span>
      </div>
    </>
  )
}
