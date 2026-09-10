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
