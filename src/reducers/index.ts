import { combineReducers } from "redux";
import { drawerReducer } from "./drawer/reducer";

const rootReducers = combineReducers({
  drawer: drawerReducer,
});

export default rootReducers;
export type RootState = ReturnType<typeof rootReducers>;
