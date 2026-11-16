import { Button } from '@/components/ui/button'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'

export function ProductsError({ onRetry }: { onRetry: () => void }) {
  return (
    <div
      role="alert"
      className="rounded-2xl border border-border bg-card px-4 py-12 text-center"
    >
      <p className="font-heading text-xl font-semibold text-primary">
        We couldn't load the items
      </p>
      <p className="mt-2 text-muted-foreground">
        Check your connection and try again, or message us directly.
      </p>
      <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button onClick={onRetry}>Try again</Button>
        <WhatsAppButton
          message="Hello, I would like to make an enquiry."
          label="Message us on WhatsApp"
        />
      </div>
    </div>
  )
}