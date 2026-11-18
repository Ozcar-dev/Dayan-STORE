export type CategorySlug =
  | 'party-event'
  | 'casual'
  | 'jeans'
  | 'tops'
  | 'two-piece-jumpsuit'
  | 'bags'

export type StockStatus = 'in-stock' | 'limited' | 'sold-out'

export interface Category {
  slug: CategorySlug
  name: string
}

export interface Product {
  id: string
  name: string
  category: CategorySlug
  price: number
  description: string
  sizes: string[]
  colours: string[]
  images: string[]
  stock: StockStatus
}

export interface Review {
  id: string
  name: string
  text: string
}

export interface OrderStep {
  title: string
  text: string
}

export interface SizeRow {
  size: string
  bust: string
  waist: string
  hips: string
}

export interface Review {
  id: string
  name: string
  text: string
}

export interface CartLine {
  productId: string
  size: string
  colour: string
  quantity: number
}