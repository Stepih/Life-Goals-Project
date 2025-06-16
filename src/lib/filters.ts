import { IGoal, ITodayTasks } from "@/interfaces/dashboardData";
import { IFilterState } from "@/interfaces/filter";

export const getCountFromTasks = (goals: IGoal[]) => {
  const result = { max: 0, mid: 0, min: 0 };
  goals.forEach(goal => {
    goal.tasks.forEach(task => {
      result[task.priority as keyof typeof result]++;
    });
  });
  return result;
};

export const getCountFromTodayTasks = (todayTasks: ITodayTasks[]) => {
  const result = { max: 0, mid: 0, min: 0 };
  todayTasks.forEach(task => {
    result[task.priority as keyof typeof result]++;
  });
  return result;
};

export const sortGoal = (
  goals: IGoal[],
  type: keyof IFilterState['goals'],
  reverse: boolean
) => {
  const arr = [...goals];

  if (type === "priority") {
    const getPriorityValue = (p: string) => {
      if (p === "max") return 3;
      if (p === "mid") return 2;
      return 1;
    };

    arr.sort((a, b) => getPriorityValue(b.priority) - getPriorityValue(a.priority));
  } else if (type === "achieved") {
    arr.sort((a, b) => {
      const aCompleted = a.tasks.filter(task => task.completed).length;
      const bCompleted = b.tasks.filter(task => task.completed).length;

      const aTotal = a.tasks.length
      const bTotal = b.tasks.length

      const aRatio = aTotal === 0 ? 0 : aCompleted / aTotal
      const bRatio = bTotal === 0 ? 0 : bCompleted / bTotal
      return aRatio - bRatio;
    });
  }

  return reverse ? arr.reverse() : arr;
};


