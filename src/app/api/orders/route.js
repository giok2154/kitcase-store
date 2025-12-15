import { saveOrder, getOrders } from "@/lib/ordersStore";

export async function POST(req) {
  try {
    const data = await req.json();

    saveOrder(data);

    return Response.json({ ok: true });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}

export async function GET() {
  return Response.json(getOrders());
}

