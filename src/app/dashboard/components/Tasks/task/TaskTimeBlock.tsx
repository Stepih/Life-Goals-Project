import { normalizeDate } from "@/lib/date";

const TaskTimeBlock = ({ scheduledFor }: { scheduledFor: Date | null }) => {
  if (!scheduledFor) return null;

  return (
    <div className="flex items-center text-sm text-gray-600 mt-3">
      <i className="far fa-clock mr-1"></i>
      {normalizeDate(String(scheduledFor))}
    </div>
  );
};

export default TaskTimeBlock;
