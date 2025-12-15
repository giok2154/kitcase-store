"use client";

import { useEffect } from "react";

export default function SuccessPage() {
  useEffect(() => {
    fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kit: "Kit Protección Total",
        price: 49.99,
        status: "paid",
      }),
    });
  }, []);

  return (
    <main className="mx-auto max-w-xl px-6 py-24 text-center">
      <h1 className="text-3xl font-semibold">Pago completado 🎉</h1>
      <p className="mt-4 text-gray-600">
        Gracias por tu compra. Hemos recibido tu pedido correctamente.
      </p>

      <a
        href="/"
        className="mt-8 inline-block rounded-xl bg-black px-6 py-3 text-white"
      >
        Volver a la tienda
      </a>
    </main>
  );
}
