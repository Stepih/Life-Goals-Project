import { FC } from "react";

type LabelProps = {
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
};

const Label:FC<LabelProps> = ({ htmlFor, children, className = '' }) => {

  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}
    >
      {children}
    </label>
  );
}

export default Label