import API from "./axios";

export const getSkills = async () => {
  const { data } = await API.get("/skills");
  return data;
};

export const createSkill = async (skillData) => {
  const { data } = await API.post("/skills", skillData);
  return data;
};

export const updateSkill = async (id, skillData) => {
  const { data } = await API.put(`/skills/${id}`, skillData);
  return data;
};

export const deleteSkill = async (id) => {
  const { data } = await API.delete(`/skills/${id}`);
  return data;
};
