import { AuthResponse } from "./response/AuthResponse";

export interface IUser {
  _id?: string;
  email: string;
  password: string;
  isActivated: boolean;
}
export interface IUserState {
  user?: IUser | null;
  users?: IUser[] | null;
}

export enum UserActionTypes {
  FETCH_USERS = "FETCH_USERS",
  USER_AUTH = "USER_AUTH",
  USER_REGISTER = "USER_REGISTER",
  IS_AUTH = "IS_AUTH",
  USER_LOGOUT = "USER_LOGOUT",
}

interface FetchUserAction {
  type: UserActionTypes.FETCH_USERS;
  payload: IUser[];
}

interface UserAuthAction {
  type: UserActionTypes.USER_AUTH;
  payload: AuthResponse;
}
interface UserRegisterAction {
  type: UserActionTypes.USER_REGISTER;
  payload: AuthResponse;
}

interface IsAuthAction {
  type: UserActionTypes.IS_AUTH;
  payload: AuthResponse;
}

interface UserLogoutAction {
  type: UserActionTypes.USER_LOGOUT;
}

export type userAction =
  | FetchUserAction
  | UserAuthAction
  | UserRegisterAction
  | IsAuthAction
  | UserLogoutAction;
