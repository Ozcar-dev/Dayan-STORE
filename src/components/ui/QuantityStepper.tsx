import { Minus, Plus } from 'lucide-react'
import { MAX_QUANTITY } from '@/lib/cart'

interface QuantityStepperProps {
  value: number
  onChange: (value: number) => void
  label: string
}

export function QuantityStepper({
  value,
  onChange,
  label,
}: QuantityStepperProps) {
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex items-center gap-1 rounded-full border border-border bg-card p-1"
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={value <= 1}
        onClick={() => onChange(value - 1)}
        className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-secondary disabled:opacity-40"
      >
        <Minus size={16} />
      </button>
      <span aria-live="polite" className="min-w-8 text-center font-semibold">
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        disabled={value >= MAX_QUANTITY}
        onClick={() => onChange(value + 1)}
        className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-secondary disabled:opacity-40"
      >
        <Plus size={16} />
      </button>
    </div>
  )
}