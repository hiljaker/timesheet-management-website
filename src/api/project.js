import { queryClient } from "@src/components/providers/TanstackQueryProvider";
import axios from "@src/utils/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

const projectsKey = "projects";

const fetchProjects = async () => {
  const { data } = await axios.get("/project");
  return data.result.projects;
};

const useGetProjects = () => {
  return useQuery({
    queryKey: [projectsKey],
    queryFn: fetchProjects,
  });
};

const createProject = async (payload = { name: "" }) => {
  try {
    await axios.post("/project", payload);
  } catch (error) {
    throw error;
  }
};

const useCreateProject = () => {
  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [projectsKey] });
    },
  });
};

export { projectsKey, fetchProjects, useGetProjects, useCreateProject };
