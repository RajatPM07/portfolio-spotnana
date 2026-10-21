import FadeIn from '../components/FadeIn'

export default function AboutSection() {
  return (
    <section id="about" className="bg-void px-5 py-16 sm:px-8 md:px-10 md:py-24">
      <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[5fr_7fr] lg:gap-14">
        <FadeIn duration={0.5}>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight" style={{ fontSize: 'clamp(2.5rem, 9vw, 120px)' }}>
            About
          </h2>
        </FadeIn>
        <FadeIn duration={0.5} delay={0.1}>
          <p className="max-w-2xl text-lg font-normal leading-relaxed text-mist md:text-xl">
            Senior product manager at ICICI Lombard General Insurance in Mumbai, with about seven to eight years across InsurTech, AdTech and AI and ML. Before that I was a PM for claims experience at Acko, an AdTech PM at Mediaqart, and a product analyst at SHL. I take products from a blank page to production, and I care as much about governance and measured results as about shipping.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
