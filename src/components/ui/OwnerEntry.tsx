import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { OWNER_PATH } from '@/constants/site'
import { useAuth } from '@/hooks/use-auth'
import {
  lockRemainingMs,
  recordFailure,
  resetLock,
} from '@/lib/sign-in-lock'

export function OwnerEntry() {
  const { session, signIn } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const handleOpen = () => {
    if (session) {
      navigate(OWNER_PATH)
      return
    }
    setOpen(true)
  }

  const close = () => {
    setOpen(false)
    setPassword('')
    setError('')
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const wait = lockRemainingMs()
    if (wait > 0) {
      setError(
        `Too many tries. Please wait ${Math.ceil(wait / 60000)} minute(s).`,
      )
      return
    }

    setBusy(true)
    const result = await signIn(password)
    setBusy(false)

    if (result === 'ok') {
      resetLock()
      close()
      navigate(OWNER_PATH)
      return
    }

    if (result === 'wrong-password') {
      recordFailure()
      setError('Wrong password.')
    } else {
      setError('Could not sign in. Check your connection and try again.')
    }
    setPassword('')
  }

  return (
    <>
      <button
        type="button"
        aria-label="Owner sign in"
        onClick={handleOpen}
        className="cursor-default bg-transparent p-0 text-inherit"
      >
        ©
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Owner sign in"
          onKeyDown={(event) => {
            if (event.key === 'Escape') close()
          }}
          className="fixed inset-0 z-70 flex items-center justify-center bg-foreground/40 px-4"
        >
          <button
            type="button"
            aria-label="Close"
            tabIndex={-1}
            onClick={close}
            className="absolute inset-0 cursor-default"
          />

          <form
            onSubmit={handleSubmit}
            className="relative w-full max-w-sm space-y-4 rounded-2xl border border-border bg-card p-6 text-left text-card-foreground shadow-lg"
          >
            <h2 className="text-xl font-semibold text-primary">Owner sign in</h2>

            <div>
              <Label htmlFor="owner-password">Password</Label>
              <Input
                id="owner-password"
                type="password"
                autoFocus
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>

            {error && (
              <p role="alert" className="text-sm font-semibold text-primary">
                {error}
              </p>
            )}

            <div className="flex gap-3">
              <Button type="submit" disabled={busy}>
                {busy ? 'Signing in...' : 'Sign in'}
              </Button>
              <Button type="button" variant="outline" onClick={close}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}