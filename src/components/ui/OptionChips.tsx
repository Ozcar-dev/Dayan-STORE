import { cn } from '@/lib/utils'

interface OptionChipsProps {
  label: string
  options: string[]
  value: string | null
  onChange: (value: string) => void
}

export function OptionChips({
  label,
  options,
  value,
  onChange,
}: OptionChipsProps) {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={value === option}
            onClick={() => onChange(option)}
            className={cn(
              'min-w-12 rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors',
              value === option
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-card hover:bg-secondary',
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}