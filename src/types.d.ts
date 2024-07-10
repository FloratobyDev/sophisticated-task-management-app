export type ProjectType = {
  id: string;
  name: string;
};

export type TaskType = {
  id: string;
  description: string;
  projectId: string;
  checklists: ChecklistType[];
  groupId: string;
};

export type ChecklistType = {
  id: string;
  description: string;
  taskId: string;
  completed: boolean;
};

export type GroupType = {
  id: string;
  name: string;
};
