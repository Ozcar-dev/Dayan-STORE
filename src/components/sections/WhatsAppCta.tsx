import { StitchCircle } from '@/components/ui/StitchCircle'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { SITE } from '@/constants/site'

export function WhatsAppCta() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-secondary px-6 py-10 text-center sm:px-10">
        <StitchCircle className="-left-16 -top-16 h-56 w-56 bg-accent/25" />
        <StitchCircle className="-bottom-20 -right-12 h-64 w-64 bg-accent/25" />

        <div className="relative">
          <h2 className="text-3xl font-semibold text-primary">
            Can't find what you want?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
            Send us a picture or tell us what you are looking for. We reply
            every day, {SITE.hours.toLowerCase()}.
          </p>
          <WhatsAppButton
            message="Hello, do you have something like this?"
            label="Ask us on WhatsApp"
            className="mt-6 px-6 py-3 text-base"
          />
        </div>
      </div>
    </section>
  )
}