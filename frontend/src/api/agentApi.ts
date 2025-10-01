import type { AxiosResponse } from "axios";
import api from "./axios";
import type { IAgent } from "@/types";


export const getAllAgents = async (): Promise<AxiosResponse<IAgent[]>> => {
    const res = await api.get('/agents');
    return res;
}