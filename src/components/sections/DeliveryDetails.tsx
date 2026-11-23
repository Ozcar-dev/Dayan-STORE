import type { ComponentType } from "react";
import { Clock, RotateCcw, Truck, Wallet } from "lucide-react";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { DELIVERY } from "@/constants/delivery";
import { OrderSteps } from "@/components/sections/OrderSteps";
import { SITE } from "@/constants/site";

interface Fact {
  label: string;
  value: string;
}

interface Block {
  title: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  facts: Fact[];
}

const BLOCKS: Block[] = [
  {
    title: "Delivery",
    icon: Truck,
    facts: [
      { label: "Where", value: DELIVERY.coverage },
      { label: "Courier", value: DELIVERY.courier },
      { label: "Delivery time", value: DELIVERY.deliveryTime },
      { label: "Delivery fees", value: DELIVERY.fees },
    ],
  },
  {
    title: "Preparing your order",
    icon: Clock,
    facts: [
      { label: "Ready in", value: DELIVERY.prepTime },
      { label: "We are online", value: SITE.hours },
    ],
  },
  {
    title: "Payment",
    icon: Wallet,
    facts: [
      { label: "Methods", value: DELIVERY.paymentMethods },
      { label: "Details", value: DELIVERY.paymentNote },
    ],
  },
  {
    title: "Returns",
    icon: RotateCcw,
    facts: [
      { label: "Refunds", value: DELIVERY.returns },
      { label: "If it does not fit", value: DELIVERY.sizeExchange },
    ],
  },
];

export function DeliveryDetails() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-12 px-4 py-10 sm:px-6">
      <div className="grid gap-4 md:grid-cols-2">
        {BLOCKS.map((block) => (
          <section
            key={block.title}
            className="min-w-0 rounded-2xl border border-border bg-card p-5"
          >
            <h2 className="flex items-center gap-2 text-xl font-semibold text-primary">
              <block.icon size={22} />
              {block.title}
            </h2>
            <dl className="mt-4 space-y-3">
              {block.facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-sm font-semibold text-muted-foreground">
                    {fact.label}
                  </dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>

      <section>
        <h2 className="text-center text-3xl font-semibold text-primary">
          How to order
        </h2>
        <div className="mt-6">
          <OrderSteps />
        </div>
      </section>

      <section className="rounded-2xl bg-secondary p-6 text-center">
        <p className="font-heading text-xl font-semibold">
          Questions about delivery?
        </p>
        <WhatsAppButton
          message="Hello, I have a question about delivery."
          label="Ask us on WhatsApp"
          className="mt-4"
        />
      </section>
    </div>
  );
}
