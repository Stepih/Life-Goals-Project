"use client";

import { FC } from "react";

interface AddButtonProps {
  onClick: () => void;
  title?: string;
  className?: string;
}

const AddButton: FC<AddButtonProps> = ({ onClick, title = "", className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg flex items-center ${className}`}
    >
      <i className='fas fa-plus text-2xs'></i>
      {title}
    </button>
  );
};

export default AddButton;
