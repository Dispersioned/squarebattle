import React from 'react';
import { getCellCoords } from 'shared/helpers/getCellCoords';
import { AppDispatch, AppStore } from 'store';
import { gameSlice } from 'store/slices/gameSlice';

import { AC } from '.';

export const onStartPlacement =
  (e: React.MouseEvent<HTMLDivElement, MouseEvent>): AC =>
  (dispatch) => {
    const coords = getCellCoords(e);
    if (!coords) return;
    dispatch(gameSlice.actions.startPlacement(coords));
  };

export const onEndPlacement =
  (e: React.MouseEvent<HTMLDivElement, MouseEvent>): AC =>
  (dispatch) => {
    const coords = getCellCoords(e);
    if (!coords) return;
    dispatch(gameSlice.actions.endPlacement(coords));
  };

export const onHoverWhilePlacing =
  (e: React.MouseEvent<HTMLDivElement, MouseEvent>): AC =>
  (dispatch, getState) => {
    const coords = getCellCoords(e);
    if (!coords) return;

    const state = getState();
    if (!state.game.isPlacing) return;

    const endCoords = state.game.newZone.endCoords;
    if (endCoords && coords.x === endCoords.x && coords.y === endCoords.y) return;

    dispatch(gameSlice.actions.onHoverWhilePlacing(coords));
  };

export const onLeaveField = (): AC => (dispatch, getState) => {
  const state = getState();
  if (state.game.isPlacing) dispatch(gameSlice.actions.onLeaveField());
};
