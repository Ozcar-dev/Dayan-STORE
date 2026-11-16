import { Navigate, Outlet } from 'react-router-dom'
import { ContentPageSkeleton } from '@/components/sections/ContentPageSkeleton'
import { useAuth } from '@/hooks/use-auth'

export function RequireOwner() {
  const { session, isLoading } = useAuth()

  if (isLoading) return <ContentPageSkeleton />
  if (!session) return <Navigate to="/" replace />

  return <Outlet />
}