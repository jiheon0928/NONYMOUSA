import React, { JSX } from "react";

type InputFieldProps = {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
};

export const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  required = false,
  className = "",
}: InputFieldProps): JSX.Element => (
  <div>
    <label className="block font-semibold mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`w-full border border-gray-300 rounded px-3 py-2 ${className}`}
    />
  </div>
);

export default InputField;
