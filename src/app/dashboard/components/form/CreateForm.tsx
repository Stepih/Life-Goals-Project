"use client"

import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker"

import { createGoal, createTask, getAndUpdateTodayTasks, updateGoal, updateTask } from "@/store/dashboardSlice";

import InputField from "@/components/ui/form/InputField";
import SubmitButton from "@/components/ui/buttons/SubmitButton";

import { fetchWithAuth } from "@/lib/fetchWithAuth";

import { ICreateGoal, ICreateTask, IGoal, ITask, ITodayTasks } from "@/interfaces/dashboardData";
import { RootState } from "@/store/dashboardStore";

import AreaField from "@/components/ui/form/AreaField";
import SelectField from "@/components/ui/form/SelectField";
import { TypePriority } from "@/interfaces/priority";

import "react-datepicker/dist/react-datepicker.css";
import ModalInfo from "@/components/ui/modalPopup/ModalInfo";
import { AnimatePresence } from "framer-motion";

type Props = {
    type: 'createGoal' | 'createTask';
    goalId?: string | null;
    updateData?: IGoal | ITask;
}

const Form:FC<Props> = ({type, goalId, updateData}) => {

    const filterState = useSelector((state: RootState) => state.dashboard.filterState.todayTask);

    const isTaskForm = (form: ICreateGoal | ICreateTask): form is ICreateTask => {
        return 'goalId' in form;
    };

    let api
    let checkdType: ICreateGoal | ICreateTask;

    if (type === "createGoal") {
        checkdType = {
            title: updateData && !isTaskForm(updateData) ? updateData.title : '',
            description: updateData && !isTaskForm(updateData) ? updateData.description : '',
            priority: updateData ? updateData.priority : 'min'
        };
        api = !updateData ? `goals/${type}` : `goals/update`
    } else {
        checkdType = {
            title: updateData && isTaskForm(updateData) ? updateData.title : '',
            goalId: goalId ?? null,
            scheduledFor: updateData && isTaskForm(updateData) ? updateData.scheduledFor : new Date(),
            priority: updateData ? updateData.priority : 'min',
            description: updateData ? updateData.description : ''
        };
        api = !updateData ? `tasks/${type}` : `tasks/update`
    }

    const [form, setForm] = useState(checkdType);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsLoading(true); 
    
        try {
        const res = await fetchWithAuth(`/api/${api}`, {
            method: updateData ? "PUT" : "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({...form, id: updateData?.id}),
        });
    
        const getupdateData:IGoal | ITask = await res.json();
    
        if (res.ok) {
            setSuccess('Успешно!');
            if (!isTaskForm(getupdateData)) {
                if (updateData) {
                    dispatch(updateGoal(getupdateData))
                } else {
                    dispatch(createGoal(getupdateData))
                }
                
            } else {
                const res = await fetchWithAuth(`/api/tasks/today?range=${filterState}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });
                const getToday:ITodayTasks[] = await res.json()
                if (updateData) {
                    dispatch(updateTask(getupdateData))
                } else {
                    dispatch(createTask(getupdateData))
                }
                dispatch(getAndUpdateTodayTasks(getToday))
            }
        } else {
            setError('Ошибка');
        }
        } catch {
        setError('Произошла ошибка запроса');
        } finally {
        setIsLoading(false);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };
     const handleDateChange = (date: Date | null) => {
        setForm(prev => ({ ...prev, scheduledFor: date }));
    }

    const priorityField = (
    <SelectField
        name="priority"
        label="Приоритет *"
        value={form.priority}
        onChange={(e) =>
        setForm((prev) => ({
            ...prev,
            priority: e.target.value as TypePriority,
        }))
        }
        options={[
        { value: 'min', label: 'Минимальный' },
        { value: 'mid', label: 'Средний' },
        { value: 'max', label: 'Максимальный' },
        ]}
    />
    );
     
    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <InputField
                required
                name="title"
                type="text"
                label="Название *"
                value={form.title}
                onChange={handleChange}
            />
            <AreaField
                name="description"
                label="Описание"
                value={form.description ? form.description : ''}
                onChange={handleChange}
            />
            
            {isTaskForm(form) ? (
                <div className="flex gap-4">
                    <div className="w-1/2">
                        <label htmlFor="scheduledFor" className="block text-sm font-medium text-gray-700 mb-1">
                            Дата
                        </label>
                        <DatePicker
                            id="scheduledFor"
                            selected={form.scheduledFor}
                            onChange={handleDateChange}
                            
                            dateFormat="yyyy-MM-dd"
                            placeholderText="Выберите дату"
                            className="w-full border border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div className="w-1/2">
                        {priorityField}
                    </div>
                </div>
                ) : (
                <>
                    {priorityField}
                </>
                )}

            <SubmitButton loading={isLoading}>
            Сохранить
            </SubmitButton>
            <AnimatePresence>
                {error && <ModalInfo error={error} />}
                {success && <ModalInfo success={success} />}
            </AnimatePresence>
        </form>   
    )
}

export default Form