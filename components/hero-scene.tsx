'use client'

import { useRef } from 'react'
import { ArrowUpRight, TrendingUp } from 'lucide-react'
import type { Tone } from '@/lib/site-data'
import { toneText } from '@/lib/utils'

export function HeroScene({
  liveLabel,
  panelTitle,
  panelSubtitle,
  bars,
  kpis,
  revenueBadge,
  platformBadge,
  spendBadge,
}: {
  liveLabel: string
  panelTitle: string
  panelSubtitle: string
  bars: number[]
  kpis: { value: string; label: string; tone: Tone }[]
  revenueBadge: { value: string; label: string }
  platformBadge: { value: string; label: string }
  spendBadge: { value: string; label: string }
}) {
  const sceneRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const scene = sceneRef.current
    const inner = innerRef.current
    if (!scene || !inner) return
    const rect = scene.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const rotateY = (px - 0.5) * 18
    const rotateX = (0.5 - py) * 14
    inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  const handleLeave = () => {
    const inner = innerRef.current
    if (!inner) return
    inner.style.transform = 'rotateX(4deg) rotateY(-10deg)'
  }

  return (
    <div
      ref={sceneRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="scene-3d relative mx-auto flex aspect-square w-full max-w-[520px] items-center justify-center"
    >
      <div className="glow-blob absolute inset-[10%] rounded-full" />
      <div className="hero-orbit absolute inset-[6%] rounded-full border border-primary/15" />
      <div className="hero-orbit-reverse absolute inset-[16%] rounded-full border border-secondary/15" />

      <div
        ref={innerRef}
        className="scene-3d-inner relative h-[78%] w-[86%]"
        style={{ transform: 'rotateX(4deg) rotateY(-10deg)' }}
      >
        <div className="dashboard-card absolute inset-0 flex flex-col justify-between p-6" style={{ transform: 'translateZ(0px)' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono-tight text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{panelTitle}</p>
              <p className="mt-1 text-sm font-semibold text-foreground">{panelSubtitle}</p>
            </div>
            <span className="flex items-center gap-1.5 rounded-full border border-secondary/40 bg-secondary/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-secondary">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary pulse-dot" /> {liveLabel}
            </span>
          </div>

          <div className="flex h-28 items-end gap-2.5" style={{ transform: 'translateZ(20px)' }}>
            {bars.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-md"
                style={{
                  height: `${h}%`,
                  background: i === bars.length - 3
                    ? 'linear-gradient(180deg, #5c8dff, var(--primary))'
                    : 'linear-gradient(180deg, rgba(58,109,240,.55), rgba(58,109,240,.18))',
                }}
              />
            ))}
          </div>

          <div className="grid grid-cols-3 gap-3 border-t border-white/10 pt-4" style={{ transform: 'translateZ(14px)' }}>
            {kpis.map((kpi) => (
              <div key={kpi.label}>
                <p className={`font-mono-tight text-lg font-bold ${toneText(kpi.tone)}`}>{kpi.value}</p>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{kpi.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* floating badge: revenue */}
        <div
          className="float-card float-slow absolute -right-8 -top-8 flex items-center gap-2 px-4 py-3 text-xs"
          style={{ transform: 'translateZ(90px)' }}
        >
          <TrendingUp size={16} className="text-secondary" />
          <div>
            <p className="font-mono-tight font-semibold text-foreground">{revenueBadge.value}</p>
            <p className="text-[10px] text-muted-foreground">{revenueBadge.label}</p>
          </div>
        </div>

        {/* floating badge: platform */}
        <div
          className="float-card float-slower absolute -left-14 top-1/2 -translate-y-1/2 px-4 py-3 text-xs"
          style={{ transform: 'translateZ(70px) translateY(-50%)' }}
        >
          <div className="flex items-center gap-2">
            <ArrowUpRight size={14} className="text-primary" />
            <span className="font-mono-tight text-foreground">{platformBadge.value}</span>
          </div>
          <p className="mt-1 text-[10px] text-muted-foreground">{platformBadge.label}</p>
        </div>

        {/* floating badge: ad spend */}
        <div
          className="float-card float-fast absolute -bottom-9 right-6 px-3.5 py-2.5 text-xs"
          style={{ transform: 'translateZ(50px)' }}
        >
          <p className="font-mono-tight font-semibold text-accent">{spendBadge.value}</p>
          <p className="text-[10px] text-muted-foreground">{spendBadge.label}</p>
        </div>
      </div>
    </div>
  )
}
