import FadeIn from '../components/FadeIn'
import { ContactButton } from '../components/Buttons'

export default function ContactSection() {
  return (
    <footer id="contact" className="rounded-t-[40px] bg-[#131517] px-5 pb-8 pt-20 sm:rounded-t-[50px] sm:px-8 sm:pt-24 md:rounded-t-[60px] md:px-10 md:pt-32">
      <FadeIn>
        <h2 className="hero-heading text-center font-black uppercase leading-[0.95] tracking-tight" style={{ fontSize: 'clamp(2.5rem, 10vw, 140px)' }}>
          Let&apos;s build something trustworthy
        </h2>
      </FadeIn>
      <FadeIn delay={0.15}>
        <div className="mt-12 flex flex-col items-center gap-8 md:mt-16">
          <ContactButton>Email me</ContactButton>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-base font-normal uppercase tracking-wide text-mist md:text-lg">
            <a className="hover:opacity-70" href="mailto:sharma.rajat70@gmail.com">sharma.rajat70@gmail.com</a>
            <a className="hover:opacity-70" href="tel:+917358467199">+91 7358 467199</a>
            <a className="hover:opacity-70" href="https://www.linkedin.com/in/rajat-sharma-70" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a className="hover:opacity-70" href="https://github.com/RajatPM07" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
          <p className="text-base font-normal text-mist/80">Resume available on request.</p>
        </div>
      </FadeIn>
      <div className="mt-16 flex flex-wrap justify-between gap-3 border-t border-white/15 pt-6 text-xs font-normal uppercase tracking-widest text-mist/70">
        <span>Rajat Sharma</span>
        <span>Mumbai, India</span>
      </div>
    </footer>
  )
}
