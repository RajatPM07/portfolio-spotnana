import { MotionConfig } from 'motion/react'
import SideNav from './components/SideNav.jsx'
import Hero from './components/Hero.jsx'
import { CaseRia, CaseTripSecure, CaseElevate } from './components/Cases.jsx'
import Builder from './components/Builder.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <SideNav />
      <Hero />
      <CaseRia />
      <CaseTripSecure />
      <CaseElevate />
      <Builder />
      <Footer />
    </MotionConfig>
  )
}
