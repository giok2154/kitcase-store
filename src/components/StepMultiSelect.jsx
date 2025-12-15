export default function StepMultiSelect({
  step,
  value,
  onChange,
}) {
  function toggle(optionLabel) {
    if (value.includes(optionLabel)) {
      onChange(value.filter((v) => v !== optionLabel));
    } else {
      onChange([...value, optionLabel]);
    }
  }

  return (
    <div className="border p-4 rounded">
      <h3 className="font-medium mb-2">{step.title}</h3>

      <div className="space-y-2">
        {step.options.map((option) => {
          const label =
            typeof option === "string"
              ? option
              : option.label;

          return (
            <label
              key={label}
              className="flex items-center gap-2 text-sm"
            >
              <input
                type="checkbox"
                checked={value.includes(label)}
                onChange={() => toggle(label)}
              />
              {label}
            </label>
          );
        })}
      </div>
    </div>
  );
}
