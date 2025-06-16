
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDashboardData, ITodayTasks } from "../interfaces/dashboardData";
import { ITask } from "../interfaces/dashboardData";
import { IGoal } from "../interfaces/dashboardData";
import { IFilterState } from "@/interfaces/filter";

interface UpdateTaskPayload {
  id: string;
  completed: boolean;
}

interface RemoveTaskPayload {
  id: string;
}
type RemoveGoalPayload = RemoveTaskPayload;

interface DashboardState extends IDashboardData {
  filterState: IFilterState
}

const initialState: DashboardState = {
  goals: [],
  todayTasks: [],
  userName: '',
  filterState: {
    goals: {
      priority: null,
      achieved: null
    },
    todayTask: 'day'
  }
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setDashboardData(state, action: PayloadAction<IDashboardData>) {
      state.goals = action.payload.goals;
      state.todayTasks = action.payload.todayTasks;
      state.userName = action.payload.userName;
    },
    setGoalsFilter: (state, action: PayloadAction<IFilterState['goals']>) => {
      state.filterState.goals = action.payload;
    },
    setTodayFilter: (state, action: PayloadAction<IFilterState['todayTask']>) => {
      state.filterState.todayTask = action.payload;
    },
    getAndUpdateTodayTasks(state, action: PayloadAction<ITodayTasks[]>) {
      state.todayTasks = action.payload;
    },
    updateTaskCompleted(state, action: PayloadAction<UpdateTaskPayload>) {
      const { id, completed } = action.payload;

      const todayTask = state.todayTasks.find(t => t.id === id);
      if (todayTask) {
        todayTask.completed = completed;
      }

      for (const goal of state.goals) {
        const task = goal.tasks.find(t => t.id === id);
        if (task) {
          task.completed = completed;

          // Обновляем поле achieved в зависимости от всех задач
          const allCompleted = goal.tasks.length > 0 && goal.tasks.every(t => t.completed);
          goal.achieved = allCompleted;

          break;
        }
      }
    },
    removeTask(state, action: PayloadAction<RemoveTaskPayload>) {
      const { id } = action.payload;

      state.todayTasks = state.todayTasks.filter(t => t.id !== id);

      for (const goal of state.goals) {
        const taskToRemove = goal.tasks.find(t => t.id === id);
        if (taskToRemove) {
          goal.tasks = goal.tasks.filter(t => t.id !== id);
          
          const hasTasks = goal.tasks.length > 0;
          const allCompleted = goal.tasks.every(t => t.completed);
          goal.achieved = hasTasks ? allCompleted : true;

          break;
        }
      }
    },

    createGoal(state, action: PayloadAction<IGoal>) {
      state.goals.push(action.payload);
    },
    createTask(state, action: PayloadAction<ITask>) {
      
      const {goalId} = action.payload
      for (let i=0; i<state.goals.length;i++) {
        if (state.goals[i].id === goalId) {
          state.goals[i].tasks.push(action.payload)
          state.goals[i].achieved = false;
          break;
        }
      }
    },
    removeGoal(state, action: PayloadAction<RemoveGoalPayload>) {
      
      state.goals = state.goals.filter(t => t.id !== action.payload.id);

      state.todayTasks = state.todayTasks.filter(t => t.goalId !== action.payload.id);
    },
    updateTask(state, action: PayloadAction<ITask>) {
      const { id } = action.payload;

      const todayTask = state.todayTasks.find(t => t.id === id);
      if (todayTask) {
        todayTask.title = action.payload.title
        todayTask.scheduledFor = action.payload.scheduledFor
      }
      
      state.goals.forEach(goal => {
        goal.tasks.forEach((task, idx) => {
          if (task.id === id) {
            goal.tasks[idx] = action.payload
            
          }
        })
      })
    },

    reorderTasks(state, action: PayloadAction<{ goalId: string; tasks: ITask[] }>) {
      const { goalId, tasks } = action.payload;
      const goal = state.goals.find(g => g.id === goalId);
      if (goal) {
        goal.tasks = tasks.map((task, index) => ({ ...task, order: index + 1 }));
      }
    },


    updateGoal(state, action: PayloadAction<IGoal>) {
      const { id } = action.payload;

      const todayTask = state.todayTasks.find(t => t.goalId === id);
      if (todayTask) {
        todayTask.goal = {title: action.payload.title}
      }
      
      state.goals.forEach((goal, idx) => {
        if (goal.id === id) {
          state.goals[idx] = action.payload
        }
      })
    }
}});

export const { setDashboardData, setGoalsFilter, setTodayFilter, updateTaskCompleted, reorderTasks, getAndUpdateTodayTasks, updateTask, removeTask, createGoal, createTask, removeGoal, updateGoal  } = dashboardSlice.actions;
export default dashboardSlice.reducer;
