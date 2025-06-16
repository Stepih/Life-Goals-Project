import { FC } from "react";
import { useDispatch } from "react-redux";
import { removeTask } from "@/store/dashboardSlice";
import DeleteButton from "@/components/ui/buttons/DeleteButton";

import { fetchWithAuth } from "@/lib/fetchWithAuth";


const DeleteTask:FC<{idTask: string}> = ({idTask}) => {

    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState("");

    const dispatch = useDispatch()

    const handleDeleteGoal = async () => {
        try {
            const res = await fetchWithAuth('/api/tasks/delete', {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: idTask}),
            });
    
            // const data = await res.json();
    
            if (res.ok) {
                dispatch(removeTask({id: idTask}))
            } else {
            // setError(data.error || "Ошибка");
            }
        } catch  {
            // setError("Ошибка сети");
        } finally {
            // setLoading(false);
        }
    }

    return (
        <DeleteButton click={handleDeleteGoal} />
    )
}

export default DeleteTask