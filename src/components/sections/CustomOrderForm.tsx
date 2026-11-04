import { useState } from 'react'
import type { FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { getWhatsAppLink } from '@/lib/utils'

export function CustomOrderForm() {
  const [name, setName] = useState('')
  const [request, setRequest] = useState('')
  const [size, setSize] = useState('')
  const [neededBy, setNeededBy] = useState('')
  const [budget, setBudget] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const text = [
      `Hello, my name is ${name.trim()}. I would like to make a custom order.`,
      `What I want: ${request.trim()}`,
      size.trim() && `Size or measurements: ${size.trim()}`,
      neededBy.trim() && `Needed by: ${neededBy.trim()}`,
      budget.trim() && `Budget: ${budget.trim()}`,
      'I will send my reference photos here.',
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
        <Label htmlFor="custom-name">Your name</Label>
        <Input
          id="custom-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="custom-request">What are you looking for?</Label>
        <Textarea
          id="custom-request"
          value={request}
          onChange={(event) => setRequest(event.target.value)}
          placeholder="Describe the style, colour, fabric or occasion"
          required
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="custom-size">Size or measurements</Label>
          <Input
            id="custom-size"
            value={size}
            onChange={(event) => setSize(event.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="custom-needed">Needed by (date)</Label>
          <Input
            id="custom-needed"
            value={neededBy}
            onChange={(event) => setNeededBy(event.target.value)}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="custom-budget">Budget (optional)</Label>
        <Input
          id="custom-budget"
          value={budget}
          onChange={(event) => setBudget(event.target.value)}
        />
      </div>

      <Button type="submit" size="lg" className="w-full sm:w-auto">
        Send request on WhatsApp
      </Button>
      <p className="text-sm text-muted-foreground">
        This opens WhatsApp. You can send photos of what you want there.
      </p>
    </form>
  )
}