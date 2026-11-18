import { Suspense } from "react";
import type { ComponentType, LazyExoticComponent } from "react";
import { createBrowserRouter } from "react-router-dom";
import { PageGate } from "@/components/layout/PageGate";
import { RequireOwner } from "@/components/layout/RequireOwner";
import { RootLayout } from "@/components/layout/RootLayout";
import { ContentPageSkeleton } from "@/components/sections/ContentPageSkeleton";
import { HomeSkeleton } from "@/components/sections/HomeSkeleton";
import { ProductDetailSkeleton } from "@/components/sections/ProductDetailSkeleton";
import { ShopSkeleton } from "@/components/sections/ShopSkeleton";
import { OWNER_PATH } from "@/constants/site";
import { lazyPage } from "@/lib/lazy-page";
import NotFound from "@/pages/NotFound";

const Home = lazyPage(() => import("@/pages/Home"));
const Shop = lazyPage(() => import("@/pages/Shop"));
const Product = lazyPage(() => import("@/pages/Product"));
const About = lazyPage(() => import("@/pages/About"));
const Contact = lazyPage(() => import("@/pages/Contact"));
const SizeGuide = lazyPage(() => import("@/pages/SizeGuide"));
const Delivery = lazyPage(() => import("@/pages/Delivery"));
const Reviews = lazyPage(() => import("@/pages/Reviews"));
const CustomOrder = lazyPage(() => import("@/pages/CustomOrder"));
const Wishlist = lazyPage(() => import("@/pages/Wishlist"));
const Studio = lazyPage(() => import("@/pages/Studio"));
const Cart = lazyPage(() => import("@/pages/Cart"));

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
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: page("home", Home, HomeSkeleton),
        handle: { title: "Home" },
      },
      {
        path: "shop",
        element: page("shop", Shop, ShopSkeleton),
        handle: {
          title: "Shop",
          description:
            "Browse dresses, tops, jeans, two pieces, jumpsuits and bags. Order on WhatsApp.",
        },
      },
      {
        path: "shop/:productId",
        element: page("product", Product, ProductDetailSkeleton),
      },
      {
        path: "about",
        element: page("about", About),
        handle: {
          title: "About us",
          description:
            "Learn about The Dayan Store, an online fashion store in Lagos.",
        },
      },
      {
        path: "contact",
        element: page("contact", Contact),
        handle: {
          title: "Contact us",
          description:
            "Message The Dayan Store on WhatsApp, Instagram or TikTok.",
        },
      },
      {
        path: "size-guide",
        element: page("size-guide", SizeGuide),
        handle: {
          title: "Size Guide",
          description: "Find the size that fits you best.",
        },
      },
      {
        path: "delivery",
        element: page("delivery", Delivery),
        handle: {
          title: "Delivery",
          description: "Delivery, payment and returns information.",
        },
      },
      {
        path: "reviews",
        element: page("reviews", Reviews),
        handle: {
          title: "Reviews",
          description: "What our customers say about The Dayan Store.",
        },
      },
      {
        path: "custom-order",
        element: page("custom-order", CustomOrder),
        handle: {
          title: "Custom Order",
          description: "Tell us what you are looking for and we will help.",
        },
      },
      {
        path: "wishlist",
        element: page("wishlist", Wishlist),
        handle: { title: "Wishlist" },
      },
      {
        path: "cart",
        element: page("cart", Cart),
        handle: { title: "Cart" },
      },
      {
        element: <RequireOwner />,
        children: [
          {
            path: OWNER_PATH.slice(1),
            element: (
              <Suspense key="studio" fallback={<ContentPageSkeleton />}>
                <Studio />
              </Suspense>
            ),
            handle: { title: "Admin" },
          },
        ],
      },
      { path: "*", element: <NotFound />, handle: { title: "Page not found" } },
    ],
  },
]);
