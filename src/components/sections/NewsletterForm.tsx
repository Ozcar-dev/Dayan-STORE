import { useState } from 'react'
import type { FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SITE } from '@/constants/site'

type Status = 'idle' | 'loading' | 'success' | 'error'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (SITE.newsletterEndpoint.startsWith('REPLACE_ME')) {
      setStatus('error')
      return
    }

    setStatus('loading')

    try {
      const response = await fetch(SITE.newsletterEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) throw new Error('Request failed')

      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="min-w-0">
      <p className="font-heading font-semibold">Get updates on new arrivals</p>
      <div className="mt-3 flex gap-2">
        <Input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Your email address"
          aria-label="Email address"
          required
          className="min-w-0 flex-1"
        />
        <Button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Signing up...' : 'Sign up'}
        </Button>
      </div>

      {status === 'success' && (
        <p className="mt-2 text-sm font-semibold text-primary">
          Thank you. You are signed up.
        </p>
      )}
      {status === 'error' && (
        <p className="mt-2 text-sm font-semibold text-muted-foreground">
          Sorry, we could not sign you up right now. Please try again later.
        </p>
      )}
    </form>
  )
}