import type { AxiosResponse } from "axios";
import api from "./axios";
import type { IAuthResponse, ISignInPayload } from "@/types";


export const signIn = async (
  payload: ISignInPayload
): Promise<AxiosResponse<IAuthResponse>> => {
  const response = await api.post<IAuthResponse>("/auth/sign-in", payload);

  //save accesstoken to localstorage
  localStorage.setItem("accessToken", response.data.accessToken);

  return response;
};

export const logout = () => {
  localStorage.removeItem("accessToken");
};
