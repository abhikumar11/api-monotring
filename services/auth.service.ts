import { api } from "@/lib/axios";
import type {
     AuthResponse,
     LoginPayload,
     RegisterPayload,
} from "@/types/auth.type";

export const authService = {
     register: async (data: RegisterPayload): Promise<AuthResponse> => {
          const response = await api.post<AuthResponse>("/auth/register", data);
          return response.data;
     },
     login: async (data: LoginPayload): Promise<AuthResponse> => {
          const response = await api.post<AuthResponse>("/auth/login", data);
          return response.data;
     },
     logout: async (): Promise<void> => {
          const response = await api.post("/auth/logout");
          return response.data;
     },
     me: async (): Promise<AuthResponse> => {
          const response = await api.get<AuthResponse>("/auth/me");
          return response.data;
     },
};
