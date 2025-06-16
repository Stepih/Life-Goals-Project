"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTaskCompleted } from "@/store/dashboardSlice";
import { RootState } from "@/store/dashboardStore";

import { fetchWithAuth } from "@/lib/fetchWithAuth";


const TaskCheckbox = ({ taskId, textCheck }: { taskId: string, textCheck?:boolean }) => {
  const dispatch = useDispatch();
  const completed = useSelector((state: RootState) => {
    const fromToday = state.dashboard.todayTasks.find(t => t.id === taskId);
    if (fromToday) return fromToday.completed;
  
    for (const goal of state.dashboard.goals) {
      const task = goal.tasks.find(t => t.id === taskId);
      if (task) return task.completed;
    }
  
    return undefined;
  });
  


  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");

  const handleToggle = async () => {
    if (completed === undefined) return;

    // setError("");
    setLoading(true);

    try {
      const res = await fetchWithAuth("/api/tasks/completed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: taskId, completed: !completed }),
      });

      // const data = await res.json();

      if (res.ok) {
        dispatch(updateTaskCompleted({ id: taskId, completed: !completed }));
      } else {
        // setError(data.error || "Ошибка");
      }
    } catch {
      // setError("Ошибка сети");
    } finally {
      setLoading(false);
    }
  };

  if (completed === undefined) return null;

  return (
    <div className='flex gap-1 items-center'>
      <input
          className='cursor-pointer'
          type="checkbox"
          checked={completed}
          disabled={loading}
          onChange={handleToggle}
        />
        {textCheck && <span className='text-sm text-gray-700'>Выполнено</span>}
    </div>
    
  );
};

export default TaskCheckbox;
