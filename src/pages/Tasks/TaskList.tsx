import TaskItem from "./TaskItem";
import { TaskType } from "../../types";

type Props = {
  taskList: TaskType[];
  onTaskRemove: (id: string) => () => void;
  onChecklistRemove: (taskId: string) => (checklistId: string) => void;
};

const TaskList = ({ taskList, onTaskRemove, onChecklistRemove }: Props) => {
  return (
    <div>
      {taskList.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onTaskRemove={onTaskRemove(task.id)}
          onChecklistRemove={onChecklistRemove(task.id)}
        />
      ))}
    </div>
  );
};

export default TaskList;
