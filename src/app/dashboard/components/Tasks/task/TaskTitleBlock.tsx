
import Priority from "../../Priority";

import { TypePriority } from "@/interfaces/priority";

const TaskTitleBlock = ({ title, goalTitle, priority, description }: { title: string, goalTitle?: string, priority: TypePriority, description: string | null }) => (
    <div className='overflow-hidden flex justify-between items-start gap-1'>
        <div>
            <h2 className='font-medium'>{title}</h2>
            {goalTitle && <div className='text-sm text-gray-500'>Для цели &quot;{goalTitle}&quot;</div>}
            {description && <div className='text-sm text-gray-500'>Описание: {description}</div>}
        </div>
        <Priority type='big' priority={priority} />
    </div>
    
  );
  
  export default TaskTitleBlock;
  