"use client"
import { useState } from "react";

import Priority from "../Priority";
import DeleteGoal from "./DeleteGoal";
import GoalTasks from "./GoalTasks";
import Form from "../form/CreateForm";

import Modal from "@/components/ui/modalPopup/Modal";
import EditButton from "@/components/ui/buttons/EditButton";
import ProgressBar from "@/components/progressBar/ProgressBar";

import { IGoal } from "@/interfaces/dashboardData";

const Goal = ({ goal }: { goal: IGoal }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const calcProgress = () => {
    const lgt = goal.tasks.length
    let countChecked = 0

    goal.tasks.forEach(task => {
      if (task.completed) {
        countChecked += 1
      }
    })
    return countChecked ? Math.round((countChecked / lgt) * 100) : countChecked
  }

  return (
    <div className={`${goal.achieved ? 'opacity-50' : 'opacity-100'} p-4 pb-0 relative rounded-lg border border-gray-200 transition-all duration-300 transform-gpu will-change-transform antialiased hover:-translate-y-[5px] hover:shadow-[0_5px_10px_rgba(0,0,0,0.1)]`}>
      <div className="relative ">
        <div className='flex justify-between items-start'>
          <h2 className="block max-w-[80%] font-semibold text-lg break-words">{goal.title}</h2>
          <div className="flex gap-4 items-center">
            <Priority type='big' priority={goal.priority} />
            <EditButton click={() => setIsFormOpen(true)} />
            <DeleteGoal goalId={goal.id} />
          </div>
        </div>
        <span className="block text-sm text-gray-500 mb-4">{goal.description}</span>
        <ProgressBar progress={calcProgress()} />
      </div>
      <GoalTasks goal={goal} />

      {isFormOpen && (
        <Modal title="Изменить цель" onClose={() => setIsFormOpen(false)}>
          <Form type="createGoal" updateData={goal} />
        </Modal>
      )}
    </div>
  );
};

export default Goal;
