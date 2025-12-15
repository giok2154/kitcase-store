import { caseImages } from "@/data/caseImages";

export default function ProductPreview({ selection }) {
  const caseType = selection["case-type"];
  const caseModel = selection["case-model"];

  let title = "Selecciona tu funda";
  let description =
    "Elige el tipo y modelo de funda para ver la vista previa.";
  let image = "/placeholder-case.png";

  if (caseType && caseModel) {
    title = caseModel;
    description = `${caseType} compatible con tu iPhone`;
    image = caseImages[caseModel] || image;
  }

  return (
    <aside className="relative rounded-2xl bg-gray-50 p-8 flex flex-col items-center justify-center min-h-[420px] transition-all">
      
      {/* Imagen */}
      <div className="relative w-full flex justify-center mb-6">
        <img
          key={image} // fuerza animación al cambiar
          src={image}
          alt={title}
          className="w-64 max-w-full transition-all duration-300 ease-out scale-100"
        />
      </div>

      {/* Texto */}
      <div className="text-center space-y-2">
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>

      {/* Badges */}
      <div className="flex gap-2 mt-4">
        <span className="text-xs px-3 py-1 bg-white border rounded-full">
          Incluido en el kit
        </span>
        <span className="text-xs px-3 py-1 bg-white border rounded-full">
          Protección total
        </span>
      </div>

    </aside>
  );
}
