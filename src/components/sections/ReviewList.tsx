import { Quote } from 'lucide-react'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { REVIEWS } from '@/constants/reviews'

export function ReviewList() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-10 px-4 py-10 sm:px-6">
      {REVIEWS.length === 0 ? (
        <p className="text-muted-foreground">Reviews are coming soon.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((review) => (
            <figure
              key={review.id}
              className="min-w-0 rounded-2xl border border-border bg-card p-5"
            >
              <Quote size={24} className="text-accent" />
              <blockquote className="mt-3">{review.text}</blockquote>
              <figcaption className="mt-3 text-sm font-semibold text-primary">
                {review.name}
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      <section className="rounded-2xl bg-secondary p-6 text-center">
        <p className="font-heading text-xl font-semibold">
          Shopped with us before?
        </p>
        <p className="mt-1 text-muted-foreground">
          We would love to hear how it went.
        </p>
        <WhatsAppButton
          message="Hello, I would like to leave a review."
          label="Send us your review"
          className="mt-4"
        />
      </section>
    </div>
  )
}