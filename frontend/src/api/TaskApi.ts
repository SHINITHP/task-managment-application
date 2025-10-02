import api from "./axios";

export const uploadCSV = async (
  file: File
) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await api.post("/tasks/upload", formData);
  return res.data;
};

export const getAllTasks = async () => {
  const res = await api.get('/tasks');
  return res;
}