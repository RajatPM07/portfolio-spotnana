import { lazy, Suspense } from 'react'
import HeroSection from './sections/HeroSection'
import WorkSummary from './sections/WorkSummary'
import CaseStudies from './sections/CaseStudies'
import BuilderSection from './sections/BuilderSection'
import AboutSection from './sections/AboutSection'
import ContactSection from './sections/ContactSection'

// Local comparison only: open /?hero=previous in dev. Dead code in production builds.
const HeroPrevious = import.meta.env.DEV ? lazy(() => import('./sections/HeroSectionPrevious')) : null

export default function App() {
  const showPrevious = import.meta.env.DEV && new URLSearchParams(window.location.search).get('hero') === 'previous'

  return (
    <main style={{ background: '#0C0C0C', overflowX: 'clip' }}>
      {showPrevious && HeroPrevious ? (
        <Suspense fallback={null}>
          <HeroPrevious />
        </Suspense>
      ) : (
        <HeroSection />
      )}
      <WorkSummary />
      <CaseStudies />
      <BuilderSection />
      <AboutSection />
      <ContactSection />
    </main>
  )
}
