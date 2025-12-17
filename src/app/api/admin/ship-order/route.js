import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const { orderId, status } = await req.json();

  const { data: order } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", orderId)
    .select()
    .single();

  if (!order) {
    return NextResponse.json({ error: "Pedido no encontrado" }, { status: 404 });
  }

  // Email SOLO cuando se envía
  if (status === "shipped") {
    await resend.emails.send({
      from: "KitCase <onboarding@resend.dev>",
      to: order.email,
      subject: "📦 Tu pedido ha sido enviado – KitCase",
      html: `
        <h2>Tu pedido va en camino 🚚</h2>
        <p>Pedido: <strong>${order.stripe_session_id}</strong></p>
        <p>Gracias por confiar en KitCase.</p>
      `,
    });
  }

  return NextResponse.json({ success: true });
}
