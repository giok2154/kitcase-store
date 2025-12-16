import Stripe from "stripe";
import { Resend } from "resend";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    // 1️⃣ Body RAW (correcto en App Router)
    const body = await req.text();

    // 2️⃣ Headers (Next 16)
    const headersList = await headers();
    const signature = headersList.get("stripe-signature");

    if (!signature) {
      return new Response("No Stripe signature", { status: 400 });
    }

    // 3️⃣ Verificar evento
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("❌ Webhook signature error:", err.message);
      return new Response("Webhook error", { status: 400 });
    }

    // 4️⃣ Evento pago completado
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const email = session.customer_details?.email;
      const amount = (session.amount_total / 100).toFixed(2);
      const stripeSessionId = session.id;

      console.log("✅ PAGO COMPLETADO DESDE STRIPE");
      console.log({ stripeSessionId, email, amount });

      // 5️⃣ Email cliente
      if (email) {
        await resend.emails.send({
          from: "KitCase <onboarding@resend.dev>",
          to: email,
          subject: "✅ Pedido confirmado – KitCase",
          html: `
            <h2>Gracias por tu compra 🎉</h2>
            <p>Hemos recibido correctamente tu pedido.</p>

            <ul>
              <li><strong>Pedido:</strong> ${stripeSessionId}</li>
              <li><strong>Importe:</strong> €${amount}</li>
              <li><strong>Email:</strong> ${email}</li>
            </ul>

            <p>En breve comenzaremos la preparación de tu pedido.</p>
            <p>— <strong>KitCase</strong></p>
          `,
        });

        console.log("📧 Email enviado correctamente");
      }
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });

  } catch (error) {
    console.error("🔥 Error en webhook:", error);
    return new Response("Server error", { status: 500 });
  }
}
