import API from "./axios";

export const loginUser = async (email, password) => {
  const { data } = await API.post("/auth/login", { email, password });
  return data;
};

export const getCurrentUser = async () => {
  const { data } = await API.get("/auth/me");
  return data;
};
