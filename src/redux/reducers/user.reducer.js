import { CLEAR_USER, SET_USER } from "../actions/user.actions";

const initialState = null;

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return action.user;
    case CLEAR_USER:
      return null;
    default:
      return state;
  }
}
