"use client";

import { useState, useMemo } from "react";
import StepSelect from "./StepSelect";
import StepMultiSelect from "./StepMultiSelect";
import { useCart } from "@/hooks/useCart";
import ProductPreview from "./ProductPreview";
import CaseModelGrid from "./CaseModelGrid";


/* ===============================
   PRECIO DEL KIT
================================ */
function calculateKitPrice(kit, selection) {
  let price = kit.basePrice;

  kit.steps.forEach((step) => {
    const selected = selection[step.id];
    if (!selected) return;

    if (step.type === "select") {
  const options = getOptions(step, selection);

  // CASO ESPECIAL: modelo de funda con grid visual
  if (step.id === "case-model") {
  return (
    <div className="border-4 border-red-500 p-4">
      <p>DEBUG: AQUÍ DEBERÍA ESTAR LA GRID VISUAL</p>

      <CaseModelGrid
        caseType={selection["case-type"]}
        options={options}
        value={selection[step.id]}
        onSelect={(value) =>
          updateSelection(step.id, value)
        }
      />
    </div>
  );
}


  // SELECT NORMAL
  return (
    <StepSelect
      key={step.id}
      step={{ ...step, options }}
      value={selection[step.id]}
      onChange={(value) =>
        updateSelection(step.id, value)
      }
      disabled={
        step.dependsOn &&
        !selection[step.dependsOn]
      }
    />
  );
}


    if (step.type === "multi-select") {
      selected.forEach((label) => {
        const option = step.options.find(
          (opt) => opt.label === label
        );

        if (option?.priceModifier) {
          price += option.priceModifier;
        }
      });
    }
  });

  return price;
}

/* ===============================
   OBTENER OPCIONES DEPENDIENTES
================================ */
function getOptions(step, selection) {
  if (!step.dependsOn) return step.options;
  const parentValue = selection[step.dependsOn];
  if (!parentValue) return [];
  return step.optionsByParent?.[parentValue] || [];
}

/* ===============================
   COMPONENTE PRINCIPAL
================================ */
export default function KitConfigurator({ kit }) {
  const [selection, setSelection] = useState({});
  const { addItem } = useCart();

  const price = useMemo(
    () => calculateKitPrice(kit, selection),
    [kit, selection]
  );

  function updateSelection(stepId, value) {
    setSelection((prev) => ({
      ...prev,
      [stepId]: value,
    }));
  }

  function handleAddToCart() {
    addItem({
      id: kit.slug,
      name: kit.name,
      price,
      selection,
      quantity: 1,
    });

    alert("Producto añadido al carrito");
  }

  return (
  <section className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
    {/* CONFIGURADOR */}
    <div className="space-y-8">
      {kit.steps.map((step) => {
        if (step.type === "select") {
          const options = getOptions(step, selection);

          return (
            <StepSelect
              key={step.id}
              step={{ ...step, options }}
              value={selection[step.id]}
              onChange={(value) =>
                updateSelection(step.id, value)
              }
              disabled={
                step.dependsOn &&
                !selection[step.dependsOn]
              }
            />
          );
        }

        if (step.type === "multi-select") {
          return (
            <StepMultiSelect
              key={step.id}
              step={step}
              value={selection[step.id] || []}
              onChange={(value) =>
                updateSelection(step.id, value)
              }
            />
          );
        }

        return null;
      })}

      {/* PRECIO */}
      <div className="border-t pt-6">
        <p className="text-sm text-gray-500">Precio total</p>
        <p className="text-3xl font-semibold">
          {price.toFixed(2)} €
        </p>
      </div>

      {/* CTA */}
      <button
        onClick={handleAddToCart}
        className="w-full rounded-md bg-black px-6 py-3 text-white text-sm"
      >
        Añadir al carrito
      </button>
    </div>

    {/* PREVIEW VISUAL */}
    <ProductPreview selection={selection} />
  </section>
);

  
}
