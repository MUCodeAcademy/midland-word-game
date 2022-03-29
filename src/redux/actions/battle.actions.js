export const SET_IS_ACTIVE = "Set Is Active";
export const ADD_PLAYER = "Add Player";
export const REMOVE_PLAYER = "Remove Player";

export const setIsActive = (isActive) => {
  return { type: SET_IS_ACTIVE, isActive };
};

export const addPlayer = (user) => {
  return { type: ADD_PLAYER, user };
};

export const removePlayer = (user) => {
  return { type: REMOVE_PLAYER, user };
};
