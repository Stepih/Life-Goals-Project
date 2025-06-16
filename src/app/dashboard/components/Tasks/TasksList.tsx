"use client";

import TaskFull from "./task/TaskFull.tsx";
import TaskDndList from "./TaskDrug";

import { ITask, ITodayTasks } from "@/interfaces/dashboardData.js";

type Tasks =
  | {
      type: "mini";
      tasks: ITask[];
      goalId: string;
    }
  | {
      type: "full";
      tasks: ITodayTasks[];
    };

function isFullTasks(props: Tasks): props is { type: "full"; tasks: ITodayTasks[]} {
  return props.type === "full";
}

const TasksList = (props: Tasks) => {
  const { type, tasks } = props;
  

  if (type === "mini") {
    return (
      tasks.length === 0 ? (
        <div className="p-5 bg-zinc-50">
          <h4 className="text-center py-2 text-gray-500 text-sm">Нет задач</h4>
        </div>
      ) : (
        <div>
          {props.goalId && <TaskDndList goalId={props.goalId} />}
        </div>
      )
    );
  }

  if (isFullTasks(props)) {
    return (
      tasks.length === 0 ? (
        <div className="p-5 text-center text-gray-500">
          <i className='fas fa-check-circle text-3xl mb-1'></i>
          <h4 className="py-2  text-sm">Задач нет</h4>
        </div>
      ) : (
        <div>
          {tasks.map((task, index) => (
            <TaskFull key={index} task={task} />
          ))}
        </div>
      )
    );
  }

  return null;
};

export default TasksList;
