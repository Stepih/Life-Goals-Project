"use client"

import { FC, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/dashboardStore";

import Wrapper from "../SectionWrapper";

import FilterButton from "@/components/ui/buttons/FilterButton";

import { getCountFromTasks, getCountFromTodayTasks } from "@/lib/filters";

const DistributionTasks:FC = () => {

    const [switchFilter, setSwitchFilter] = useState(false)

    const {goals, todayTasks} = useSelector((state: RootState) => state.dashboard);
    const {todayTask} = useSelector((state: RootState) => state.dashboard.filterState);
    const [priority, setPriority] = useState({max: 0, mid: 0, min: 0});

    const getPriorities = useCallback(() => {
        if (!switchFilter) {
        return getCountFromTasks(goals);
        } else {
        return getCountFromTodayTasks(todayTasks);
        }
    }, [switchFilter, goals, todayTasks]);
    
    useEffect(() => {
        const counts = getPriorities();
        setPriority(counts);
    }, [getPriorities]);

    return (
        <Wrapper title={`${switchFilter ? (todayTask === 'day' ? 'Задачи сегодня' : todayTask === 'month' ? 'Задачи на месяц' : 'Задачи на неделю') : 'Всего'}`}>
            <div className="flex justify-end -mt-10 mb-5">
                <FilterButton arrow={false} onClick={()=>setSwitchFilter(prev => !prev)} title={`
                ${!switchFilter ? (todayTask === 'day' ? 'За сегодня' : todayTask === 'month' ? 'За месяц' : 'За неделю') : 'Всего'}`} />
            </div>
            
            <div className='flex flex-col items-center gap-4 '>
                            
                <div className='grid grid-cols-3 gap-2 text-center mb-4'>
                    <div className='bg-red-50 p-2 rounded-lg'>
                        <p className='text-xs text-gray-500'>Высокий приоритет</p>
                        <span className='font-semibold'>{priority.max}</span>
                    </div>
                    <div className='bg-yellow-50 p-2 rounded-lg'>
                        <p className='text-xs text-gray-500'>Средний приоритет</p>
                        <span className='font-semibold'>{priority.mid}</span>
                    </div>
                    <div className='bg-green-50 p-2 rounded-lg'>
                        <p className='text-xs text-gray-500'>Низкий приоритет</p>
                        <span className='font-semibold'>{priority.min}</span>
                    </div>
                </div>
            
            </div>
            
            
        </Wrapper>
    )
}


export default DistributionTasks