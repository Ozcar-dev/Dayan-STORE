import { useRef, useState } from 'react'
import { ProductForm } from '@/components/sections/ProductForm'
import { StudioProductRow } from '@/components/sections/StudioProductRow'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/ui/PageHeader'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuth } from '@/hooks/use-auth'
import { useNoindex } from '@/hooks/use-noindex'
import { useProductMutations } from '@/hooks/use-product-mutations'
import { useProducts } from '@/hooks/use-products'
import { getErrorMessage } from '@/lib/errors'
import { deleteProductPhotos } from '@/lib/image-storage'
import type { ProductInput } from '@/lib/products-admin-api'
import type { Product, StockStatus } from '@/types'

type Mode =
  | { kind: 'list' }
  | { kind: 'new' }
  | { kind: 'edit'; product: Product }

export default function Studio() {
  useNoindex()
  const { signOut } = useAuth()
  const { products, isLoading } = useProducts()
  const { create, update, remove } = useProductMutations()
  const [mode, setMode] = useState<Mode>({ kind: 'list' })
  const [notice, setNotice] = useState('')
  const uploaded = useRef<string[]>([])

  const busy = create.isPending || update.isPending || remove.isPending

  const discardUploads = (keep: string[] = []) => {
    const orphans = uploaded.current.filter((url) => !keep.includes(url))
    uploaded.current = []
    if (orphans.length > 0) void deleteProductPhotos(orphans)
  }

  const openForm = (next: Mode) => {
    create.reset()
    update.reset()
    remove.reset()
    setNotice('')
    discardUploads()
    setMode(next)
  }

  const handleSave = (input: ProductInput) => {
    setNotice('')

    if (mode.kind === 'edit') {
      const original = mode.product

      update.mutate(
        { id: original.id, input },
        {
          onSuccess: () => {
            const removed = original.images.filter(
              (url) => !input.images.includes(url),
            )
            if (removed.length > 0) void deleteProductPhotos(removed)
            discardUploads(input.images)
            setNotice('Changes saved.')
            setMode({ kind: 'list' })
          },
        },
      )
      return
    }

    create.mutate(input, {
      onSuccess: () => {
        discardUploads(input.images)
        setNotice('Product added.')
        setMode({ kind: 'list' })
      },
    })
  }

  const handleStockChange = (product: Product, stock: StockStatus) => {
    setNotice('')
    remove.reset()
    update.mutate(
      { id: product.id, input: { stock } },
      { onSuccess: () => setNotice(`Updated ${product.name}.`) },
    )
  }

  const handleDelete = (product: Product) => {
    setNotice('')
    update.reset()
    remove.mutate(product.id, {
      onSuccess: () => {
        void deleteProductPhotos(product.images)
        setNotice(`Deleted ${product.name}.`)
      },
    })
  }

  const formError =
    mode.kind === 'edit'
      ? update.isError
        ? getErrorMessage(update.error)
        : null
      : create.isError
        ? getErrorMessage(create.error)
        : null

  const listError = remove.isError
    ? getErrorMessage(remove.error)
    : update.isError && mode.kind === 'list'
      ? getErrorMessage(update.error)
      : null

  return (
    <>
      <PageHeader title="Studio" subtitle="Manage your shop." />

      <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted-foreground">You are signed in.</p>
          <Button variant="outline" onClick={() => void signOut()}>
            Sign out
          </Button>
        </div>

        {notice && (
          <p
            role="status"
            className="rounded-xl bg-secondary px-4 py-3 text-sm font-semibold text-primary"
          >
            {notice}
          </p>
        )}

        {listError && (
          <p
            role="alert"
            className="rounded-xl bg-secondary px-4 py-3 text-sm font-semibold text-primary"
          >
            {listError}
          </p>
        )}

        {mode.kind === 'list' ? (
          <section className="rounded-2xl border border-border bg-card p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-semibold text-primary">
                Products ({isLoading ? '...' : products.length})
              </h2>
              <Button onClick={() => openForm({ kind: 'new' })}>
                Add product
              </Button>
            </div>

            {isLoading ? (
              <div className="mt-4 space-y-3">
                {Array.from({ length: 4 }, (_, index) => (
                  <Skeleton key={index} className="h-14" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <p className="mt-4 text-muted-foreground">
                No products yet. Add your first one.
              </p>
            ) : (
              <ul className="mt-2 divide-y divide-border">
                {products.map((product) => (
                  <StudioProductRow
                    key={product.id}
                    product={product}
                    busy={busy}
                    onEdit={() => openForm({ kind: 'edit', product })}
                    onStockChange={(stock) => handleStockChange(product, stock)}
                    onDelete={() => handleDelete(product)}
                  />
                ))}
              </ul>
            )}
          </section>
        ) : (
          <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
            <h2 className="mb-4 text-xl font-semibold text-primary">
              {mode.kind === 'edit' ? 'Edit product' : 'Add product'}
            </h2>
            <ProductForm
              key={mode.kind === 'edit' ? mode.product.id : 'new'}
              initial={mode.kind === 'edit' ? mode.product : undefined}
              saving={busy}
              error={formError}
              onSubmit={handleSave}
              onCancel={() => openForm({ kind: 'list' })}
              onUploaded={(url) => uploaded.current.push(url)}
            />
          </section>
        )}
      </div>
    </>
  )
}