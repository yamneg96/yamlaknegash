import API from "./axios";

export const sendContactMessage = async (formData) => {
  const { data } = await API.post("/contact", formData);
  return data;
};

export const getContactMessages = async () => {
  const { data } = await API.get("/contact");
  return data;
};

export const deleteContactMessage = async (id) => {
  const { data } = await API.delete(`/contact/${id}`);
  return data;
};
