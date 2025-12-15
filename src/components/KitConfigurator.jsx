"use client";

import { useState } from "react";
import StepSelect from "./StepSelect";
import StepMultiSelect from "./StepMultiSelect";
import ProductPreview from "./ProductPreview";
import StickyCTA from "./StickyCTA";
import { useCart } from "@/hooks/useCart";

export default function KitConfigurator({ kit }) {
  const [selection, setSelection] = useState({});
  const { addItem } = useCart();

  // ===============================
  // ACTUALIZAR SELECCIÓN
  // ===============================
  const updateSelection = (stepId, value) => {
    setSelection((prev) => ({
      ...prev,
      [stepId]: value,
    }));

    // Scroll inteligente en móvil
    if (stepId === "case-model" && window.innerWidth < 768) {
      setTimeout(() => {
        document
          .getElementById("kit-cta")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }
  };

  // ===============================
  // PRECIO TOTAL (ÚNICA FUENTE)
  // ===============================
  const extrasTotal = (selection["extras"] || []).reduce(
    (sum, item) => sum + (item.priceModifier || 0),
    0
  );

  const totalPrice = kit.basePrice + extrasTotal;

  // ===============================
  // READY STATE
  // ===============================
  const isReady =
    selection["iphone-model"] &&
    selection["case-type"] &&
    selection["case-model"];

  // ===============================
  // AÑADIR AL CARRITO
  // ===============================
  const handleAddToCart = () => {
    addItem({
      kitSlug: kit.slug,
      name: kit.name,
      selection,
      price: totalPrice,
    });
  };

  async function handleCheckout() {
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: [
          {
            name: kit.name,
            price: totalPrice,
          },
        ],
      }),
    });

    const data = await response.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Error iniciando el pago");
    }
  }
  const isComplete =
  Boolean(selection["iphone-model"]) &&
  Boolean(selection["case-model"]);



  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
      {/* CONFIGURADOR */}
      <section className="space-y-6">
        {kit.steps.map((step) => {
          const value = selection[step.id];

          if (step.type === "select") {
            let options = step.options || [];

            if (step.dependsOn) {
              const parentValue = selection[step.dependsOn];
              options = step.optionsByParent?.[parentValue] || [];
            }

            return (
              <StepSelect
                key={step.id}
                label={step.title}
                value={value}
                options={options}
                disabled={step.dependsOn && !selection[step.dependsOn]}
                onChange={(val) =>
                  updateSelection(step.id, val)
                }
              />
            );
          }

          if (step.type === "multi-select") {
            return (
              <StepMultiSelect
                key={step.id}
                label={step.title}
                value={value || []}
                options={step.options}
                onChange={(val) =>
                  updateSelection(step.id, val)
                }
              />
            );
          }

          return null;
        })}

        {/* PRECIO */}
        <div className="border-t pt-4">
          <p className="text-sm text-gray-500">
            Precio total
          </p>
          <p className="text-2xl font-semibold">
            {totalPrice.toFixed(2)} €
          </p>
        </div>

        {/* CTA DESKTOP */}
        <button
          onClick={handleCheckout}
          disabled={!isComplete}
          className="w-full rounded-xl bg-black py-4 text-white disabled:opacity-40"
        >
          Añadir al carrito
        </button>


        {/* MICROCOPY */}
        <p className="text-xs text-gray-500 text-center">
          Envío rápido · Garantía de calidad · Devolución fácil
        </p>
      </section>

      {/* PREVIEW */}
      <ProductPreview selection={selection} />

      {/* CTA STICKY MÓVIL */}
      <StickyCTA
        price={totalPrice}
        isReady={isReady}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}
