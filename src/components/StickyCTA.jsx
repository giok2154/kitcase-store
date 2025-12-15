"use client";

export default function StickyCTA({
  price,
  isReady,
  onAddToCart,
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t p-4 flex items-center justify-between gap-4 lg:hidden">
      <div>
        <p className="text-xs text-gray-500">Precio total</p>
        <p className="text-lg font-semibold">
          {price.toFixed(2)} €
        </p>
      </div>

      <button
        disabled={!isReady}
        onClick={onAddToCart}
        className={`px-6 py-3 rounded-lg text-white font-medium transition
          ${
            isReady
              ? "bg-black"
              : "bg-gray-300 cursor-not-allowed"
          }`}
      >
        {isReady ? "Añadir" : "Completa"}
      </button>
    </div>
  );
}
