import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("❌ Webhook error:", err.message);
    return NextResponse.json({ error: "Webhook error" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const stripeSessionId = session.id;
    const email = session.customer_details?.email;
    const amount = (session.amount_total / 100).toFixed(2);

    console.log("✅ PAGO COMPLETADO DESDE STRIPE");
    console.log({ stripeSessionId, email, amount });

    // 🗄️ GUARDAR PEDIDO EN SUPABASE (con idempotencia + estados correctos)

    // 1️⃣ Comprobar si el pedido ya existe (idempotencia)
    const { data: existingOrder } = await supabase
      .from("orders")
      .select("id")
      .eq("stripe_session_id", stripeSessionId)
      .maybeSingle();

    if (existingOrder) {
      console.log("⚠️ Pedido ya registrado, se ignora");
      return NextResponse.json({ received: true });
    }

    // 2️⃣ Insertar pedido como pagado
    await supabase.from("orders").insert([
      {
        stripe_session_id: stripeSessionId,
        email,
        amount,
        currency: session.currency,
        status: "paid",
      },
    ]);

    // 3️⃣ Pasar automáticamente a processing
    await supabase
      .from("orders")
      .update({ status: "processing" })
      .eq("stripe_session_id", stripeSessionId);


    // 📧 EMAIL CLIENTE
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
          <p>— <strong>KitCase</strong></p>
        `,
      });

      console.log("📧 Email cliente enviado correctamente");
    }
  }

  return NextResponse.json({ received: true });
}
