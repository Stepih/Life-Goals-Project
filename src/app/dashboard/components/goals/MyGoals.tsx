"use client";

import { FC, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/dashboardStore";
import { setGoalsFilter } from "@/store/dashboardSlice";

import Wrapper from "../SectionWrapper";
import GoalsList from "./GoalsList";
import Form from "../form/CreateForm";

import AddButton from "@/components/ui/buttons/AddButton";
import Modal from "@/components/ui/modalPopup/Modal";

import { sortGoal } from "@/lib/filters";
import { IFilterState } from "@/interfaces/filter";
import ResponsiveFilters from "@/components/responsiveFilters/ResponsiveFilters";

const MyGoals: FC<{ isLoading: boolean; error: string | null }> = ({ isLoading, error }) => {
  const dispatch = useDispatch<AppDispatch>();

  const goals = useSelector((state: RootState) => state.dashboard.goals);
  const filterState = useSelector((state: RootState) => state.dashboard.filterState.goals);

  const [filteredGoals, setFilteredGoals] = useState(goals);

  // Состояния направления сортировки для каждого фильтра
  const [reverse, setReverse] = useState<{ [key in keyof IFilterState['goals']]: boolean }>({
    priority: false,
    achieved: false,
  });

  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    let sortedGoals = [...goals];

    // Применяем сортировку по приоритету, если фильтр активен
    if (filterState.priority) {
      sortedGoals = sortGoal(sortedGoals, "priority", reverse.priority);
    }

    // Применяем сортировку по статусу, если фильтр активен
    if (filterState.achieved) {
      sortedGoals = sortGoal(sortedGoals, "achieved", reverse.achieved);
    }
    setFilteredGoals(sortedGoals);
  }, [goals, filterState, reverse]);

  
  const handleFilterClick = (type: keyof IFilterState['goals']) => {
  if (filterState[type]) {
    if (!reverse[type]) {
      // Был false — переключаем на true (реверс)
      setReverse({ ...reverse, [type]: true });
    } else {
      // Был true — выключаем фильтр и сбрасываем реверс
      dispatch(setGoalsFilter({ ...filterState, [type]: false }));
      setReverse({ ...reverse, [type]: false });
    }
  } else {
    // Фильтр выключен — включаем с реверсом false
    dispatch(setGoalsFilter({ ...filterState, [type]: true }));
    setReverse({ ...reverse, [type]: false });
  }
};

  if (isLoading) {
    return (
      <Wrapper title="Мои цели">
        <div>Загрузка...</div>
      </Wrapper>
    );
  }

  if (error) {
    return (
      <Wrapper title="Мои цели">
        <div className="text-red-500">Ошибка: {error}</div>
      </Wrapper>
    );
  }

  return (
    <Wrapper title="Мои цели">
      <div className="mb-4 flex justify-end items-center gap-2 -mt-10">
        <div className="flex gap-2 items-center">
          {filteredGoals.length !== 0 && <AddButton onClick={() => setIsFormOpen(true)} />}
            {goals.length > 1 && (
              <ResponsiveFilters
                filters={[
                  {
                    key: "priority",
                    title: "По приоритету",
                    active: filterState.priority,
                    reverse: reverse.priority,
                    onClick: () => handleFilterClick("priority"),
                    arrow: true
                  },
                  {
                    key: "achieved",
                    title: "По выполнению",
                    active: filterState.achieved,
                    reverse: reverse.achieved,
                    onClick: () => handleFilterClick("achieved"),
                    arrow: true
                  },
                ]}
              />
            )}
        </div>
      </div>

      {isFormOpen && (
        <Modal title="Новая цель" onClose={() => setIsFormOpen(false)}>
          <Form type="createGoal" />
        </Modal>
      )}
      
      {filteredGoals.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <i className="fas fa-bullseye text-4xl mb-3"></i>
          <p className="">У вас пока нет целей</p>
          <button
            onClick={() => setIsFormOpen(true)}
            className='cursor-pointer mt-4 text-blue-600 hover:text-blue-800 font-medium'>
            Создать первую цель
          </button>
        </div>
        
      ) : (
        <GoalsList goals={filteredGoals} />
      )}
    </Wrapper>
  );
};

export default MyGoals;
