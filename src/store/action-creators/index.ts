import { AppDispatch, AppStore } from 'store';

import * as gameAC from './game';

export const actionCreators = {
  ...gameAC,
};

export type AC = (dispatch: AppDispatch, getState: AppStore['getState']) => void;
