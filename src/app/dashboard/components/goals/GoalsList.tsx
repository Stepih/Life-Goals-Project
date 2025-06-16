import Goal from "./Goal"
import { IGoal } from "@/interfaces/dashboardData"

const GoalsList = ({goals}: {goals: IGoal[]}) => {

    return (
        <div className="flex flex-col gap-8">
            {goals.map(goal => (
                <Goal key={goal.id} goal={goal} />
            ))}
        </div>
        
    )
}

export default GoalsList