export default function StepSelect({
  label,
  value,
  options = [],
  onChange,
  disabled = false,
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">
        {label}
      </label>

      <select
        value={value || ""}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded-md px-3 py-2"
      >
        <option value="" disabled>
          Selecciona una opción
        </option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
