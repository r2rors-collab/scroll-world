'use client'

import { scenes } from '@/lib/scenes'

export function SceneCopy({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-[300]">
      {/* legibility scrim — cream fade from the left, transparent over the scene */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(100deg, rgba(247,241,232,0.94) 0%, rgba(247,241,232,0.82) 24%, rgba(247,241,232,0.45) 44%, rgba(247,241,232,0) 62%)',
        }}
      />
      {/* bottom fade for mobile where copy sits low */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 md:hidden"
        style={{
          background:
            'linear-gradient(to top, rgba(247,241,232,0.96) 8%, rgba(247,241,232,0.55) 55%, rgba(247,241,232,0) 100%)',
        }}
      />
      <div className="relative mx-auto flex h-full max-w-[1400px] items-end px-6 pb-16 md:items-center md:px-12 md:pb-0">
        <div className="relative w-full max-w-xl">
          {scenes.map((s, i) => {
            const active = i === activeIndex
            return (
              <div
                key={s.id}
                aria-hidden={!active}
                className="transition-all duration-700 ease-out"
                style={{
                  position: active ? 'relative' : 'absolute',
                  inset: active ? undefined : 0,
                  opacity: active ? 1 : 0,
                  transform: active ? 'translateY(0)' : 'translateY(18px)',
                  pointerEvents: active ? 'auto' : 'none',
                }}
              >
                <p
                  className="eyebrow mb-5 text-plum-soft"
                  style={{ color: s.accent }}
                >
                  {s.eyebrow}
                </p>

                <h2 className="font-display text-5xl font-medium leading-[0.98] text-ink text-balance md:text-7xl">
                  {s.title}
                  {s.titleEmphasis ? (
                    <>
                      <br />
                      <span className="italic">{s.titleEmphasis}</span>
                    </>
                  ) : null}
                </h2>

                <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-ink/70 md:text-lg">
                  {s.body}
                </p>

                {s.tags ? (
                  <div className="mt-8 flex flex-wrap gap-2.5">
                    {s.tags.map((t) => (
                      <span
                        key={t}
                        className="eyebrow rounded-full border border-ink/20 px-4 py-2 text-ink/75 backdrop-blur-sm"
                        style={{ letterSpacing: '0.16em' }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}

                {s.cta ? (
                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <a
                      href="mailto:hello@veloura.studio"
                      className="rounded-full px-7 py-3.5 text-sm font-semibold text-cream transition-transform hover:scale-[1.03]"
                      style={{ backgroundColor: s.accent }}
                    >
                      Email the studio ↗
                    </a>
                    <a
                      href="#top"
                      className="text-sm font-semibold text-ink/60 underline-offset-4 hover:text-ink hover:underline"
                    >
                      Back to top
                    </a>
                  </div>
                ) : null}

                {i === 0 ? (
                  <div className="mt-10 flex items-center gap-3 text-ink/50">
                    <span className="eyebrow">Scroll to explore</span>
                    <span className="h-px w-10 bg-ink/30" />
                    <span className="animate-bounce text-lg">↓</span>
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
