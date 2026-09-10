import { BarChart3, Layers, Megaphone, Repeat, Search, Target, type LucideIcon } from 'lucide-react'
import type { IconKey } from '@/lib/site-data'

export const iconMap: Record<IconKey, LucideIcon> = {
  search: Search,
  megaphone: Megaphone,
  target: Target,
  barChart3: BarChart3,
  layers: Layers,
  repeat: Repeat,
}
