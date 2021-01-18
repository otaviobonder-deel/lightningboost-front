import { combineReducers } from "redux";
import { drawerReducer } from "./drawer/reducer";
import { snackbarReducer } from "./snackbar/reducer";

const rootReducers = combineReducers({
  drawer: drawerReducer,
  snackbar: snackbarReducer,
});

export default rootReducers;
export type RootState = ReturnType<typeof rootReducers>;
