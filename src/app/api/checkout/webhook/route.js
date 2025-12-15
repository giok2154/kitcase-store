import Stripe from "stripe";
import { headers } from "next/headers";
import { saveOrder } from "@/lib/ordersStore";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const body = await req.text();

  // 🔑 FIX CRÍTICO NEXT.JS
  const h = await headers();
  const signature = h.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("❌ Webhook signature error:", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    console.log("✅ PAGO COMPLETADO DESDE STRIPE");
    console.log({
      stripeSessionId: session.id,
      email: session.customer_details?.email,
      amount: session.amount_total / 100,
    });

    saveOrder({
      stripeSessionId: session.id,
      email: session.customer_details?.email,
      amount: session.amount_total / 100,
      currency: session.currency,
      status: "paid",
    });
  }

  return new Response("ok", { status: 200 });
}
