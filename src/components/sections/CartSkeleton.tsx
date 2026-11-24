import { CartBodySkeleton } from '@/components/sections/CartBodySkeleton'
import { PageHeaderSkeleton } from '@/components/sections/PageHeaderSkeleton'

export function CartSkeleton() {
  return (
    <>
      <PageHeaderSkeleton />
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <CartBodySkeleton />
      </div>
    </>
  )
}