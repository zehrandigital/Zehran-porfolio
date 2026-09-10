'use client'

import { useEffect, useState } from 'react'
import { TiltCard } from '@/components/tilt-card'

export function AboutPhoto({
  photoSrc, photoAlt, name,
}: { photoSrc?: string; photoAlt: string; name: string }) {
  const [photoReady, setPhotoReady] = useState(false)

  // Same test-load pattern as the hero used to: a server-rendered <img> can
  // finish loading (or 404) before React hydrates and attaches listeners,
  // silently missing the event, so we probe it ourselves instead.
  useEffect(() => {
    if (!photoSrc) return
    let cancelled = false
    const probe = new window.Image()
    probe.onload = () => { if (!cancelled) setPhotoReady(true) }
    probe.onerror = () => { if (!cancelled) setPhotoReady(false) }
    probe.src = photoSrc
    return () => { cancelled = true }
  }, [photoSrc])

  const showPhoto = Boolean(photoSrc) && photoReady

  return (
    <TiltCard max={6} className="aspect-[4/5] w-full max-w-[280px] overflow-hidden rounded-[1.75rem] border border-white/10">
      {showPhoto ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={photoSrc} alt={photoAlt} className="h-full w-full object-cover" />
      ) : (
        <div className="portrait-placeholder flex h-full w-full items-end justify-center pb-6">
          <span className="font-mono-tight text-7xl font-bold text-foreground/10">{name.charAt(0)}</span>
        </div>
      )}
    </TiltCard>
  )
}
