
import { useState } from "react";

import Form from "../form/CreateForm";
import TasksList from "../Tasks/TasksList";
import Modal from "@/components/ui/modalPopup/Modal";

import { IGoal } from "@/interfaces/dashboardData";

const GoalTasks = ({goal} : {goal: IGoal}) => {

    const [isFormOpen, setIsFormOpen] = useState(false);

    return (
        <div className='p-4 mt-5 -mx-4 rounded-b-lg border-t border-gray-200 px-4 py-3 bg-gray-50'>
          {isFormOpen && (
            <Modal title="Новая задача" onClose={() => setIsFormOpen(false)}>
              <Form goalId={goal.id} type="createTask" />
            </Modal>
          )}
          <div className='flex items-center justify-between'>
            <h3 className="text-lg font-normal">Задачи</h3>
            <button onClick={() => setIsFormOpen(true)} className="cursor-pointer text-blue-600 hover:text-blue-800 text-sm font-medium add-task">
              <i className="fas fa-plus mr-1"></i>
              Добавить
            </button>
            
          </div>
          <TasksList goalId={goal.id} tasks={goal.tasks} type="mini" />
      </div>
    )
}

export default GoalTasks