// components/TextAreaField.tsx
import React, { JSX } from "react";

type TextAreaFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
};

export default function TextAreaField({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  required = false,
  className = "",
}: TextAreaFieldProps): JSX.Element {
  return (
    <div>
      <label className="block font-semibold mb-1">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full border border-gray-300 rounded px-3 py-2 ${className}`}
      />
    </div>
  );
}
