'use client'

import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export function AdminSidebar({
  sections, activeSection, onSelect,
}: {
  sections: { id: string; label: string; icon: LucideIcon }[]
  activeSection: string
  onSelect: (id: string) => void
}) {
  return (
    <nav className="admin-sidebar shrink-0">
      <ul className="space-y-1">
        {sections.map((section) => {
          const Icon = section.icon
          const active = section.id === activeSection
          return (
            <li key={section.id}>
              <button
                type="button"
                onClick={() => onSelect(section.id)}
                className={cn('admin-sidebar-link', active && 'admin-sidebar-link-active')}
              >
                <Icon size={16} />
                {section.label}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
