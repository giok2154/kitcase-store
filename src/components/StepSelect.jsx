export default function StepSelect({
  step,
  value,
  onChange,
  disabled = false,
}) {
  return (
    <div className="border p-4 rounded">
      <h3 className="font-medium mb-2">{step.title}</h3>

      <select
        className="border rounded px-3 py-2 text-sm w-full"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      >
        <option value="">
          {disabled
            ? "Selecciona antes la opción anterior"
            : "Selecciona una opción"}
        </option>

        {step.options?.map((option) => {
          const label =
            typeof option === "string"
              ? option
              : option.label;

          return (
            <option key={label} value={label}>
              {label}
            </option>
          );
        })}
      </select>
    </div>
  );
}
