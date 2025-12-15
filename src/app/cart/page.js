"use client";

import { useCart } from "@/hooks/useCart";

export default function CartPage() {
  const { cart, clearCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-2xl font-semibold">Carrito</h1>
        <p className="mt-4 text-gray-600">
          Tu carrito está vacío.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-16 space-y-8">
      <h1 className="text-2xl font-semibold">Carrito</h1>

      <div className="space-y-6">
        {cart.map((item, index) => (
          <div
            key={index}
            className="border rounded p-4 space-y-2"
          >
            <h2 className="font-medium">{item.name}</h2>

            <ul className="text-sm text-gray-600">
              {Object.entries(item.selection).map(
                ([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong>{" "}
                    {Array.isArray(value)
                      ? value.join(", ")
                      : value}
                  </li>
                )
              )}
            </ul>

            <p className="font-semibold">
              {item.price.toFixed(2)} €
            </p>
          </div>
        ))}
      </div>

      <div className="border-t pt-6 space-y-4">
        <p className="text-xl font-semibold">
          Total: {total.toFixed(2)} €
        </p>

        <button
          className="w-full rounded-md bg-black px-6 py-3 text-white text-sm"
          onClick={() =>
            alert("Checkout próximamente")
          }
        >
          Ir a pagar
        </button>

        <button
          className="w-full text-sm text-gray-500 underline"
          onClick={clearCart}
        >
          Vaciar carrito
        </button>
      </div>
    </main>
  );
}

