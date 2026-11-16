import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from '@/context/auth-provider'
import { BasketProvider } from '@/context/basket-provider'
import { WishlistProvider } from '@/context/wishlist-provider'
import { router } from '@/app/router'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <WishlistProvider>
          <BasketProvider>
            <RouterProvider router={router} />
          </BasketProvider>
        </WishlistProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}