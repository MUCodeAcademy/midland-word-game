import {
  SET_IS_ACTIVE,
  ADD_PLAYER,
  REMOVE_PLAYER,
} from "../actions/battle.actions";

const initialState = null;

export default function battleReducer(state = initialState, action) {
  switch (action.type) {
    case SET_IS_ACTIVE:
      return action.isActive;
    case ADD_PLAYER:
      return action.user;
    case REMOVE_PLAYER:
      return action.user;
    default:
      return state;
  }
}
