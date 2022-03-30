import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import battleReducer from "./battle.reducer";
import wordgameReducer from "./wordgame.reducers";

const rootReducer = combineReducers({
  user: userReducer,
  battle: battleReducer,
  wordgame: wordgameReducer,
});

export default rootReducer;
