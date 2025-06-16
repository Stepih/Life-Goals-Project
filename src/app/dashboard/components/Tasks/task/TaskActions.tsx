import FinishIcon from "@/components/ui/FinishIcon";
import TaskCheckbox from "./TaskCheckbox ";
import EditButton from "@/components/ui/buttons/EditButton";

const TaskActions = ({ taskId, onEdit, isCompleted }: { taskId: string, onEdit: () => void, isCompleted: boolean }) => (
  <div className='mt-3 flex justify-between items-center'>
    <TaskCheckbox textCheck taskId={taskId} />
      {!isCompleted ? <EditButton click={onEdit} /> : <FinishIcon />}
  </div>
);

export default TaskActions;
