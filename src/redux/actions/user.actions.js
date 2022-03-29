export const SET_USER = "Set User";
export const CLEAR_USER = "Clear User";

export const setUser = (user) => {
  return { type: SET_USER, user };
};

export const clearUser = () => {
  return { type: CLEAR_USER };
};
