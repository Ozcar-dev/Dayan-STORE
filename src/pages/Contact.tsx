import { Link } from 'react-router-dom'
import { Clock, MessageCircle } from 'lucide-react'
import { ContactForm } from '@/components/sections/ContactForm'
import { PageHeader } from '@/components/ui/PageHeader'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { SITE } from '@/constants/site'

export default function Contact() {
  return (
    <>
      <PageHeader
        title="Contact us"
        subtitle="Message us any time. We reply on WhatsApp."
      />

      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-2">
        <ContactForm />

        <div className="min-w-0 space-y-6">
          <section className="rounded-2xl border border-border bg-card p-5">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-primary">
              <MessageCircle size={22} />
              Chat with us
            </h2>
            <p className="mt-2 text-muted-foreground">
              The fastest way to reach us is WhatsApp.
            </p>
            <WhatsAppButton
              message="Hello, I would like to make an enquiry."
              label="Chat on WhatsApp"
              className="mt-4"
            />
          </section>

          <section className="rounded-2xl border border-border bg-card p-5">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-primary">
              <Clock size={22} />
              When we reply
            </h2>
            <p className="mt-2 text-muted-foreground">{SITE.hours}</p>
          </section>

          <section className="rounded-2xl border border-border bg-card p-5">
            <h2 className="text-xl font-semibold text-primary">Find us online</h2>
            <ul className="mt-2 space-y-1">
              <li>
                <a
                  href={SITE.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-primary"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={SITE.tiktokUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-primary"
                >
                  TikTok (you can DM us there too)
                </a>
              </li>
            </ul>
          </section>

          <p className="text-muted-foreground">
            Looking for something specific?{' '}
            <Link
              to="/custom-order"
              className="font-semibold text-primary underline underline-offset-4"
            >
              Make a custom order request
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}