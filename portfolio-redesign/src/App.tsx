import { lazy, Suspense } from 'react'
import HeroA from './sections/HeroA'
import HeroB from './sections/HeroB'
import HeroC from './sections/HeroC'
import WorkSummary from './sections/WorkSummary'
import CaseStudies from './sections/CaseStudies'
import BuilderSection from './sections/BuilderSection'
import AboutSection from './sections/AboutSection'
import ContactSection from './sections/ContactSection'

// The earlier frameless hero, kept for comparison. Dev only, so it never ships.
const HeroPrevious = import.meta.env.DEV ? lazy(() => import('./sections/HeroSectionPrevious')) : null

// Which hero is the default. Build with VITE_HERO=a or b to change it. C (video loop) is the default.
// In dev, ?hero=a, ?hero=b, ?hero=c or ?hero=previous overrides it. No switcher is shown on the page.
function pickHero(): 'a' | 'b' | 'c' | 'previous' {
  const env = import.meta.env.VITE_HERO
  const fallback = env === 'a' || env === 'b' ? env : 'c'
  if (!import.meta.env.DEV) return fallback
  const q = new URLSearchParams(window.location.search).get('hero')
  return q === 'a' || q === 'b' || q === 'c' || q === 'previous' ? q : fallback
}

export default function App() {
  const hero = pickHero()

  return (
    <main style={{ background: '#0C0C0C', overflowX: 'clip' }}>
      {hero === 'previous' && HeroPrevious ? (
        <Suspense fallback={null}>
          <HeroPrevious />
        </Suspense>
      ) : hero === 'b' ? (
        <HeroB />
      ) : hero === 'a' ? (
        <HeroA />
      ) : (
        <HeroC />
      )}
      <WorkSummary />
      <CaseStudies />
      <BuilderSection />
      <AboutSection />
      <ContactSection />
    </main>
  )
}
