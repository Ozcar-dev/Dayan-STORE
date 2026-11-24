import { Link } from 'react-router-dom'
import { NewsletterForm } from '@/components/sections/NewsletterForm'
import { OwnerEntry } from '@/components/ui/OwnerEntry'
import { SocialLinks } from '@/components/ui/SocialLinks'
import { StitchCircle } from '@/components/ui/StitchCircle'
import { SITE } from '@/constants/site'
import { NAV_LINKS } from '@/constants/navigation'
import { getWhatsAppLink } from '@/lib/utils'

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-secondary text-foreground">
      <StitchCircle className="-bottom-32 -right-24 h-80 w-80 bg-accent/20" />

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-2 gap-x-6 gap-y-8 px-4 py-10 sm:px-6 lg:grid-cols-3">
        <div className="col-span-2 min-w-0 lg:col-span-1 lg:col-start-1 lg:row-span-2 lg:row-start-1">
          <p className="font-heading text-xl font-semibold text-primary">
            {SITE.name}
          </p>
          <p className="mt-1 text-muted-foreground">{SITE.tagline}</p>
          <div className="mt-4">
            <SocialLinks />
          </div>
        </div>

        <div className="min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <p className="font-heading font-semibold">Quick links</p>
          <ul className="mt-2 space-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="hover:text-primary">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/custom-order" className="hover:text-primary">
                Custom Order
              </Link>
            </li>
            <li>
              <Link to="/wishlist" className="hover:text-primary">
                Wishlist
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-primary">
                Cart
              </Link>
            </li>
            <li>
              <Link to="/orders" className="hover:text-primary">
                My Orders
              </Link>
            </li>
          </ul>
        </div>

        <div className="min-w-0 lg:col-start-3 lg:row-start-1">
          <p className="font-heading font-semibold">Get in touch</p>
          <ul className="mt-2 space-y-1">
            <li>
              <a
                href={getWhatsAppLink('Hello, I would like to make an enquiry.')}
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary"
              >
                Chat on WhatsApp
              </a>
            </li>
            <li className="text-muted-foreground">{SITE.hours}</li>
          </ul>
        </div>

        <div className="col-span-2 min-w-0 lg:col-span-1 lg:col-start-3 lg:row-start-2">
          <NewsletterForm />
        </div>
      </div>

      <div className="relative border-t border-border py-4 text-center text-sm text-muted-foreground">
        <OwnerEntry /> {new Date().getFullYear()} {SITE.name}. All rights
        reserved.
      </div>
    </footer>
  )
}