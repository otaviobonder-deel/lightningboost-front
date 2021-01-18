export enum SnackbarTypes {
  OPEN_SNACKBAR = "@snackbar/OPEN_SNACKBAR",
  CLOSE_SNACKBAR = "@snackbar/CLOSE_SNACKBAR",
}

export interface ISnackbarState {
  readonly open: boolean;
  readonly message: string;
  readonly status: "success" | "info" | "warning" | "error" | undefined;
}

export interface ISnackbarActions extends ISnackbarState {
  type: SnackbarTypes;
}
