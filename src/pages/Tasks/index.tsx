import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProjectTasks } from "../../api";
import Menu01Icon from "../../icons/Menu01Icon";
import InputWithButton from "../../components/InputWithButton";
import { useCallback, useEffect, useState } from "react";
import { ChecklistType, GroupType, TaskType } from "../../types";
import { v4 as uuidv4 } from "uuid";
import ArrowLeft02Icon from "../../icons/ArrowLeft02Icon";
import Input from "../../components/Input";
import Button from "../../components/Button";
import PlusSignIcon from "../../icons/PlusSignIcon";
import TaskList from "./TaskList";
import GroupList from "./GroupList";

const ProjectTasks = () => {
  const { projectId } = useParams();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjectTasks(projectId!),
  });

  const [taskList, setTaskList] = useState<TaskType[]>([]);
  const [checklist, setChecklist] = useState<string[]>([]);
  const [showChecklistForm, setShowChecklistForm] = useState<boolean>(false);
  const [groups, setGroups] = useState<GroupType[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const [showGroup, setShowGroup] = useState<boolean>(true);
  const [checklistItem, setChecklistItem] = useState<string>("");
  const [taskName, setTaskName] = useState<string>("");

  const onShowGroup = () => {
    setShowGroup(!showGroup);
  };

  const onGroupClick = (groupId: string) => {
    return () => {
      setSelectedGroup(groupId);
    };
  };

  const onTaskNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.target.value);
  };

  const onTaskCreate = useCallback(
    (taskName: string) => {
      return () => {
        const taskdId = uuidv4();

        const modifiedChecklist: ChecklistType[] = checklist.map(
          (checklistItem) => ({
            id: uuidv4(),
            description: checklistItem,
            taskId: taskdId,
            completed: false,
          })
        );

        const newTask: TaskType = {
          id: taskdId,
          description: taskName,
          projectId: projectId!,
          checklists: modifiedChecklist,
          groupId: "",
        };
        setShowChecklistForm(false);
        setChecklist([]);
        setTaskName("");
        setTaskList([...taskList, newTask]);
      };
    },
    [checklist, projectId, taskList]
  );

  const onChecklistItemCreate = useCallback(
    (checklistItem: string) => {
      return () => {
        setChecklistItem("");
        setChecklist([...checklist, checklistItem]);
      };
    },
    [checklist]
  );

  const onChecklistItemChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setChecklistItem(e.target.value);
    },
    []
  );

  const onChecklistItemDelete = useCallback(
    (checklistItemId: string) => {
      return () => {
        const newChecklist = checklist.filter(
          (checklistItem) => checklistItem !== checklistItemId
        );
        setChecklist(newChecklist);
      };
    },
    [checklist]
  );

  useEffect(() => {
    //on enter key press, create task
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        if (showChecklistForm) {
          onChecklistItemCreate(checklistItem)();
        } else {
          if (taskName.trim() !== "") onTaskCreate(taskName)();
        }
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && (event.key === "E" || event.key === "e")) {
        event.preventDefault(); // Prevent the default action of Ctrl + E
        console.log("Ctrl + E key press prevented");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keypress", handleKeyPress);

    return () => {
      // Detach the event listener from the document
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [
    checklistItem,
    onChecklistItemCreate,
    onTaskCreate,
    showChecklistForm,
    taskName,
  ]);

  const onTaskRemove = (taskId: string) => {
    return () => {
      const newTaskList = taskList.filter((task) => task.id !== taskId);
      setTaskList(newTaskList);
    };
  };
  const onChecklistRemove = (taskId: string) => {
    return (checklistId: string) => {
      const newTaskList = taskList.map((task) => {
        if (task.id === taskId) {
          const newChecklist = task.checklists.filter(
            (checklist) => checklist.id !== checklistId
          );
          return { ...task, checklists: newChecklist };
        }
        return task;
      });
      setTaskList(newTaskList);
    };
  };

  return (
    <div className="flex">
      <div className="flex-1">
        <div className="flex justify-between w-full py-2">
          <button>
            <ArrowLeft02Icon />
          </button>
          <h1>Project Tasks</h1>
          <button onClick={onShowGroup}>
            <Menu01Icon />
          </button>
        </div>
        <h3 className="my-2 text-sm font-semibold">General</h3>
        <div className="w-full flex gap-x-2">
          <Input
            placeholderValue="Task Name"
            value={taskName}
            onValueChange={onTaskNameChange}
          />
          <Button
            onClick={() => {
              setShowChecklistForm(!showChecklistForm);
            }}
          >
            <PlusSignIcon />
          </Button>
          <Button onClick={onTaskCreate(taskName)}>Create Task</Button>
        </div>
        <div>
          {showChecklistForm && (
            <div className="flex flex-col">
              <div className="py-1">
                {checklist.map((checklistItem) => (
                  <div
                    className="flex justify-between bg-gray-100 rounded-md px-2 py-1 my-0.5"
                    key={checklistItem}
                  >
                    {checklistItem}
                    <button onClick={onChecklistItemDelete(checklistItem)}>
                      Delete
                    </button>
                  </div>
                ))}
              </div>
              <InputWithButton
                value={checklistItem}
                onValueChange={onChecklistItemChange}
                addValue={onChecklistItemCreate}
                placeholderValue="Checklist Item"
                buttonName="Add"
              />
            </div>
          )}
        </div>
        <TaskList
          taskList={taskList}
          onTaskRemove={onTaskRemove}
          onChecklistRemove={onChecklistRemove}
        />
      </div>
      {showGroup && <GroupList groups={groups} onClick={onGroupClick} />}
    </div>
  );
};

export default ProjectTasks;
