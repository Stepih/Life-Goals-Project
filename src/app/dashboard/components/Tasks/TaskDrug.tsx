"use client";

import { useRef, useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/dashboardStore";
import { reorderTasks } from "@/store/dashboardSlice";

import TaskMini from "./task/TaskMini";

import { fetchWithAuth } from "@/lib/fetchWithAuth";

const TaskDndList = ({ goalId }: { goalId: string }) => {
  const dispatch = useDispatch();

  const [isDrug, setIsDrug] = useState(false)

  const tasks = useSelector((state: RootState) =>
    state.dashboard.goals.find(goal => goal.id === goalId)?.tasks || []
  );

  const onDragEnd = (result: DropResult) => {
    
    if (!result.destination) return;
    
    const reordered = Array.from(tasks);
    const [movedTask] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, movedTask);
    dispatch(reorderTasks({ goalId, tasks: reordered }));
};

  const sendTaskServer = () => {

    fetchWithAuth("/api/tasks/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tasks.map((t, index) => ({ id: t.id, order: index + 1 })))
    });
  }

  const countRef = useRef(0)
  const handleDC = () => {
    
    if (countRef.current === 1) {
        countRef.current = 0
        setIsDrug(false)
        sendTaskServer()
    } else {
        countRef.current = 1
        setIsDrug(true)
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {tasks.map((task, index) => (
              <Draggable isDragDisabled={!isDrug} key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="mb-2"
                    onDoubleClick={handleDC}
                  >
                    <TaskMini isDrug={isDrug} task={task} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskDndList;
