import { FC } from "react";

const ProgressBar:FC<{ progress: number }> = ({ progress } ) => {
  return (
    <div>
      <div className="flex items-center justify-between font-medium rounded">
        <span className="text-sm font-medium text-gray-700">Прогресс</span>
        <span>{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
