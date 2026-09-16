import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Tone } from '@/lib/site-data'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const toneTextClasses: Record<Tone, string> = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  accent: 'text-accent',
  foreground: 'text-foreground',
  muted: 'text-muted-foreground',
}

export function toneText(tone: Tone) {
  return toneTextClasses[tone]
}

/**
 * Normalizes a pasted Google Drive "share" link into a direct, embeddable
 * image URL. Drive's own share links (`/file/d/<id>/view`, `?id=<id>`) point
 * at an HTML viewer, not the image bytes, so an <img> tag can't render them
 * as-is. Anything else (a Google Photos direct image URL, or any other host)
 * is returned unchanged.
 */
export function resolveImageUrl(url: string): string {
  const trimmed = url.trim()
  if (!trimmed) return trimmed

  const fileMatch = trimmed.match(/drive\.google\.com\/file\/d\/([^/]+)/)
  if (fileMatch) return `https://drive.google.com/uc?export=view&id=${fileMatch[1]}`

  const idMatch = trimmed.match(/drive\.google\.com\/(?:open|uc)\?.*[?&]id=([^&]+)/)
  if (idMatch) return `https://drive.google.com/uc?export=view&id=${idMatch[1]}`

  return trimmed
}
