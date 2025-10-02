import api from "./axios";

export const getAllAgents = async () => {
  const res = await api.get("/agents");
  return res;
};

export const createAgent = async (payload: { fullName: string; email: string; phone: string; password: string; }) => {
  const res = await api.post("/agents/create", payload);
  return res;
};
