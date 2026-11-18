import type { OrderStep } from "@/types";

export const DELIVERY = {
  coverage: "Nationwide delivery",
  courier: "GIG Logistics",
  prepTime: "2 business days",
  deliveryTime: "2 days",
  fees: "Confirmed on WhatsApp when you place your order.",
  paymentMethods: "Bank transfer or card",
  paymentNote:
    "Payment details are shared on WhatsApp after you confirm your order.",
  returns: "No refunds.",
  sizeExchange:
    "We do not offer refunds. If you are unsure of your size, message us on WhatsApp before you order and we will help you choose.",
};

export const ORDER_STEPS: OrderStep[] = [
  {
    title: "Message us on WhatsApp",
    text: "Tap the order button on any item to start a chat with us.",
  },
  {
    title: "Confirm your item and size",
    text: "We check availability and answer any questions.",
  },
  {
    title: "Pay",
    text: "We send you the payment details. You pay by bank transfer or card.",
  },
  {
    title: "We dispatch",
    text: "Your order is prepared and sent to you.",
  },
];
