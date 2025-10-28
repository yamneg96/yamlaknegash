import API from "./axios";

export const getProjects = async (page = 1, limit = 6) => {
  const { data } = await API.get(`/projects?page=${page}&limit=${limit}`);
  return data;
};

export const createProject = async (projectData) => {
  const { data } = await API.post("/projects", projectData);
  return data;
};

export const updateProject = async (id, projectData) => {
  const { data } = await API.put(`/projects/${id}`, projectData);
  return data;
};

export const deleteProject = async (id) => {
  const { data } = await API.delete(`/projects/${id}`);
  return data;
};
