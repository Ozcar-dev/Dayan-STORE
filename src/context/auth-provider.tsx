import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'
import { AuthContext } from '@/context/auth-context'
import type { SignInResult } from '@/context/auth-context'
import { supabase } from '@/lib/supabase'

const OWNER_EMAIL = import.meta.env.VITE_OWNER_EMAIL as string | undefined

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setIsLoading(false)
    })

    const { data } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next)
      setIsLoading(false)
    })

    return () => data.subscription.unsubscribe()
  }, [])

  const signIn = useCallback(async (password: string): Promise<SignInResult> => {
    if (!OWNER_EMAIL) return 'error'

    const { error } = await supabase.auth.signInWithPassword({
      email: OWNER_EMAIL,
      password,
    })

    if (!error) return 'ok'
    return error.status === 400 ? 'wrong-password' : 'error'
  }, [])

  const signOut = useCallback(async () => {
    await supabase.auth.signOut()
  }, [])

  const value = useMemo(
    () => ({ session, isLoading, signIn, signOut }),
    [session, isLoading, signIn, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}