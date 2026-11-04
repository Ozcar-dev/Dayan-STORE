import { RouterProvider } from 'react-router-dom'
import { WishlistProvider } from '@/context/wishlist-provider'
import { router } from '@/app/router'

export function App() {
  return (
    <WishlistProvider>
      <RouterProvider router={router} />
    </WishlistProvider>
  )
}