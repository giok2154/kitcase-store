export default function CaseModelGrid({
  caseType,
  value,
  options = [],
  onSelect,
}) {
  if (!caseType) return null;

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Elige tu funda</h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {options.map((model) => {
          const selected = value === model;

          return (
            <button
              key={model}
              onClick={() => onSelect(model)}
              className={`border rounded p-3 text-center space-y-2 transition
                ${
                  selected
                    ? "border-black ring-1 ring-black"
                    : "hover:border-gray-400"
                }
              `}
            >
              <img
                src="/placeholder-case.png"
                alt={model}
                className="w-full"
              />

              <span className="text-sm">{model}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
