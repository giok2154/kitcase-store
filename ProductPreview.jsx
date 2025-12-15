export default function ProductPreview({ selection }) {
  const caseType = selection["case-type"];
  const caseModel = selection["case-model"];

  // Estado base
  let title = "Selecciona tu funda";
  let description = "Elige el tipo y modelo de funda para ver la vista previa.";
  let image = "/placeholder-case.png";

  // Lógica visual (más adelante será dinámica con imágenes reales)
  if (caseType && caseModel) {
    title = caseModel;
    description = `${caseType} compatible con tu iPhone`;

    if (caseType === "Funda MagSafe") {
      image = "/placeholder-magsafe.png";
    }

    if (caseType === "Funda estándar") {
      image = "/placeholder-standard.png";
    }
  }

  return (
    <aside className="border rounded p-6 space-y-4">
      <img
        src={image}
        alt={title}
        className="w-full max-w-sm mx-auto"
      />

      <div className="text-center">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </aside>
  );
}
