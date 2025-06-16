'use client';

import Label from "./Label";

type InputFieldProps = {
  name: string;
  type: string;
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
};

export default function InputField({
  name,
  type,
  label,
  value,
  onChange,
  required = false,
}: InputFieldProps) {
  return (
    <div>
      {label && <Label htmlFor={name}>{label}</Label>}
      <input
        id={name}
        name={name}
        type={type}
        className="w-full border border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}
