import { FC } from "react";

import { TypePriority } from "@/interfaces/priority";

const Priority: FC<{ priority: TypePriority, type: 'big' | 'small' }> = ({ priority, type }) => {
  let bg = "";
  let color = "";
  let label = "";

  switch (priority) {
    case "min":
      bg = "bg-green-100";
      color = "text-green-800";
      label = "Низкий";
      break;
    case "mid":
      bg = "bg-yellow-100";
      color = "text-yellow-800";
      label = "Средний";
      break;
    case "max":
      bg = "bg-red-100";
      color = "text-red-800";
      label = "Высокий";
      break;
  }

  return (
    <span className={`${bg} ${color} ${type === 'small' && 'rounded-4xl h-4'} text-xs px-2 py-0.5 rounded-full`}>
      {type === 'big' && label}
    </span>
  );
};

export default Priority;
