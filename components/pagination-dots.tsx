'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

/** Prev/next + dot pagination, shown only when there's more than one page. */
export function PaginationDots({
  page, pageCount, onChange, label,
}: { page: number; pageCount: number; onChange: (page: number) => void; label: string }) {
  if (pageCount <= 1) return null

  return (
    <div className="mt-10 flex items-center justify-center gap-4">
      <button
        type="button"
        aria-label={`Previous ${label}`}
        onClick={() => onChange((page - 1 + pageCount) % pageCount)}
        className="rounded-full border border-foreground/15 p-2.5 hover:border-primary hover:text-primary"
      >
        <ChevronLeft size={16} />
      </button>
      <div className="flex items-center gap-2">
        {Array.from({ length: pageCount }).map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to ${label} page ${i + 1}`}
            aria-current={i === page}
            onClick={() => onChange(i)}
            className={cn('h-1.5 rounded-full transition-all', i === page ? 'w-6 bg-primary' : 'w-1.5 bg-foreground/20 hover:bg-foreground/40')}
          />
        ))}
      </div>
      <button
        type="button"
        aria-label={`Next ${label}`}
        onClick={() => onChange((page + 1) % pageCount)}
        className="rounded-full border border-foreground/15 p-2.5 hover:border-primary hover:text-primary"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  )
}
