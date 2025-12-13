export const kits = [
  {
    slug: "proteccion-total",
    name: "Kit Protección Total",
    description: "Protección completa para tu iPhone.",
    basePrice: 59,
    steps: [
      {
        id: "iphone-model",
        title: "Selecciona tu iPhone",
        type: "select",
        options: ["iPhone 13", "iPhone 14", "iPhone 15", "iPhone 16"],
      },
      {
        id: "case-type",
        title: "Tipo de funda",
        type: "select",
        options: [
          { label: "Funda estándar", priceModifier: 0 },
          { label: "Funda MagSafe", priceModifier: 10 },
        ],
      },
      {
        id: "extras",
        title: "Extras opcionales",
        type: "multi-select",
        options: [
          { label: "Protector de cámaras", priceModifier: 5 },
          { label: "Powerbank MagSafe", priceModifier: 25 },
        ],
      },
    ],
  },
  {
    slug: "magsafe-pro",
    name: "Kit MagSafe Pro",
    description: "Accesorios MagSafe con máxima compatibilidad.",
    basePrice: 69,
    steps: [
      {
        id: "iphone-model",
        title: "Selecciona tu iPhone",
        type: "select",
        options: ["iPhone 14", "iPhone 15", "iPhone 16"],
      },
      {
        id: "accessories",
        title: "Accesorios incluidos",
        type: "multi-select",
        options: [
          { label: "Tarjetero MagSafe", priceModifier: 0 },
          { label: "Soporte coche MagSafe", priceModifier: 10 },
        ],
      },
    ],
  },
];
