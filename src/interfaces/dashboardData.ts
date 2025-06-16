import { TypePriority } from "./priority";

export interface IUser {
    id: string;
    email: string;
    password: string;
    createdAt: Date;
    refreshToken: string | null;
}


export interface IDashboardData {
  goals: IGoal[];
  todayTasks: ITodayTasks[];
  userName: string    
}

export interface ITask extends ICreateTask {
  id: string;
  completed: boolean;
  createdAt: Date;
  userId: string;
  order: number;
  completedAt: Date | null;
}

export interface ICreateTask {
  title: string;
  goalId: string | null;
  scheduledFor: Date | null;
  priority: TypePriority;
  description: string | null
}

export interface ITodayTasks extends ITask {
  goal: {
    title: string
  } | null
}



export interface IGoal extends ICreateGoal {
    id: string;
    userId: string;
    tasks: ITask[];
    createdAt: Date;
    achieved: boolean;
}

export interface ICreateGoal {
    title: string;
    description: string | null;
    priority: TypePriority
}