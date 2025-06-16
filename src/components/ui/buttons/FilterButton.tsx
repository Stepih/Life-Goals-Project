import { FC } from "react";

const FilterButton: FC<{title: string, onClick: () => void, reverse?: boolean, active?: boolean | null, arrow: boolean}> = ({arrow, title, onClick, reverse = false, active = false }) => {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-lg text-sm
        ${active ? "bg-blue-200 text-blue-800 font-semibold" : ""}
      `}
    >
      {title}
      {active && arrow && (
        <i className={`fas fa-arrow ${reverse ? "fa-arrow-up" : "fa-arrow-down"} ml-2`}></i>
      )}
    </button>
  );
};

export default FilterButton;
