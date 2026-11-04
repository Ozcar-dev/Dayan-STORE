import { ORDER_STEPS } from '@/constants/delivery'

export function HowToOrder() {
  return (
    <section id="how-to-order" className="bg-secondary">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <h2 className="text-3xl font-semibold text-primary">How to order</h2>

        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ORDER_STEPS.map((step, index) => (
            <li
              key={step.title}
              className="min-w-0 rounded-2xl border border-border bg-card p-5"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary font-heading font-semibold text-primary-foreground">
                {index + 1}
              </span>
              <p className="mt-3 font-heading font-semibold">{step.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}