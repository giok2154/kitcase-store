export default function StepMultiSelect({
  label,
  value = [],
  options = [],
  onChange,
}) {
  const toggleOption = (option) => {
    const exists = value.find((v) => v.label === option.label);

    if (exists) {
      onChange(value.filter((v) => v.label !== option.label));
    } else {
      onChange([...value, option]);
    }
  };

  return (
    <div className="border rounded p-4 transition border-gray-300">
      <p className="font-medium mb-3">{label}</p>

      <div className="space-y-2">
        {options.map((option) => {
          const checked = value.some(
            (v) => v.label === option.label
          );

          return (
            <label
              key={option.label}
              className="flex items-center gap-2 text-sm cursor-pointer"
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggleOption(option)}
              />
              <span>
                {option.label}
                {option.priceModifier
                  ? ` (+${option.priceModifier} €)`
                  : ""}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
