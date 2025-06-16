import { useState } from "react"

import TaskCheckbox from "./TaskCheckbox "
import DeleteTask from "./DeleteTask"
import Form from "../../form/CreateForm"
import Priority from "../../Priority"

import Modal from "@/components/ui/modalPopup/Modal"
import EditButton from "@/components/ui/buttons/EditButton"

import { ITask } from "@/interfaces/dashboardData"
import FinishIcon from "@/components/ui/FinishIcon"

const TaskMini = ({task, isDrug} : {task: ITask, isDrug: boolean}) => {

    const [isFormOpen, setIsFormOpen] = useState(false)
      const handleClick = () => {
        setIsFormOpen(true)
      };

    return (
        <div className={`relative my-3 p-3 flex items-center justify-between ${!isDrug ? 'bg-white' : 'bg-grey'}  rounded-lg border border-gray-200`}>
            <div className='flex items-center gap-3 min-h-[24px]'>
                {!isDrug && <TaskCheckbox taskId={task.id} />}
                <h2 className='font-bold text-xs'>{task.title}</h2>
                {isDrug && <div className='font-bold text-2xs absolute right-2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'>{task.order}</div>}
            </div>
            
            {!isDrug && (
                <div className='flex items-center gap-4'>
                    <Priority priority={task.priority} type='small' />
                    {!task.completed ? (
                        <>
                            <EditButton click={handleClick} />
                            <DeleteTask idTask={task.id} />
                        </>
                    ) : (
                        <FinishIcon />
                    )}
                    
                </div>
            )}

            {isFormOpen && (
                <Modal title="Изменить задачу" onClose={() => setIsFormOpen(false)}>
                    <Form type="createTask" goalId={task.goalId} updateData={task} />
                </Modal>
            )}
        </div>
    )
}

export default TaskMini