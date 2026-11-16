import { createContext } from 'react'
import type { Session } from '@supabase/supabase-js'

export type SignInResult = 'ok' | 'wrong-password' | 'error'

export interface AuthContextValue {
  session: Session | null
  isLoading: boolean
  signIn: (password: string) => Promise<SignInResult>
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)