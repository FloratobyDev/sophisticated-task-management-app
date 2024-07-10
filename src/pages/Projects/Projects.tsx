import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import InputWithButton from "../../components/InputWithButton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProjects, addProject } from "../../api";
import { ProjectType } from "../../types";

const SomeProject = () => {
  const [projectList, setProjectList] = useState<ProjectType[]>([]);
  const [projectName, setProjectName] = useState<string>("");
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  console.log(data)

  const mutation = useMutation({
    mutationFn: addProject,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });

  const onProjectCreate = (projectName: string) => {
    return () => {
      const newProject: ProjectType = {
        id: uuidv4(),
        name: projectName,
      };
      mutation.mutate(newProject);
      setProjectList([...projectList, newProject]);
    };
  };

  const removeProject = (projectID: string) => {
    setProjectList(projectList.filter((project) => project.id !== projectID));
  };

  const onProjectNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
  };

  return (
    <div className="p-4 border rounded-md">
      <h1 className="mb-2">Simple Task Application</h1>
      <InputWithButton
        placeholderValue="Project Name"
        buttonName="Create Project"
        value={projectName}
        onValueChange={onProjectNameChange}
        addValue={onProjectCreate}
      />
      <div>
        {projectList.map((projectName) => (
          <div
            key={projectName.id}
            className="flex gap-x-2 mt-2 items-center justify-between px-1 rounded-md cursor-pointer"
          >
            <span>{projectName.name}</span>
            <button
              className="border rounded-md px-2 py-0.5"
              onClick={() => removeProject(projectName.id)}
            >
              Remove Project
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SomeProject;
