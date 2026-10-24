import { ArrowUpRight } from 'lucide-react'
import FadeIn from '../components/FadeIn'

const projects = [
  {
    name: 'Lenny Live',
    win: 'First place, Lenny\'s Data Competition 2026',
    text: 'A Chrome extension that works as an ambient AI mentor over Lenny Rachitsky\'s newsletter and podcast transcripts.',
    chips: ['Chrome extension', 'RAG', 'Supabase pgvector', 'ElevenLabs', 'Agentic orchestration'],
    links: [
      { label: 'Live', href: 'https://landing-mu-nine-76.vercel.app/' },
      { label: 'GitHub', href: 'https://github.com/RajatPM07/LennyLive' },
    ],
  },
  {
    name: 'personal-finance-agent',
    win: 'Single user production deployment, runs continuously',
    text: 'Solo Python build: Gmail data into Supabase, surfaced through a Telegram bot I use daily.',
    chips: ['Python', 'Gmail', 'Supabase', 'Telegram bot'],
    links: [{ label: 'GitHub', href: 'https://github.com/RajatPM07/personal-finance-agent' }],
  },
  {
    name: 'Bima Brain',
    win: 'Top 20, Sarvam Epoch Buildathon by GrowthX, July 2026',
    text: 'Team build. A voice agent that runs adaptive medical underwriting calls in Hindi or English, with consent before any premium is charged.',
    chips: ['Sarvam AI', 'Voice underwriting', 'Hindi and English'],
    links: [{ label: 'Project', href: 'https://built.growthx.club/projects/bima-brain-voice-underwriting-for-every-indian-language' }],
  },
]

export default function BuilderSection() {
  return (
    <section id="builder" className="relative -mt-10 rounded-t-[40px] bg-void px-5 py-20 shadow-[0_-18px_40px_-20px_rgba(0,0,0,0.6)] sm:px-8 sm:py-24 md:px-10 md:py-32">
      <FadeIn>
        <h2 className="hero-heading mb-6 text-center font-black uppercase leading-none tracking-tight" style={{ fontSize: 'clamp(2.5rem, 9vw, 120px)' }}>
          Builder
        </h2>
        <p className="mx-auto mb-16 max-w-xl text-center text-lg font-normal text-mist/90 md:mb-24 md:text-xl">I ship things myself, outside the day job.</p>
      </FadeIn>
      <div className="mx-auto grid max-w-[1400px] gap-5 md:grid-cols-3">
        {projects.map((p, i) => (
          <FadeIn key={p.name} delay={i * 0.1}>
            <article className="flex h-full flex-col gap-4 rounded-[40px] border-2 border-mist p-6 md:p-8">
              <h3 className="break-words text-2xl font-black uppercase text-mist md:text-2xl lg:text-3xl">{p.name}</h3>
              <div className="text-sm font-medium uppercase tracking-wide text-alert">{p.win}</div>
              <p className="flex-1 text-base font-normal leading-relaxed text-mist/90">{p.text}</p>
              <div className="flex flex-wrap gap-2">
                {p.chips.map((c) => (
                  <span key={c} className="rounded-full border border-white/20 px-3 py-1 text-xs font-normal uppercase tracking-wide text-mist">
                    {c}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                {p.links.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full border-2 border-mist px-5 py-2 text-sm font-medium uppercase tracking-widest text-mist transition-colors hover:bg-mist/10">
                    {l.label} <ArrowUpRight size={16} />
                  </a>
                ))}
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
