export const kits = [
  {
    slug: "proteccion-total",
    name: "Kit Protección Total",
    description:
      "Incluye funda, protector de pantalla y protector de cámaras. Protección completa al mejor precio.",
    basePrice: 49.99,

    steps: [
      {
        id: "iphone-model",
        title: "Selecciona tu iPhone",
        type: "select",
        options: [
          "iPhone 12",
          "iPhone 12 Pro",
          "iPhone 12 Pro Max",
          "iPhone 13",
          "iPhone 13 Pro",
          "iPhone 13 Pro Max",
          "iPhone 14",
          "iPhone 14 Pro",
          "iPhone 14 Pro Max",
          "iPhone 15",
          "iPhone 15 Pro",
          "iPhone 15 Pro Max",
          "iPhone 16",
          "iPhone 16 Pro",
          "iPhone 16 Pro Max",
          "iPhone 17",
          "iPhone 17 Pro",
          "iPhone 17 Pro Max",
        ],
      },
      {
        id: "case-type",
        title: "Tipo de funda",
        type: "select",
        options: [
          { label: "Funda estándar", priceModifier: 0 },
          { label: "Funda MagSafe", priceModifier: 0 },
        ],
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
];
