import { Reveal } from '@/components/ui/Reveal'
import { ORDER_STEPS } from '@/constants/delivery'

export function OrderSteps() {
  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {ORDER_STEPS.map((step, index) => (
        <Reveal key={step.title} className="h-full" delay={index * 90}>
          <li className="flex h-full min-w-0 flex-col items-center rounded-2xl border border-border bg-card p-5 text-center">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-heading text-lg font-semibold text-primary-foreground">
              {index + 1}
            </span>
            <p className="mt-3 font-heading font-semibold">{step.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{step.text}</p>
          </li>
        </Reveal>
      ))}
    </ol>
  )
}