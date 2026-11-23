import { useState } from 'react'
import type { FormEvent } from 'react'
import { PhotoManager } from '@/components/sections/PhotoManager'
import { SizeTags } from '@/components/sections/SizeTags'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { CATEGORIES } from '@/constants/categories'
import { STOCK_OPTIONS } from '@/constants/stock'
import { generateDescription } from '@/lib/describe-product'
import { nameOptions, pickName } from '@/lib/draft-name'
import { parseList } from '@/lib/parse-list'
import type { ProductInput } from '@/lib/products-admin-api'
import { randomSeed } from '@/lib/seeded'
import { formatSizes } from '@/lib/sizes'
import { capitalizeFirst } from '@/lib/text'
import { normalizeText } from '@/lib/unique'
import type { Product, StockStatus } from '@/types'

interface ProductFormProps {
  initial?: Product
  others: Product[]
  saving: boolean
  error: string | null
  onSubmit: (input: ProductInput) => void
  onCancel: () => void
  onUploaded: (url: string) => void
}

export function ProductForm({
  initial,
  others,
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
  const [sizes, setSizes] = useState(
    formatSizes(initial?.sizes.join(', ') ?? ''),
  )
  const [colours, setColours] = useState(initial?.colours.join(', ') ?? '')
  const [stock, setStock] = useState<StockStatus>(initial?.stock ?? 'in-stock')
  const [images, setImages] = useState<string[]>(initial?.images ?? [])
  const [photoBusy, setPhotoBusy] = useState(false)
  const [localError, setLocalError] = useState('')

  const rest = others.filter((product) => product.id !== initial?.id)
  const takenNames = new Set(rest.map((product) => normalizeText(product.name)))
  const takenDescriptions = new Set(
    rest.map((product) => normalizeText(product.description)),
  )
  const options = nameOptions(category, takenNames, name)

  const handleCategory = (value: string) => {
    setCategory(value)
    setName((current) => (initial && current === initial.name ? current : ''))
  }

  const quickDraft = () => {
    const seed = randomSeed()
    setLocalError('')
    setName(pickName(category, takenNames, seed))
    setDescription(
      generateDescription({
        category,
        colours: parseList(colours),
        taken: takenDescriptions,
        seed,
      }),
    )
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLocalError('')

    const priceNumber = Number(price)
    const sizeList = parseList(formatSizes(sizes))
    const colourList = parseList(colours)
    const seed = randomSeed()

    const finalName = capitalizeFirst(name) || pickName(category, takenNames, seed)
    const finalDescription =
      description.trim() ||
      generateDescription({
        category,
        colours: colourList,
        taken: takenDescriptions,
        seed,
      })

    if (price.trim() === '' || !Number.isInteger(priceNumber) || priceNumber < 0) {
      setLocalError('Enter the price as a whole number, like 25000.')
      return
    }

    if (sizeList.length === 0) {
      setLocalError('Add at least one size. For bags, tap One size.')
      return
    }

    if (!finalName) {
      setLocalError('Choose a name from the list.')
      return
    }

    if (takenNames.has(normalizeText(finalName))) {
      setLocalError(
        'Another item already uses this name. Choose a different name.',
      )
      return
    }

    if (takenDescriptions.has(normalizeText(finalDescription))) {
      setLocalError(
        'Another item already has this description. Change it or click Quick draft.',
      )
      return
    }

    onSubmit({
      name: finalName,
      category,
      price: priceNumber,
      description: finalDescription,
      sizes: sizeList,
      colours: colourList,
      images,
      stock,
    })
  }

  const shownError = localError || error

  return (
    <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
      <PhotoManager
        images={images}
        onChange={setImages}
        onUploaded={onUploaded}
        onBusyChange={setPhotoBusy}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="product-category">Category</Label>
          <Select
            id="product-category"
            value={category}
            onChange={(event) => handleCategory(event.target.value)}
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
        <Label htmlFor="product-sizes">Sizes</Label>
        <Input
          id="product-sizes"
          value={sizes}
          onChange={(event) => setSizes(formatSizes(event.target.value))}
          placeholder="Tap a size below, or type like S, M, L"
        />
        <SizeTags value={sizes} onChange={setSizes} />
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
          Separate with commas. The description names a colour only when there
          is exactly one.
        </p>
      </div>

      <div className="space-y-4 rounded-2xl border border-border bg-secondary/40 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            Set the category and colours first, then click Quick draft.
          </p>
          <Button type="button" size="sm" onClick={quickDraft}>
            Quick draft name and description
          </Button>
        </div>

        <div>
          <Label htmlFor="product-name">Name</Label>
          <Select
            id="product-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          >
            <option value="">Choose a name</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
          <p className="mt-1 text-sm text-muted-foreground">
            Names already used by other items are not listed.
          </p>
        </div>

        <div>
          <Label htmlFor="product-description">Description</Label>
          <Textarea
            id="product-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="min-h-32"
          />
          <p className="mt-1 text-sm text-muted-foreground">
            Leave the name or description empty and a new one is written when
            you save.
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