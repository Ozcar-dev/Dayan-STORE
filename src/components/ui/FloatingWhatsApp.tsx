import { MessageCircle } from 'lucide-react'
import { getWhatsAppLink } from '@/lib/utils'

export function FloatingWhatsApp() {
  return (
    <a
      href={getWhatsAppLink('Hello, I would like to make an enquiry.')}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-lg transition-transform hover:scale-105"
    >
      <MessageCircle size={28} />
    </a>
  )
}