'use client';

import Label from "./Label";


type AreaFieldProps = {
  name: string;
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  rows?: number;
  cols?: number;
};

export default function AreaField({
  name,
  label,
  value,
  onChange,
  required = false,
  rows = 4,
  cols,
}: AreaFieldProps) {
  return (
    <div>
      {label && <Label htmlFor={name}>{label}</Label>}
      <textarea
        id={name}
        name={name}
        className="w-full border border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
        cols={cols}
      />
    </div>
  );
}
