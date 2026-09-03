import { SiteHeader } from '@/components/site-header'
import { ScrollWorld } from '@/components/scroll-world'

export default function Page() {
  return (
    <main id="top" className="relative bg-background">
      <SiteHeader />

      {/* top tagline marquee strip — sits as a hairline band under the header */}
      <div className="pointer-events-none fixed inset-x-0 top-[74px] z-[330] hidden overflow-hidden border-y border-ink/10 bg-cream/70 py-2 backdrop-blur-sm md:block">
        <div className="flex w-max animate-marquee">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center">
              {[
                'Balloon gardens',
                'Organic arches',
                'Freestanding art',
                'Full event styling',
              ].map((t) => (
                <span
                  key={t}
                  className="eyebrow flex items-center gap-6 px-6 text-ink/35"
                  style={{ letterSpacing: '0.2em' }}
                >
                  {t}
                  <span className="text-gold">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <ScrollWorld />

      {/* fixed corner tag, mirrors the reference "story preview" chip */}
      <div className="pointer-events-none fixed bottom-6 left-6 z-[330] hidden md:block">
        <span className="eyebrow text-ink/40" style={{ letterSpacing: '0.2em' }}>
          Interactive story · Peterborough, Ontario
        </span>
      </div>
    </main>
  )
}
