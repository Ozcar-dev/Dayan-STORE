import { useState } from 'react'
import type { FormEvent } from 'react'
import { PhotoManager } from '@/components/sections/PhotoManager'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { CATEGORIES } from '@/constants/categories'
import { STOCK_OPTIONS } from '@/constants/stock'
import { parseList } from '@/lib/parse-list'
import type { ProductInput } from '@/lib/products-admin-api'
import type { Product, StockStatus } from '@/types'

interface ProductFormProps {
  initial?: Product
  saving: boolean
  error: string | null
  onSubmit: (input: ProductInput) => void
  onCancel: () => void
  onUploaded: (url: string) => void
}

export function ProductForm({
  initial,
  saving,
  error,
  onSubmit,
  onCancel,
  onUploaded,
}: ProductFormProps) {
  const [name, setName] = useState(initial?.name ?? '')
  const [category, setCategory] = useState<string>(
    initial?.category ?? CATEGORIES[0].slug,
  )
  const [price, setPrice] = useState(initial ? String(initial.price) : '')
  const [description, setDescription] = useState(initial?.description ?? '')
  const [sizes, setSizes] = useState(initial?.sizes.join(', ') ?? '')
  const [colours, setColours] = useState(initial?.colours.join(', ') ?? '')
  const [stock, setStock] = useState<StockStatus>(initial?.stock ?? 'in-stock')
  const [images, setImages] = useState<string[]>(initial?.images ?? [])
  const [photoBusy, setPhotoBusy] = useState(false)
  const [localError, setLocalError] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLocalError('')

    const trimmedName = name.trim()
    const priceNumber = Number(price)
    const sizeList = parseList(sizes)

    if (!trimmedName) {
      setLocalError('Enter the item name.')
      return
    }

    if (price.trim() === '' || !Number.isInteger(priceNumber) || priceNumber < 0) {
      setLocalError('Enter the price as a whole number, like 25000.')
      return
    }

    if (sizeList.length === 0) {
      setLocalError('Add at least one size. For bags, write One size.')
      return
    }

    onSubmit({
      name: trimmedName,
      category,
      price: priceNumber,
      description: description.trim(),
      sizes: sizeList,
      colours: parseList(colours),
      images,
      stock,
    })
  }

  const shownError = localError || error

  return (
    <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
      <div>
        <Label htmlFor="product-name">Name</Label>
        <Input
          id="product-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="product-category">Category</Label>
          <Select
            id="product-category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {CATEGORIES.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <Label htmlFor="product-price">Price (₦)</Label>
          <Input
            id="product-price"
            type="number"
            inputMode="numeric"
            min={0}
            step={1}
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            placeholder="25000"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="product-description">Description</Label>
        <Textarea
          id="product-description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="product-sizes">Sizes</Label>
          <Input
            id="product-sizes"
            value={sizes}
            onChange={(event) => setSizes(event.target.value)}
            placeholder="S, M, L, XL"
            required
          />
          <p className="mt-1 text-sm text-muted-foreground">
            Separate with commas. For bags, write One size.
          </p>
        </div>

        <div>
          <Label htmlFor="product-colours">Colours</Label>
          <Input
            id="product-colours"
            value={colours}
            onChange={(event) => setColours(event.target.value)}
            placeholder="Cream, Brown"
          />
          <p className="mt-1 text-sm text-muted-foreground">
            Separate with commas.
          </p>
        </div>
      </div>

      <div>
        <Label htmlFor="product-stock">Availability</Label>
        <Select
          id="product-stock"
          value={stock}
          onChange={(event) => setStock(event.target.value as StockStatus)}
          className="sm:max-w-xs"
        >
          {STOCK_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </div>

      <PhotoManager
        images={images}
        onChange={setImages}
        onUploaded={onUploaded}
        onBusyChange={setPhotoBusy}
      />

      {shownError && (
        <p role="alert" className="text-sm font-semibold text-primary">
          {shownError}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        <Button type="submit" size="lg" disabled={saving || photoBusy}>
          {saving ? 'Saving...' : initial ? 'Save changes' : 'Add product'}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          disabled={photoBusy}
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}