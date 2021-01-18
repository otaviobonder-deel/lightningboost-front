/* eslint-disable react/jsx-props-no-spreading */

import React from "react";
import { useDispatch } from "react-redux";

import { Snackbar as MuiSnackbar } from "@material-ui/core";
import { Alert as MuiAlert, AlertProps } from "@material-ui/lab";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { closeSnackbar } from "../../actions/snackbarActions";

const Alert: React.FunctionComponent<AlertProps> = (props) => (
  <MuiAlert elevation={6} variant="filled" {...props} />
);

export const Snackbar: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const { open, message, status } = useTypedSelector((state) => state.snackbar);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(closeSnackbar());
  };

  return (
    <MuiSnackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
    >
      <Alert onClose={handleClose} severity={status}>
        {message}
      </Alert>
    </MuiSnackbar>
  );
};
