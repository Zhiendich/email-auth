import axios from "axios";
import { Dispatch } from "react";
import { API_URL } from "../../http";
import AuthService from "../../services/AuthService";
import UserService from "../../services/UserService";
import { AuthResponse } from "../../types/response/AuthResponse";
import { userAction, UserActionTypes } from "../../types/user";

export const registeration = (email: string, password: string) => {
  return async (dispatch: Dispatch<userAction>) => {
    try {
      const response = await AuthService.registration(email, password);
      dispatch({ type: UserActionTypes.USER_REGISTER, payload: response.data });
      console.log(response.data);
      localStorage.setItem("token", response.data.accessToken);
    } catch (error: any) {
      console.log(error);
    }
  };
};

export const login = (email: string, password: string) => {
  return async (dispatch: Dispatch<userAction>) => {
    try {
      const response = await AuthService.login(email, password);
      dispatch({ type: UserActionTypes.USER_AUTH, payload: response.data });
      console.log(response.data);
      localStorage.setItem("token", response.data.accessToken);
    } catch (error: any) {
      console.log(error);
    }
  };
};

export const logout = () => {
  return async (dispatch: Dispatch<userAction>) => {
    try {
      const response = await AuthService.logout();
      dispatch({ type: UserActionTypes.USER_LOGOUT });
      localStorage.removeItem("token");
    } catch (error: any) {
      console.log(error);
    }
  };
};

export const checkAuth = () => {
  return async (dispatch: Dispatch<userAction>) => {
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      dispatch({ type: UserActionTypes.IS_AUTH, payload: response.data });
      localStorage.setItem("token", response.data.accessToken);
    } catch (error: any) {
      console.log(error);
    }
  };
};

export const fetchUsers = () => {
  return async (dispatch: Dispatch<userAction>) => {
    try {
      const response = await UserService.fetchUsers();
      dispatch({ type: UserActionTypes.FETCH_USERS, payload: response.data });
    } catch (error: any) {
      console.log(error);
    }
  };
};
