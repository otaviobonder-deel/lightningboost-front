export enum DrawerTypes {
  OPEN_DRAWER = "@drawer/OPEN_DRAWER",
  CLOSE_DRAWER = "@drawer/CLOSE_DRAWER",
}

export interface IDrawerState {
  readonly open: boolean;
}

export interface IDrawerAction {
  type: DrawerTypes;
}
