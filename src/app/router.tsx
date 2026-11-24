import { Suspense } from 'react'
import type { ComponentType, LazyExoticComponent } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { PageGate } from '@/components/layout/PageGate'
import { RequireOwner } from '@/components/layout/RequireOwner'
import { RootLayout } from '@/components/layout/RootLayout'
import { AboutSkeleton } from '@/components/sections/AboutSkeleton'
import { AdminSkeleton } from '@/components/sections/AdminSkeleton'
import { CartSkeleton } from '@/components/sections/CartSkeleton'
import { ContactSkeleton } from '@/components/sections/ContactSkeleton'
import { ContentPageSkeleton } from '@/components/sections/ContentPageSkeleton'
import { CustomOrderSkeleton } from '@/components/sections/CustomOrderSkeleton'
import { DeliverySkeleton } from '@/components/sections/DeliverySkeleton'
import { HomeSkeleton } from '@/components/sections/HomeSkeleton'
import { MyOrdersSkeleton } from '@/components/sections/MyOrdersSkeleton'
import { OrderSkeleton } from '@/components/sections/OrderSkeleton'
import { ProductDetailSkeleton } from '@/components/sections/ProductDetailSkeleton'
import { ReviewsSkeleton } from '@/components/sections/ReviewsSkeleton'
import { ShopSkeleton } from '@/components/sections/ShopSkeleton'
import { SizeGuideSkeleton } from '@/components/sections/SizeGuideSkeleton'
import { WishlistSkeleton } from '@/components/sections/WishlistSkeleton'
import { OWNER_PATH } from '@/constants/site'
import { lazyPage } from '@/lib/lazy-page'
import NotFound from '@/pages/NotFound'

const Home = lazyPage(() => import('@/pages/Home'))
const Shop = lazyPage(() => import('@/pages/Shop'))
const Product = lazyPage(() => import('@/pages/Product'))
const About = lazyPage(() => import('@/pages/About'))
const Contact = lazyPage(() => import('@/pages/Contact'))
const SizeGuide = lazyPage(() => import('@/pages/SizeGuide'))
const Delivery = lazyPage(() => import('@/pages/Delivery'))
const Reviews = lazyPage(() => import('@/pages/Reviews'))
const CustomOrder = lazyPage(() => import('@/pages/CustomOrder'))
const Wishlist = lazyPage(() => import('@/pages/Wishlist'))
const Cart = lazyPage(() => import('@/pages/Cart'))
const Order = lazyPage(() => import('@/pages/Order'))
const MyOrders = lazyPage(() => import('@/pages/MyOrders'))
const Studio = lazyPage(() => import('@/pages/Studio'))
const AdminOrders = lazyPage(() => import('@/pages/AdminOrders'))

// The key makes each route its own loading boundary, so its skeleton always shows.
function page(
  key: string,
  Page: LazyExoticComponent<ComponentType>,
  Fallback: ComponentType = ContentPageSkeleton,
) {
  return (
    <Suspense key={key} fallback={<Fallback />}>
      <PageGate fallback={<Fallback />}>
        <Page />
      </PageGate>
    </Suspense>
  )
}

function ownerPage(
  key: string,
  Page: LazyExoticComponent<ComponentType>,
) {
  return (
    <Suspense key={key} fallback={<AdminSkeleton />}>
      <Page />
    </Suspense>
  )
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: page('home', Home, HomeSkeleton),
        handle: { title: 'Home' },
      },
      {
        path: 'shop',
        element: page('shop', Shop, ShopSkeleton),
        handle: {
          title: 'Shop',
          description:
            'Browse dresses, jeans, two piece sets, bags and tops. Order on WhatsApp.',
        },
      },
      {
        path: 'shop/:productId',
        element: page('product', Product, ProductDetailSkeleton),
      },
      {
        path: 'about',
        element: page('about', About, AboutSkeleton),
        handle: {
          title: 'About us',
          description:
            'Learn about The Dayan Store, an online fashion store in Lagos.',
        },
      },
      {
        path: 'contact',
        element: page('contact', Contact, ContactSkeleton),
        handle: {
          title: 'Contact us',
          description:
            'Message The Dayan Store on WhatsApp, Instagram or TikTok.',
        },
      },
      {
        path: 'size-guide',
        element: page('size-guide', SizeGuide, SizeGuideSkeleton),
        handle: {
          title: 'Size Guide',
          description: 'Find the size that fits you best.',
        },
      },
      {
        path: 'delivery',
        element: page('delivery', Delivery, DeliverySkeleton),
        handle: {
          title: 'Delivery',
          description: 'Delivery, payment and returns information.',
        },
      },
      {
        path: 'reviews',
        element: page('reviews', Reviews, ReviewsSkeleton),
        handle: {
          title: 'Reviews',
          description: 'What our customers say about The Dayan Store.',
        },
      },
      {
        path: 'custom-order',
        element: page('custom-order', CustomOrder, CustomOrderSkeleton),
        handle: {
          title: 'Custom Order',
          description: 'Tell us what you are looking for and we will help.',
        },
      },
      {
        path: 'wishlist',
        element: page('wishlist', Wishlist, WishlistSkeleton),
        handle: { title: 'Wishlist' },
      },
      {
        path: 'cart',
        element: page('cart', Cart, CartSkeleton),
        handle: { title: 'Cart' },
      },
      {
        path: 'order/:id',
        element: page('order', Order, OrderSkeleton),
        handle: { title: 'Your order' },
      },
      {
        path: 'orders',
        element: page('orders', MyOrders, MyOrdersSkeleton),
        handle: { title: 'My orders' },
      },
      {
        element: <RequireOwner />,
        children: [
          {
            path: OWNER_PATH.slice(1),
            element: ownerPage('studio', Studio),
            handle: { title: 'Admin' },
          },
          {
            path: `${OWNER_PATH.slice(1)}/orders`,
            element: ownerPage('admin-orders', AdminOrders),
            handle: { title: 'Orders' },
          },
        ],
      },
      { path: '*', element: <NotFound />, handle: { title: 'Page not found' } },
    ],
  },
])