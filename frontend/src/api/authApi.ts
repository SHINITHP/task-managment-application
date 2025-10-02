import api from "./axios";
import type { IAuthResponse, ISignInPayload } from "@/types";

export const signIn = async (
  payload: ISignInPayload
): Promise<IAuthResponse>=> {

  const response = await api.post<IAuthResponse>("/auth/sign-in", payload);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("accessToken");
};
