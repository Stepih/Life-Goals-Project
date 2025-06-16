"use client";
import { useState } from "react";

import TaskTitleBlock from "./TaskTitleBlock";
import TaskTimeBlock from "./TaskTimeBlock";
import TaskActions from "./TaskActions";
import Form from "../../form/CreateForm";

import Modal from "@/components/ui/modalPopup/Modal";

import { ITodayTasks } from "@/interfaces/dashboardData";

const TaskFull = ({ task }: { task: ITodayTasks }) => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const handleClick = () => {
    setIsFormOpen(true)
  };

  return (
    <div className='mb-8 p-4 rounded-lg border border-gray-200 transform-gpu will-change-transform antialiased transition-all duration-300 hover:-translate-y-[5px] hover:shadow-[0_5px_10px_rgba(0,0,0,0.1)]'>
      <TaskTitleBlock description={task.description} priority={task.priority} title={task.title} goalTitle={task.goal?.title} />
      <TaskTimeBlock scheduledFor={task.scheduledFor} />
      <TaskActions taskId={task.id} isCompleted={task.completed} onEdit={handleClick} />

      {isFormOpen && (
        <Modal title="Изменить задачу" onClose={() => setIsFormOpen(false)}>
          <Form type="createTask" goalId={task.goalId} updateData={task} />
        </Modal>
      )}
    </div>
  );
};

export default TaskFull;
