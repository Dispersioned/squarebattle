import { bindActionCreators } from '@reduxjs/toolkit';
import { actionCreators } from 'store/action-creators';

import { useTypeDispatch } from './redux';

export const useAction = () => {
  const dispatch = useTypeDispatch();
  return bindActionCreators(actionCreators, dispatch);
};
