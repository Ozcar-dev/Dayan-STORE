import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { ProductDetailSkeleton } from '@/components/sections/ProductDetailSkeleton'
import { ProductGallery } from '@/components/sections/ProductGallery'
import { ProductInfo } from '@/components/sections/ProductInfo'
import { ProductsError } from '@/components/sections/ProductsError'
import { ProductCard } from '@/components/ui/ProductCard'
import { useDocumentTitle } from '@/hooks/use-document-title'
import { useProducts } from '@/hooks/use-products'

export default function Product() {
  const { productId } = useParams()
  const { products, getProductById, isLoading, isError, refetch } =
    useProducts()
  const product = productId ? getProductById(productId) : undefined

  useDocumentTitle(
    isLoading ? 'Loading' : product ? product.name : 'Item not found',
  )

  if (isLoading) return <ProductDetailSkeleton />

  if (isError) {
    return (
      <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <ProductsError onRetry={() => void refetch()} />
      </section>
    )
  }

  if (!product) {
    return (
      <section className="mx-auto w-full max-w-6xl px-4 py-20 text-center sm:px-6">
        <h1 className="text-4xl font-semibold text-primary">Item not found</h1>
        <p className="mt-3 text-muted-foreground">
          This item may have been removed or the link is wrong.
        </p>
        <Link
          to="/shop"
          className="mt-6 inline-block rounded-full bg-primary px-6 py-2 font-semibold text-primary-foreground"
        >
          Back to shop
        </Link>
      </section>
    )
  }

  const related = products
    .filter(
      (item) => item.category === product.category && item.id !== product.id,
    )
    .slice(0, 4)

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      <Link
        to="/shop"
        className="inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-primary"
      >
        <ArrowLeft size={16} />
        Back to shop
      </Link>

      <div className="mt-6 grid gap-8 md:grid-cols-2 md:gap-12">
        <ProductGallery key={product.id} product={product} />
        <ProductInfo key={product.id} product={product} />
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-primary">
            You may also like
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}