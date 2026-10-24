import type { ReactNode } from 'react'

export type Tone = 'live' | 'pending' | 'target'

const toneClass: Record<Tone, string> = {
  live: 'border-teal text-teal',
  pending: 'border-rust text-rust',
  target: 'border-ink/40 text-ink-soft',
}

export function Tag({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border bg-raised px-3 py-1 font-mono text-xs uppercase tracking-wide ${toneClass[tone]}`}>
      <span aria-hidden className={`h-2 w-2 rounded-full ${tone === 'live' ? 'bg-teal' : tone === 'pending' ? 'border-2 border-rust' : 'border-2 border-ink-soft'}`} />
      {children}
    </span>
  )
}

export function Phase({ tag, tone, title, text }: { tag: string; tone: Tone; title: string; text: string }) {
  return (
    <div className="rounded-xl border border-ink/15 bg-raised p-5">
      <Tag tone={tone}>{tag}</Tag>
      <div className="mt-3 text-xl font-semibold text-ink">{title}</div>
      <p className="mt-1 text-[17px] leading-relaxed text-ink">{text}</p>
    </div>
  )
}

export function Gate({ title, items }: { title: string; items: { text: string; tone: Tone; tag: string }[] }) {
  return (
    <div className="ml-4 border-l-2 border-dashed border-ink/30 py-4 pl-5 sm:ml-6">
      <div className="font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">{title}</div>
      <ul className="mt-3 flex flex-col gap-2">
        {items.map((it) => (
          <li key={it.text} className={`rounded-lg border border-dashed bg-paper/60 px-4 py-3 ${it.tone === 'live' ? 'border-teal' : it.tone === 'pending' ? 'border-rust' : 'border-ink/40'}`}>
            <div className="text-[17px] leading-snug text-ink">{it.text}</div>
            <div className="mt-2">
              <Tag tone={it.tone}>{it.tag}</Tag>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
