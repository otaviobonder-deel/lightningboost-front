import { SnackbarTypes, ISnackbarState, ISnackbarActions } from "./types";

const initialState: ISnackbarState = {
  open: false,
  message: "",
  status: undefined,
};

export const snackbarReducer = (
  state = initialState,
  action: ISnackbarActions
): ISnackbarState => {
  switch (action.type) {
    case SnackbarTypes.OPEN_SNACKBAR:
      return {
        open: true,
        message: action.message,
        status: action.status,
      };
    case SnackbarTypes.CLOSE_SNACKBAR:
      return {
        ...state,
        open: false,
      };
    default:
      return state;
  }
};
