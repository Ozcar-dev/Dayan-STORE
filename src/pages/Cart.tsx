import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ShoppingCart } from "lucide-react";
import { CartRow } from "@/components/sections/CartRow";
import { ProductsError } from "@/components/sections/ProductsError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/ui/PageHeader";
import { CartBodySkeleton } from "@/components/sections/CartBodySkeleton";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { useCart } from "@/hooks/use-cart";
import { useProducts } from "@/hooks/use-products";
import { lineKey } from "@/lib/cart";
import type { CartItem } from "@/lib/cart";
import { placeOrder } from "@/lib/orders-api";
import { buildOrderMessage } from "@/lib/whatsapp-messages";
import { formatPrice, getWhatsAppLink } from "@/lib/utils";
import type { CartLine, Product } from "@/types";
import { recordOrder } from "@/lib/my-orders";

interface Unavailable {
  key: string;
  line: CartLine;
  product?: Product;
}

interface Placed {
  id: string;
  message: string;
}

function orderErrorMessage(error: unknown) {
  const text =
    error &&
    typeof error === "object" &&
    "message" in error &&
    typeof error.message === "string"
      ? error.message.toLowerCase()
      : "";

  if (text.includes("unavailable")) {
    return "One of your items is no longer available. Remove it and try again.";
  }

  if (text.includes("uuid") || text.includes("invalid cart")) {
    return "Something in your cart is out of date. Clear the cart and add your items again.";
  }

  return "We could not save your order. Check your connection and try again.";
}

export default function Cart() {
  const { lines, setQuantity, remove, clear } = useCart();
  const { products, isLoading, isError, refetch } = useProducts();
  const [clearing, setClearing] = useState(false);
  const [name, setName] = useState("");
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");
  const [placed, setPlaced] = useState<Placed | null>(null);

  const items: CartItem[] = [];
  const unavailable: Unavailable[] = [];

  for (const line of lines) {
    const key = lineKey(line);
    const product = products.find((entry) => entry.id === line.productId);

    if (!product || product.stock === "sold-out") {
      unavailable.push({ key, line, product });
    } else {
      items.push({ key, line, product });
    }
  }

  const total = items.reduce(
    (sum, { line, product }) => sum + product.price * line.quantity,
    0,
  );

  const handlePlace = async () => {
    const trimmed = name.trim();

    if (!trimmed) {
      setError("Please enter your name.");
      return;
    }

    setError("");
    setPlacing(true);
    const popup = window.open("", "_blank");

    try {
      const orderId = await placeOrder(
        trimmed,
        items.map(({ line }) => line),
      );
      recordOrder(orderId);

      const message = buildOrderMessage(trimmed, items, orderId);

      clear();
      setPlaced({ id: orderId, message });

      if (popup) popup.location.href = getWhatsAppLink(message);
    } catch (caught) {
      popup?.close();
      setError(orderErrorMessage(caught));
    } finally {
      setPlacing(false);
    }
  };

  if (placed) {
    return (
      <>
        <PageHeader
          title="Order sent"
          subtitle="Thank you! We saved your order."
        />
        <div className="mx-auto w-full max-w-xl space-y-5 px-4 py-10 text-center sm:px-6">
          <div className="space-y-4 rounded-2xl border border-border bg-card p-6">
            <CheckCircle2 size={40} className="mx-auto text-primary" />
            <p className="text-muted-foreground">
              WhatsApp should have opened with your order. If it did not, tap
              the button below.
            </p>
            <WhatsAppButton message={placed.message} label="Open WhatsApp" />
            <p>
              <Link
                to={`/order/${placed.id}`}
                className="font-semibold text-primary underline underline-offset-4"
              >
                View your order
              </Link>
            </p>
          </div>
          <Link
            to="/shop"
            className="inline-block font-semibold text-primary underline underline-offset-4"
          >
            Keep shopping
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Your cart"
        subtitle="Review your items, then send your order on WhatsApp."
      />

      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        {isLoading ? (
          <CartBodySkeleton />
        ) : isError ? (
          <ProductsError onRetry={() => void refetch()} />
        ) : lines.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card px-4 py-12 text-center">
            <ShoppingCart size={36} className="mx-auto text-primary" />
            <p className="mt-3 font-heading text-xl font-semibold text-primary">
              Your cart is empty
            </p>
            <p className="mt-2 text-muted-foreground">
              Choose a size on any item and tap Add to cart.
            </p>
            <Link
              to="/shop"
              className="mt-5 inline-block rounded-full bg-primary px-6 py-2.5 font-semibold text-primary-foreground"
            >
              Browse the shop
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
            <div className="min-w-0 space-y-6">
              {items.length > 0 && (
                <ul className="divide-y divide-border rounded-2xl border border-border bg-card px-4">
                  {items.map((item) => (
                    <CartRow
                      key={item.key}
                      item={item}
                      onQuantity={setQuantity}
                      onRemove={remove}
                    />
                  ))}
                </ul>
              )}

              {unavailable.length > 0 && (
                <section className="rounded-2xl border border-border bg-secondary p-4">
                  <h2 className="font-heading font-semibold text-primary">
                    No longer available
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    These items are sold out or have been removed. They are left
                    out of your order.
                  </p>
                  <ul className="mt-3 space-y-2">
                    {unavailable.map(({ key, line, product }) => (
                      <li
                        key={key}
                        className="flex items-center justify-between gap-3"
                      >
                        <span className="min-w-0 truncate font-semibold">
                          {product ? product.name : "An item"}
                          {line.size && ` (size ${line.size})`}
                        </span>
                        <button
                          type="button"
                          onClick={() => remove(key)}
                          className="shrink-0 text-sm font-semibold text-primary underline underline-offset-4"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            <aside className="h-fit space-y-4 rounded-2xl border border-border bg-card p-5 lg:sticky lg:top-24">
              <h2 className="text-xl font-semibold text-primary">Summary</h2>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Items total</span>
                <span className="text-xl font-semibold">
                  {formatPrice(total)}
                </span>
              </div>

              <p className="text-sm text-muted-foreground">
                Delivery fees are confirmed with you on WhatsApp before you pay.
              </p>

              {items.length > 0 ? (
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="customer-name">Your name</Label>
                    <Input
                      id="customer-name"
                      value={name}
                      maxLength={80}
                      onChange={(event) => setName(event.target.value)}
                      autoComplete="name"
                    />
                  </div>

                  {error && (
                    <p
                      role="alert"
                      className="text-sm font-semibold text-primary"
                    >
                      {error}
                    </p>
                  )}

                  <Button
                    size="lg"
                    disabled={placing}
                    onClick={() => void handlePlace()}
                    className="w-full bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp hover:opacity-90"
                  >
                    {placing ? "Placing order..." : "Place order on WhatsApp"}
                  </Button>
                </div>
              ) : (
                <p className="text-sm font-semibold text-primary">
                  Nothing available to order right now.
                </p>
              )}

              {clearing ? (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => {
                      clear();
                      setClearing(false);
                    }}
                  >
                    Yes, clear
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setClearing(false)}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setClearing(true)}
                >
                  Clear cart
                </Button>
              )}
            </aside>
          </div>
        )}
      </div>
    </>
  );
}
