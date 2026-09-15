'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Custom pointer: a dot that tracks the mouse exactly plus a ring that
 * eases toward it. Only mounts on fine-pointer, motion-tolerant devices —
 * touch screens and prefers-reduced-motion keep the native cursor.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [label, setLabel] = useState<string | null>(null)

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!isFinePointer || prefersReducedMotion) return

    setEnabled(true)
    document.body.classList.add('custom-cursor-active')

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ring = { ...target }
    let hasMoved = false
    let raf = 0

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX
      target.y = e.clientY
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`
      if (!hasMoved) {
        hasMoved = true
        ring.x = target.x
        ring.y = target.y
        dotRef.current?.style.setProperty('opacity', '1')
        ringRef.current?.style.setProperty('opacity', '')
      }
    }

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest?.('a, button, input, textarea, select, .tilt-card, [data-cursor]')
      setHovering(!!el)
      setLabel(el?.getAttribute('data-cursor-label') ?? null)
    }

    const onLeaveWindow = () => {
      dotRef.current?.style.setProperty('opacity', '0')
      ringRef.current?.style.setProperty('opacity', '0')
    }
    const onEnterWindow = () => {
      if (!hasMoved) return
      dotRef.current?.style.setProperty('opacity', '1')
      ringRef.current?.style.setProperty('opacity', '')
    }

    const loop = () => {
      ring.x += (target.x - ring.x) * 0.18
      ring.y += (target.y - ring.y) * 0.18
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.documentElement.addEventListener('mouseleave', onLeaveWindow)
    document.documentElement.addEventListener('mouseenter', onEnterWindow)

    return () => {
      cancelAnimationFrame(raf)
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.documentElement.removeEventListener('mouseleave', onLeaveWindow)
      document.documentElement.removeEventListener('mouseenter', onEnterWindow)
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      <div ref={ringRef} className={`cursor-ring ${hovering ? 'is-hovering' : ''} ${label ? 'has-label' : ''}`}>
        {label && <span>{label}</span>}
      </div>
      <div ref={dotRef} className={`cursor-dot ${label ? 'is-hidden' : ''}`} />
    </>
  )
}
