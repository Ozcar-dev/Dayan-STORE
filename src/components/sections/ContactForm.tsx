import { useState } from 'react'
import type { FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { getWhatsAppLink } from '@/lib/utils'

export function ContactForm() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const text = [
      `Hello, my name is ${name.trim()}.`,
      message.trim(),
      phone.trim() && `My number: ${phone.trim()}`,
    ]
      .filter(Boolean)
      .join('\n')

    window.open(getWhatsAppLink(text), '_blank', 'noopener,noreferrer')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="min-w-0 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-6"
    >
      <div>
        <Label htmlFor="contact-name">Your name</Label>
        <Input
          id="contact-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="contact-phone">Phone number (optional)</Label>
        <Input
          id="contact-phone"
          type="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="contact-message">Your message</Label>
        <Textarea
          id="contact-message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          required
        />
      </div>

      <Button type="submit" size="lg" className="w-full sm:w-auto">
        Send on WhatsApp
      </Button>
      <p className="text-sm text-muted-foreground">
        This opens WhatsApp with your message ready to send.
      </p>
    </form>
  )
}