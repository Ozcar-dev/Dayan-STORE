import type { IconType } from 'react-icons'
import { FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa6'
import { SITE } from '@/constants/site'
import { getWhatsAppLink } from '@/lib/utils'

interface SocialItem {
  label: string
  href: string
  icon: IconType
}

const ITEMS: SocialItem[] = [
  {
    label: 'WhatsApp',
    href: getWhatsAppLink('Hello, I would like to make an enquiry.'),
    icon: FaWhatsapp,
  },
  { label: 'Instagram', href: SITE.instagramUrl, icon: FaInstagram },
  { label: 'TikTok', href: SITE.tiktokUrl, icon: FaTiktok },
]

export function SocialLinks() {
  return (
    <ul className="flex items-center gap-3">
      {ITEMS.map((item) => (
        <li key={item.label}>
          <a
            href={item.href}
            target="_blank"
            rel="noreferrer"
            aria-label={item.label}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-card text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <item.icon size={20} />
          </a>
        </li>
      ))}
    </ul>
  )
}