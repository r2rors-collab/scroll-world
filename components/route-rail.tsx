'use client'

export function RouteRail({
  activeIndex,
  total,
  labels,
  onJump,
}: {
  activeIndex: number
  total: number
  labels: string[]
  onJump: (i: number) => void
}) {
  return (
    <nav
      aria-label="Story sections"
      className="fixed right-5 top-1/2 z-[320] hidden -translate-y-1/2 flex-col items-end gap-3 md:flex"
    >
      <span className="eyebrow mb-2 text-ink/50" style={{ letterSpacing: '0.2em' }}>
        {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
      {labels.map((label, i) => {
        const active = i === activeIndex
        return (
          <button
            key={label}
            onClick={() => onJump(i)}
            className="group flex items-center gap-3 outline-none"
            aria-current={active ? 'true' : undefined}
          >
            <span
              className="eyebrow whitespace-nowrap transition-all duration-300"
              style={{
                opacity: active ? 1 : 0,
                transform: active ? 'translateX(0)' : 'translateX(8px)',
                color: '#2a1f28',
                letterSpacing: '0.18em',
              }}
            >
              {label}
            </span>
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width: active ? 11 : 7,
                height: active ? 11 : 7,
                backgroundColor: active ? '#c9a25f' : 'rgba(42,31,40,0.28)',
                boxShadow: active ? '0 0 0 4px rgba(201,162,95,0.18)' : 'none',
              }}
            />
          </button>
        )
      })}
    </nav>
  )
}
