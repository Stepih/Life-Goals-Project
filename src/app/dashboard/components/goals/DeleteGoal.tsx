import { FC } from "react";
import { useDispatch } from "react-redux";
import { removeGoal } from "@/store/dashboardSlice";

import DeleteButton from "@/components/ui/buttons/DeleteButton";

import { fetchWithAuth } from "@/lib/fetchWithAuth";

const DeleteGoal:FC<{goalId: string}> = ({goalId}) => {

    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState("");

    const dispatch = useDispatch()

    const handleDeleteGoal = async () => {
        try {
            const res = await fetchWithAuth('/api/goals/delete', {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: goalId}),
            });
    
            // const data = await res.json();
    
            if (res.ok) {
                dispatch(removeGoal({id: goalId}))
            } else {
            // setError(data.error || "Ошибка");
            }
        } catch {
            // setError("Ошибка сети");
        } finally {
            // setLoading(false);
        }
    }

    return (
        <DeleteButton click={handleDeleteGoal} />
    )
}

export default DeleteGoal