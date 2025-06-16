export interface IFilterState {
  goals: {
    priority: boolean | null; // true - сортировка по возрастанию, false - по убыванию, null - без сортировки
    achieved: boolean | null;
  },
  todayTask: 'day' | 'week' | 'month'
}
