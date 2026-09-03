'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { scenes } from '@/lib/scenes'
import { SceneCopy } from './scene-copy'
import { RouteRail } from './route-rail'

// scroll length (in viewport heights) devoted to each scene
const SEG = 1.15

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

export function ScrollWorld() {
  const stageRef = useRef<HTMLDivElement>(null)
  const sceneRefs = useRef<(HTMLDivElement | null)[]>([])
  const targetProgress = useRef(0) // raw, from scroll
  const currentProgress = useRef(0) // smoothed
  const rafId = useRef<number>(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [reduced, setReduced] = useState(false)

  const n = scenes.length

  const readScroll = useCallback(() => {
    const doc = document.documentElement
    const max = doc.scrollHeight - window.innerHeight
    const top = window.scrollY || doc.scrollTop
    const seg = window.innerHeight * SEG
    targetProgress.current = clamp(top / seg, 0, n - 1)
    // keep the max in sync for edge safety (unused var guard)
    void max
  }, [n])

  const paint = useCallback(() => {
    const g = currentProgress.current

    for (let i = 0; i < n; i++) {
      const el = sceneRefs.current[i]
      if (!el) continue
      const d = g - i // <0 incoming (ahead), 0 centered, >0 flying past

      if (d <= -1.05 || d >= 1.15) {
        el.style.opacity = '0'
        el.style.visibility = 'hidden'
        continue
      }
      el.style.visibility = 'visible'

      let scale: number
      let opacity: number
      let ty: number
      let blur: number

      if (reduced) {
        const near = Math.abs(d) < 0.5
        opacity = near ? 1 : 0
        scale = 1
        ty = 0
        blur = 0
      } else if (d < 0) {
        // incoming: rise from the distance toward the camera
        const t = easeInOutCubic(clamp(d + 1, 0, 1))
        scale = lerp(0.68, 1.0, t)
        opacity = clamp(t * 1.15, 0, 1)
        ty = lerp(-7, 0, t)
        blur = lerp(7, 0, t)
      } else {
        // outgoing: camera flies into/past the scene
        const t = easeInOutCubic(clamp(d, 0, 1))
        scale = lerp(1.0, 1.5, t)
        opacity = clamp(1 - t * 1.15, 0, 1)
        ty = lerp(0, 5, t)
        blur = lerp(0, 5, t)
      }

      el.style.opacity = opacity.toFixed(3)
      el.style.transform = `translate3d(-50%, calc(-50% + ${ty.toFixed(2)}vh), 0) scale(${scale.toFixed(4)})`
      el.style.filter = blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : 'none'
      el.style.zIndex = String(100 + Math.round(d * 20))
    }
  }, [n, reduced])

  // rAF smoothing loop
  useEffect(() => {
    const tick = () => {
      const target = targetProgress.current
      const cur = currentProgress.current
      const next = reduced ? target : lerp(cur, target, 0.12)
      currentProgress.current = Math.abs(next - target) < 0.0004 ? target : next
      paint()

      const idx = clamp(Math.round(currentProgress.current), 0, n - 1)
      setActiveIndex((prev) => (prev !== idx ? idx : prev))

      rafId.current = requestAnimationFrame(tick)
    }
    rafId.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId.current)
  }, [paint, n, reduced])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReduced(mq.matches)
    apply()
    mq.addEventListener('change', apply)

    readScroll()
    const onScroll = () => readScroll()
    const onResize = () => readScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      mq.removeEventListener('change', apply)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [readScroll])

  const jumpTo = useCallback((i: number) => {
    const seg = window.innerHeight * SEG
    window.scrollTo({ top: i * seg, behavior: 'smooth' })
  }, [])

  // total scroll height: N segments + one viewport of trailing dwell
  const spacerHeight = useMemo(() => `${(n - 1) * SEG * 100 + 100}vh`, [n])

  return (
    <>
      {/* fixed camera stage */}
      <div
        ref={stageRef}
        aria-hidden="true"
        className="fixed inset-0 overflow-hidden"
        style={{
          background:
            'radial-gradient(120% 90% at 50% 8%, #fbf6ee 0%, #f7f1e8 46%, #efe4d4 100%)',
        }}
      >
        {/* soft vignette */}
        <div
          className="pointer-events-none absolute inset-0 z-[400]"
          style={{
            background:
              'radial-gradient(130% 100% at 50% 44%, transparent 52%, rgba(42,31,40,0.10) 100%)',
          }}
        />

        {scenes.map((s, i) => (
          <div
            key={s.id}
            ref={(el) => {
              sceneRefs.current[i] = el
            }}
            className="absolute left-1/2 top-1/2 will-change-transform"
            style={{
              width: 'min(92vw, 1150px)',
              transform: 'translate3d(-50%, -50%, 0) scale(1)',
              opacity: 0,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.image || '/placeholder.svg'}
              alt={`${s.label} — a Veloura balloon diorama scene`}
              className="h-auto w-full select-none"
              draggable={false}
              style={{
                filter: 'drop-shadow(0 40px 60px rgba(42,31,40,0.22))',
              }}
            />
          </div>
        ))}
      </div>

      {/* pinned copy for the active scene */}
      <SceneCopy activeIndex={activeIndex} />

      {/* right-side route rail */}
      <RouteRail
        activeIndex={activeIndex}
        total={n}
        labels={scenes.map((s) => s.label)}
        onJump={jumpTo}
      />

      {/* scroll spacer that drives the whole flight */}
      <div style={{ height: spacerHeight }} />
    </>
  )
}
