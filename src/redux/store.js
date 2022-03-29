import { createStore } from "redux";
import rootReducer from "./reducers";

const INITIAL_STATE = {
  user: null,
  battle: {
    players: [],
    isActive: false,
  },
  wordgame: {
    wordsGuessed: [],
    lettersGuessed: [],
    currentWord: "",
    guessNumber: 0,
  },
};

export default createStore(rootReducer, INITIAL_STATE);
