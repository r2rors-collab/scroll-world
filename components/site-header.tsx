export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-[340] bg-cream/70 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-12">
        <a href="#top" className="flex flex-col leading-none">
          <span className="font-display text-2xl font-semibold tracking-tight text-ink">
            Veloura
          </span>
          <span className="eyebrow mt-1 text-ink/55" style={{ letterSpacing: '0.28em' }}>
            Balloon Studio
          </span>
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {['Experience', 'Events', 'Journal'].map((item) => (
            <a
              key={item}
              href="#top"
              className="eyebrow text-ink/70 transition-colors hover:text-ink"
              style={{ letterSpacing: '0.18em' }}
            >
              {item}
            </a>
          ))}
        </nav>

        <a
          href="mailto:hello@veloura.studio"
          className="rounded-full border border-ink/25 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-ink transition-colors hover:border-ink hover:bg-ink hover:text-cream"
        >
          Design my event ↗
        </a>
      </div>
    </header>
  )
}
