import { useCallback, useState, MouseEvent } from "react";
import { TaskType } from "../../types";
import ChecklistItem from "./ChecklistItem";
import Cancel01Icon from "../../icons/Cancel01Icon";

type Props = {
  task: TaskType;
  onTaskRemove: () => void;
  onChecklistRemove: (checklistId: string) => void;
};

const TaskItem = ({ task, onTaskRemove, onChecklistRemove }: Props) => {
  const [showChecklist, setShowChecklist] = useState(false);

  const toggleChecklist = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      setShowChecklist(!showChecklist);
    },
    [showChecklist]
  );

  return (
    <div tabIndex={0} key={task.id} onClick={toggleChecklist}>
      <div className="flex justify-between py-1 px-2">
        <div className="flex gap-x-2">
          <input type="checkbox" />
          <p>{task.description}</p>
        </div>
        <button onClick={onTaskRemove}>
          <Cancel01Icon />
        </button>
      </div>
      {showChecklist &&
        task.checklists.map((checklistItem) => (
          <ChecklistItem
            key={checklistItem.id}
            checklistItem={checklistItem}
            onChecklistRemove={() => onChecklistRemove(checklistItem.id)}
          />
        ))}
    </div>
  );
};

export default TaskItem;
