import { iphoneModels } from "./iphoneModels";

export const kits = [
  // =========================
  // KIT 1 — PROTECCIÓN TOTAL
  // =========================
  {
    slug: "proteccion-total",
    name: "Kit Protección Total",
    description:
      "Incluye funda, protector de pantalla y protector de cámaras. Protección completa al mejor precio.",
    basePrice: 49.99,
    steps: [
      {
        id: "iphone-model",
        title: "Modelo de iPhone",
        type: "select",
        options: iphoneModels,
      },
      {
        id: "case-type",
        title: "Tipo de funda",
        type: "select",
        options: ["Funda estándar", "Funda MagSafe"],
      },
      {
        id: "case-model",
        title: "Modelo de funda",
        type: "select",
        dependsOn: "case-type",
        optionsByParent: {
          "Funda estándar": [
            "Transparente",
            "Mate negra",
            "Silicona",
            "Antigolpes",
          ],
          "Funda MagSafe": [
            "Transparente MagSafe",
            "Mate MagSafe",
            "Silicona MagSafe",
            "Crossbody MagSafe",
          ],
        },
      },
      {
        id: "extras",
        title: "Accesorios adicionales",
        type: "multi-select",
        options: [
          { label: "Powerbank MagSafe", priceModifier: 25 },
          { label: "Soporte coche MagSafe", priceModifier: 15 },
          { label: "Tarjetero MagSafe", priceModifier: 12 },
        ],
      },
    ],
  },

  // =========================
  // KIT 2 — MAGSAFE PRO
  // =========================
  {
    slug: "magsafe-pro",
    name: "Kit MagSafe Pro",
    description:
      "La experiencia MagSafe completa con accesorios premium incluidos.",
    basePrice: 69.99,
    steps: [
      {
        id: "iphone-model",
        title: "Modelo de iPhone",
        type: "select",
        options: iphoneModels,
      },
      {
        id: "case-model",
        title: "Modelo de funda MagSafe",
        type: "select",
        options: [
          "Transparente MagSafe",
          "Mate MagSafe",
          "Silicona MagSafe",
          "Crossbody MagSafe",
        ],
      },
      {
        id: "extras",
        title: "Accesorios incluidos",
        type: "multi-select",
        options: [
          { label: "Powerbank MagSafe", priceModifier: 0 },
          { label: "Soporte coche MagSafe", priceModifier: 0 },
        ],
      },
    ],
  },

  // =========================
  // KIT 3 — MINIMAL
  // =========================
  {
    slug: "minimal",
    name: "Kit Minimal",
    description:
      "Protección esencial con un diseño limpio y ligero.",
    basePrice: 34.99,
    steps: [
      {
        id: "iphone-model",
        title: "Modelo de iPhone",
        type: "select",
        options: iphoneModels,
      },
      {
        id: "case-model",
        title: "Modelo de funda",
        type: "select",
        options: ["Transparente", "Mate negra"],
      },
    ],
  },

  // =========================
  // KIT 4 — OUTDOOR
  // =========================
  {
    slug: "outdoor",
    name: "Kit Outdoor",
    description:
      "Protección extrema para aventuras y uso intensivo.",
    basePrice: 59.99,
    steps: [
      {
        id: "iphone-model",
        title: "Modelo de iPhone",
        type: "select",
        options: iphoneModels,
      },
      {
        id: "case-model",
        title: "Modelo de funda",
        type: "select",
        options: ["Antigolpes"],
      },
      {
        id: "extras",
        title: "Accesorios recomendados",
        type: "multi-select",
        options: [
          { label: "Powerbank MagSafe", priceModifier: 20 },
        ],
      },
    ],
  },
];
