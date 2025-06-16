"use client"
import { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import {RootState } from "@/store/dashboardStore";

import Wrapper from "../SectionWrapper"
import TasksList from "./TasksList"
import { IFilterState } from "@/interfaces/filter";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { getAndUpdateTodayTasks, setTodayFilter } from "@/store/dashboardSlice";

import ResponsiveFilters from "@/components/responsiveFilters/ResponsiveFilters";


interface IMyTodoTasks  {
    error: string | null;
    isLoading: boolean
}

const MyTodoTasks:FC<IMyTodoTasks> = ({isLoading, error}) => {
    const dispatch = useDispatch()

    const { todayTasks } = useSelector((state: RootState) => state.dashboard);
    const filterState = useSelector((state: RootState) => state.dashboard.filterState.todayTask);

    const handleGetTasks = async (filter: IFilterState['todayTask']) => {
        const req = await fetchWithAuth(`/api/tasks/today?range=${filter}`)
        if (req.ok) {
            const res = await req.json()
            dispatch(getAndUpdateTodayTasks(res))
            dispatch(setTodayFilter(filter))
        }
    }

    if (isLoading) {
        return (
            <Wrapper title="Задачи на сегодня">
                <div className="p-4 text-center">Загрузка задач...</div>
            </Wrapper>
        );
    }

    if (error) {
        return (
            <Wrapper title="Задачи на сегодня">
                <div className="p-4 text-red-500">
                    Ошибка: {error}
                    <button 
                        onClick={() => window.location.reload()}
                        className="ml-2 text-blue-500 hover:text-blue-700"
                    >
                        Попробовать снова
                    </button>
                </div>
            </Wrapper>
        );
    }

    return (
        <Wrapper title={`Задачи на ${filterState === 'day' ? "сегодня" : filterState === 'month' ? "месяц" : "неделю"}`}>
            <div className='flex gap-2 justify-end -mt-10 mb-5'>
                <ResponsiveFilters filters={
                    [
                        {
                            key: 'todayTask',
                            title: "День",
                            value: 'day',
                            active: filterState === 'day',
                            onClick: () => handleGetTasks("day"),
                            arrow: false
                        },
                        {
                            key: 'todayTask',
                            title: "Неделя",
                            value: 'week',
                            active: filterState === 'week',
                            onClick: () => handleGetTasks("week"),
                            arrow: false
                        },
                        {
                            key: 'todayTask',
                            title: "Месяц",
                            value: 'month',
                            active: filterState === 'month',
                            onClick: () => handleGetTasks("month"),
                            arrow: false
                        }
                    ]
                } />
            </div>
            <TasksList type='full' tasks={todayTasks} />
        </Wrapper>
    );
}

export default MyTodoTasks;