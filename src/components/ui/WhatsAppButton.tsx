import { MessageCircle } from 'lucide-react'
import { cn, getWhatsAppLink } from '@/lib/utils'

interface WhatsAppButtonProps {
  message: string
  label?: string
  className?: string
}

export function WhatsAppButton({
  message,
  label = 'Order on WhatsApp',
  className,
}: WhatsAppButtonProps) {
  return (
    <a
      href={getWhatsAppLink(message)}
      target="_blank"
      rel="noreferrer"
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 text-sm font-semibold text-whatsapp-foreground transition-opacity hover:opacity-90',
        className,
      )}
    >
      <MessageCircle size={18} />
      {label}
    </a>
  )
}