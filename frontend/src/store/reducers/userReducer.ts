import { IUserState, userAction, UserActionTypes } from "../../types/user";

const initialState: IUserState = {
  user: null,
  users: null,
};

export const userReducer = (
  state = initialState,
  action: userAction
): IUserState => {
  switch (action.type) {
    case UserActionTypes.FETCH_USERS:
      return {
        users: action.payload,
        user: state.user,
      };
    case UserActionTypes.USER_AUTH:
      return {
        user: action.payload.user,
      };
    case UserActionTypes.USER_REGISTER:
      return {
        user: action.payload.user,
      };
    case UserActionTypes.USER_LOGOUT:
      return {
        user: null,
      };
    case UserActionTypes.IS_AUTH:
      return {
        user: action.payload.user,
      };
    default:
      return state;
  }
};
