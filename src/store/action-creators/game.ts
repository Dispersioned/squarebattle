import React from 'react';
import { getCellCoords } from 'shared/helpers/getCellCoords';
import { AppDispatch } from 'store';
import { gameSlice } from 'store/slices/gameSlice';

export const onStartPlacement = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => async (dispatch: AppDispatch) => {
  const coords = getCellCoords(e);

  if (!coords) return;
  dispatch(gameSlice.actions.startPlacement(coords));
};

export const onEndPlacement = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => async (dispatch: AppDispatch) => {
  const coords = getCellCoords(e);
  if (!coords) return;
  dispatch(gameSlice.actions.endPlacement(coords));
};

export const onHoverWhilePlacing =
  (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => async (dispatch: AppDispatch) => {
    const coords = getCellCoords(e);
    if (!coords) return;
    dispatch(gameSlice.actions.onHoverWhilePlacing(coords));
  };

export const onLeaveField = () => async (dispatch: AppDispatch) => {
  dispatch(gameSlice.actions.onLeaveField());
};
