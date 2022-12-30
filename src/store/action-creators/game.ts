import React from 'react';
import { getCellCoords } from 'shared/helpers/getCellCoords';
import { useTypeSelector } from 'shared/hooks/redux';
import { AppDispatch, AppStore } from 'store';
import { gameSlice } from 'store/slices/gameSlice';

export const onStartPlacement = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => (dispatch: AppDispatch) => {
  const coords = getCellCoords(e);
  if (!coords) return;
  dispatch(gameSlice.actions.startPlacement(coords));
};

export const onEndPlacement = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => (dispatch: AppDispatch) => {
  const coords = getCellCoords(e);
  if (!coords) return;
  dispatch(gameSlice.actions.endPlacement(coords));
};

export const onHoverWhilePlacing =
  (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => (dispatch: AppDispatch, getState: AppStore['getState']) => {
    const coords = getCellCoords(e);
    if (!coords) return;

    const {
      game: {
        newZone: { endCoords },
      },
    } = getState();
    if (endCoords) {
      if (coords.x === endCoords.x && coords.y === endCoords.y) return;
      console.log('coords', coords);
    }

    dispatch(gameSlice.actions.onHoverWhilePlacing(coords));
  };

export const onLeaveField = () => (dispatch: AppDispatch) => {
  dispatch(gameSlice.actions.onLeaveField());
};
