import { SIZE_TAGS, hasSize, toggleSize } from '@/lib/sizes'
import { cn } from '@/lib/utils'

interface SizeTagsProps {
  value: string
  onChange: (value: string) => void
}

export function SizeTags({ value, onChange }: SizeTagsProps) {
  return (
    <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Quick sizes">
      {SIZE_TAGS.map((tag) => {
        const active = hasSize(value, tag)

        return (
          <button
            key={tag}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(toggleSize(value, tag))}
            className={cn(
              'rounded-full border px-3 py-1 text-sm font-semibold transition-colors',
              active
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-card hover:bg-secondary',
            )}
          >
            {tag}
          </button>
        )
      })}
    </div>
  )
}