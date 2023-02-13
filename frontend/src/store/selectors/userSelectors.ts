import { GlobalAppState } from "../reducers";

export const selectUser = (state: GlobalAppState) => state.user.user;
export const selectUsers = (state: GlobalAppState) => state.user.users;
