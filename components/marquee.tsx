'use client'

export function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items]
  return (
    <div className="marquee-viewport overflow-hidden">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="mx-4 flex items-center gap-2 whitespace-nowrap rounded-full border border-foreground/10 bg-foreground/[.02] px-5 py-2.5 font-mono-tight text-xs uppercase tracking-widest text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
