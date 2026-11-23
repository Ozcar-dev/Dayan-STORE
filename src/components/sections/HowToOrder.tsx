import { OrderSteps } from '@/components/sections/OrderSteps'

export function HowToOrder() {
  return (
    <section id="how-to-order" className="bg-secondary">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <h2 className="text-center text-3xl font-semibold text-primary">
          How to order
        </h2>
        <div className="mt-6">
          <OrderSteps />
        </div>
      </div>
    </section>
  )
}