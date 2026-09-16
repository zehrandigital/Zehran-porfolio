import {
  BarChart3, Calendar, Heart, Layers, Megaphone, PenTool, Repeat, Rocket, Search, Share2,
  Sparkles, Target, TrendingUp, Users, type LucideIcon,
} from 'lucide-react'
import type { IconKey } from '@/lib/site-data'

export const iconMap: Record<IconKey, LucideIcon> = {
  search: Search,
  megaphone: Megaphone,
  target: Target,
  barChart3: BarChart3,
  layers: Layers,
  repeat: Repeat,
  share2: Share2,
  calendar: Calendar,
  penTool: PenTool,
  trendingUp: TrendingUp,
  users: Users,
  heart: Heart,
  rocket: Rocket,
  sparkles: Sparkles,
}
