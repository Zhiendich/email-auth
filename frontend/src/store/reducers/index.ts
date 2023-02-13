import { combineReducers } from "redux";

import { IUserState } from "../../types/user";
import { userReducer } from "./userReducer";
export interface GlobalAppState {
  user: IUserState;
}
export const rootReducer = combineReducers<GlobalAppState>({
  user: userReducer,
});
