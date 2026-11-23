import { Star } from 'lucide-react'

export function Rating({ value }: { value: number }) {
  const row = (
    <span className="flex shrink-0">
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          size={14}
          strokeWidth={0}
          fill="currentColor"
          className="shrink-0"
        />
      ))}
    </span>
  )

  return (
    <div
      className="flex items-center gap-1.5"
      role="img"
      aria-label={`Rated ${value.toFixed(1)} out of 5`}
    >
      <span className="relative inline-flex text-border" aria-hidden="true">
        {row}
        <span
          className="absolute inset-y-0 left-0 overflow-hidden text-accent"
          style={{ width: `${(value / 5) * 100}%` }}
        >
          {row}
        </span>
      </span>
      <span className="text-sm font-semibold">{value.toFixed(1)}</span>
    </div>
  )
}