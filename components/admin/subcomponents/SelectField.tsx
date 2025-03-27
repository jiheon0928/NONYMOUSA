import React, { JSX } from "react";

type OptionType = {
  value: string;
  label: string;
};

type SelectFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: OptionType[];
  required?: boolean;
  className?: string;
};

export default function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
  className = "",
}: SelectFieldProps): JSX.Element {
  return (
    <div>
      <label className="block font-semibold mb-1">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full border border-gray-300 rounded px-3 py-2 ${className}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
