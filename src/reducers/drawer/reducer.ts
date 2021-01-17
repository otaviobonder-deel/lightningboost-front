import { DrawerTypes, IDrawerAction, IDrawerState } from './types';

const initialState = {
  open: false,
};

export const drawerReducer = (state: IDrawerState = initialState,
  action: IDrawerAction): IDrawerState => {
  switch (action.type) {
    case DrawerTypes.OPEN_DRAWER:
      return {
        open: true,
      };
    case DrawerTypes.CLOSE_DRAWER:
      return {
        open: false,
      };
    default:
      return state;
  }
};
