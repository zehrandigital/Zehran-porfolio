'use client'

import { useEffect, useRef, useState } from 'react'
import type { Tone } from '@/lib/site-data'

const toneGradient: Record<Tone, string> = {
  primary: 'linear-gradient(180deg, #6f95ff, #3a6df0)',
  secondary: 'linear-gradient(180deg, #e0b673, #c9974f)',
  accent: 'linear-gradient(180deg, #c99461, #9c6b3e)',
  foreground: 'linear-gradient(180deg, #d7d9d0, #9aa08c)',
  muted: 'linear-gradient(180deg, #7d90b8, #4d5a76)',
}

export function ChannelChart({
  channels,
}: {
  channels: { name: string; value: number; tone: Tone }[]
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const max = Math.max(...channels.map((c) => c.value))

  return (
    <div ref={ref} className="chart-scene mx-auto w-full max-w-2xl px-6 py-16">
      <div className="chart-floor relative flex h-64 items-end justify-center gap-10 md:gap-16">
        <div className="grid-floor" />
        {channels.map((c, i) => (
          <div key={c.name} className="relative flex w-16 flex-col items-center gap-3 md:w-20">
            <span className="font-mono-tight text-sm font-bold text-foreground" style={{ transform: 'translateZ(24px)' }}>
              {c.value}x
            </span>
            <div
              className="bar-3d w-full"
              style={
                {
                  '--h': inView ? `${(c.value / max) * 180}px` : '0px',
                  '--depth': i * 6,
                  background: toneGradient[c.tone],
                } as React.CSSProperties
              }
            />
            <span
              className="font-mono-tight whitespace-nowrap text-[10px] uppercase tracking-widest text-muted-foreground"
              style={{ transform: 'translateZ(24px)' }}
            >
              {c.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
