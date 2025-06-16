import { FC, useState, useEffect } from "react";
import FilterButton from "../ui/buttons/FilterButton";

import { IFilterState } from "@/interfaces/filter";

type GoalFilterKey = keyof IFilterState['goals']; // 'priority' | 'achieved'

type TodayTaskFilterValue = 'day' | 'week' | 'month';

type FilterItem =
  | {
        key: GoalFilterKey;
        title: string;
        active: boolean | null;
        reverse?: boolean;
        onClick: () => void;
        arrow: boolean;
    }
  | {
        key: 'todayTask';
        title: string;
        value: TodayTaskFilterValue;
        active: boolean;
        reverse?: never;
        onClick: () => void;
        arrow: boolean;
    };

const ResponsiveFilters: FC<{ filters: FilterItem[] }> = ({ filters }) => {
    const [isMobile, setIsMobile] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 500);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    if (!filters.length) return null;

    return (
        <div className="relative">
        {isMobile ? (
            <div>
            <button
                className="text-xl"
                onClick={() => setDropdownOpen((prev) => !prev)}
            >
                <i className="fa-solid fa-sliders"></i>
            </button>
            {dropdownOpen && (
                <div style={{ right: '100%' }} className="absolute z-10 mt-2 bg-white border border-gray-200 rounded-lg shadow-md p-2 w-40">
                {filters.map((filter, i) => (
                    <div className="my-3 flex" key={filter.key + i}>
                        <FilterButton
                            reverse={filter.reverse}
                            active={filter.active}
                            title={filter.title}
                            onClick={() => {
                            filter.onClick();
                            setDropdownOpen(false); // Закрывать после выбора
                            }}
                            arrow={filter.arrow}
                        />
                    </div>
                    
                ))}
                </div>
            )}
            </div>
        ) : (
            <div className="flex gap-2">
            {filters.map((filter, i) => (
                <FilterButton
                    arrow={filter.arrow}
                    key={filter.key + i}
                    reverse={filter.reverse}
                    active={filter.active}
                    title={filter.title}
                    onClick={filter.onClick}
                />
            ))}
            </div>
        )}
        </div>
    );
};

export default ResponsiveFilters;
