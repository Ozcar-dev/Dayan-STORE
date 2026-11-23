import { generateDescription } from '@/lib/describe-product'
import { hashString } from '@/lib/seeded'
import { supabase } from '@/lib/supabase'
import { capitalizeFirst } from '@/lib/text'
import type { CategorySlug, Product, StockStatus } from '@/types'

interface ProductRow {
  id: string
  name: string
  category: string
  price: number
  description: string
  sizes: string[]
  colours: string[]
  images: string[]
  stock: StockStatus
}

function toProduct(row: ProductRow): Product {
  return {
    id: row.id,
    name: capitalizeFirst(row.name),
    category: row.category as CategorySlug,
    price: row.price,
    description:
      row.description.trim() ||
      generateDescription({
        category: row.category,
        colours: row.colours,
        seed: hashString(row.id),
      }),
    sizes: row.sizes,
    colours: row.colours,
    images: row.images,
    stock: row.stock,
  }
}

export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('id, name, category, price, description, sizes, colours, images, stock')
    .order('created_at', { ascending: false })

  if (error) throw error

  return ((data ?? []) as ProductRow[]).map(toProduct)
}