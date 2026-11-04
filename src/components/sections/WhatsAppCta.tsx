import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { SITE } from '@/constants/site'

export function WhatsAppCta() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <div className="rounded-3xl bg-primary px-6 py-10 text-center text-primary-foreground sm:px-10">
        <h2 className="text-3xl font-semibold">Can't find what you want?</h2>
        <p className="mx-auto mt-2 max-w-xl opacity-90">
          Send us a picture or tell us what you are looking for. We reply
          every day, {SITE.hours.toLowerCase()}.
        </p>
        <WhatsAppButton
          message="Hello, do you have something like this?"
          label="Ask us on WhatsApp"
          className="mt-6 px-6 py-3 text-base"
        />
      </div>
    </section>
  )
}