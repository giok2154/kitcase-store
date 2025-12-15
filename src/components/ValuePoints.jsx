export default function ValuePoints({ kit }) {
  const points = [
    "Protección completa incluida",
    "Instalación fácil, sin burbujas",
    "Compatible con MagSafe",
    "Envío rápido desde Europa",
    "Garantía de calidad",
  ];

  return (
    <ul className="mt-4 space-y-2 text-sm text-gray-700">
      {points.map((point) => (
        <li key={point} className="flex items-start gap-2">
          <span className="mt-1 text-black">✓</span>
          <span>{point}</span>
        </li>
      ))}
    </ul>
  );
}
