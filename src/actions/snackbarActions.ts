import { Dispatch } from "redux";
import { SnackbarTypes } from "../reducers/snackbar/types";

export const openSnackbar = ({
  message,
  status,
}: {
  message: string;
  status: string;
}) => (dispatch: Dispatch): void => {
  dispatch({
    type: SnackbarTypes.OPEN_SNACKBAR,
    open: true,
    message,
    status,
  });
};

export const closeSnackbar = () => (dispatch: Dispatch): void => {
  dispatch({
    type: SnackbarTypes.CLOSE_SNACKBAR,
  });
};
