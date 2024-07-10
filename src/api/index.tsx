import { ProjectType } from "../types";
const API_URL = "http://localhost:3001";

export const getProjects = async () => {
  const response = await fetch(`${API_URL}/projects`);
  const data = await response.json();
  return data;
};

export const addProject = async (projectInfo: ProjectType) => {
  const response = await fetch(`${API_URL}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(projectInfo),
  });
  const data = await response.json();
  return data;
};

export const deleteProject = async (id: string) => {
  const response = await fetch(`${API_URL}/projects/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
};

export const getProjectTasks = async (projectId: string) => {
  const response = await fetch(`${API_URL}/projects/${projectId}/tasks`);
  const data = await response.json();
  return data;
};

export const addProjectTask = async (projectId: string, name: string) => {
  const response = await fetch(`${API_URL}/projects/${projectId}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
  const data = await response.json();
  return data;
};