import { Dispatch } from 'redux';
import { DrawerTypes } from '../reducers/drawer/types';

export const openDrawer = () => (dispatch: Dispatch): void => {
  dispatch({
    type: DrawerTypes.OPEN_DRAWER,
  });
};

export const closeDrawer = () => (dispatch: Dispatch): void => {
  dispatch({
    type: DrawerTypes.CLOSE_DRAWER,
  });
};
