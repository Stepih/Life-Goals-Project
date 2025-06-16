"use client"

import { FC, useEffect, useState } from "react";

import Wrapper from "../SectionWrapper";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { normalizeDate } from "@/lib/date";
import { useSelector } from "react-redux";
import { RootState } from "@/store/dashboardStore";

type ProductivityDataPoint = {
  date: string;
  completedTasks: number;
}

const Productivity: FC = () => {

  const [productivityData, setProductivityData] = useState<ProductivityDataPoint[]>([]);

  const {todayTasks} = useSelector((state: RootState) => state.dashboard)

  useEffect(() => {
    const fetchProductivity = async () => {
      try {
        const res = await fetchWithAuth('/api/productivity/weekly', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (res.ok) {
        const data: ProductivityDataPoint[] = await res.json();
        const normalized = data.map(item => ({
            ...item,
            date: normalizeDate(item.date),
        }));
        setProductivityData(normalized);
        } else {
          setProductivityData([]);
        }
      } catch {
        setProductivityData([]);
      }
    };

    fetchProductivity();
  }, [todayTasks]); // будет запрос делаться при ачивки задачи и обновлять стату графика

  // высота графика (без учета текста снизу)
  const chartHeight = 160; // px

  // максимум для нормализации высот столбцов
  const maxTasks = Math.max(...productivityData.map(d => d.completedTasks), 1);

  if (productivityData.length === 0) {
    return (
         <Wrapper title="Продуктивность за неделю">
            <div className="text-gray-500 text-sm text-center w-full">
                <span className=''>УПС! Тут пока пусто</span>
            </div>
            
         </Wrapper>
    )
  }

  return (
    <Wrapper title="Продуктивность за неделю">
      <div>
        <div className="w-full h-[180px] flex gap-2 items-end justify-s">
          {productivityData.map(({ date, completedTasks }) => {
            const height = (completedTasks / maxTasks) * chartHeight;
            return (
                <div
                    key={date}
                    title={`${date}: ${completedTasks} выполнено`}
                    className="flex flex-col items-center"
                    style={{ flex: 1, minWidth: 20, maxWidth: 32 }} // ✅ maxWidth ограничивает ширину
                >
                    <div
                        className="bg-blue-500 rounded-t w-full"
                        style={{ height: `${height}px` }}>
                    </div>
                    
                    <div className="text-xs text-center text-blue-700 mt-1 select-none">
                        {completedTasks}
                    </div>
                </div>
            );
          })}
        </div>
        
        <div className="w-full flex gap-2 mt-2">
            {productivityData.map(({ date }) => (
                <div
                key={date}
                className="text-[10px] text-center text-gray-700 select-none"
                style={{ flex: 1, minWidth: 20, maxWidth: 32 }} // ограничение ширины
                >
                {new Date(date).toLocaleDateString('ru-RU', { weekday: 'short' })}
                </div>
            ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default Productivity;
