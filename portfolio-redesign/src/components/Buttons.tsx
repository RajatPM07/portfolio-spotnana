import type { ReactNode } from 'react'

export function ContactButton({ children = 'Email me', href = 'mailto:sharma.rajat70@gmail.com' }: { children?: ReactNode; href?: string }) {
  return (
    <a
      href={href}
      className="inline-block rounded-full px-8 py-3 text-xs font-medium uppercase tracking-widest text-white transition-transform duration-200 hover:scale-105 sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base"
      style={{
        background: 'linear-gradient(123deg, #04161c 7%, #0a7f99 37%, #25c4e4 72%, #ffb339 100%)',
        // The white inner ring is a shadow, not an outline, so :focus-visible can draw its own ring.
        boxShadow: '0px 4px 4px rgba(37,196,228,0.25), 4px 4px 12px rgba(37,196,228,0.55) inset, 0 0 0 2px #fff inset',
      }}
    >
      {children}
    </a>
  )
}

export function GhostButton({ children, href }: { children: ReactNode; href: string }) {
  const external = href.startsWith('http')
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="inline-block rounded-full border-2 border-mist px-8 py-3 text-xs font-medium uppercase tracking-widest text-mist transition-colors duration-200 hover:bg-mist/10 sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base"
    >
      {children}
    </a>
  )
}
