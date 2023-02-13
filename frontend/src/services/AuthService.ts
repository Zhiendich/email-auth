import $api from "../http";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../types/response/AuthResponse";
export default class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/login", { email, password });
  }
  static async registration(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/registration", { email, password });
  }
  static async logout() {
    return $api.post<AuthResponse>("/logout");
  }
}
