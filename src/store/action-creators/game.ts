import React from 'react';
import { getCellCoords } from 'shared/helpers/getCellCoords';
import { getRandomDice } from 'shared/helpers/getRandomDice';
import { gameSlice } from 'store/slices/gameSlice';

import { AC } from '.';

export const onStartPlacement =
  (e: React.MouseEvent<HTMLDivElement, MouseEvent>): AC =>
  (dispatch, getState) => {
    const coords = getCellCoords(e);
    if (!coords) return;
    dispatch(gameSlice.actions.startPlacement(coords));
  };

export const onCancelPlacement = (): AC => (dispatch, getState) => {
  const state = getState();
  if (state.game.isPlacing) dispatch(gameSlice.actions.endPlacement());
};

export const onEndPlacement = (): AC => async (dispatch, getState) => {
  const {
    game: {
      isValidPlace,
      player,
      newZone: { startCoords, endCoords },
    },
  } = getState();
  if (!startCoords || !endCoords) return;
  if (!isValidPlace) {
    dispatch(gameSlice.actions.endPlacement());
    return;
  }

  dispatch(
    gameSlice.actions.createBlock({
      player,
      start: startCoords,
      end: endCoords,
    })
  );
  dispatch(gameSlice.actions.changePlayer(player === 'first' ? 'second' : 'first'));
  dispatch(gameSlice.actions.setDices(getRandomDice()));
  dispatch(gameSlice.actions.endPlacement());
};

export const onHoverWhilePlacing =
  (e: React.MouseEvent<HTMLDivElement, MouseEvent>): AC =>
  (dispatch, getState) => {
    const coords = getCellCoords(e);
    if (!coords) return;

    const {
      game: {
        isPlacing,
        newZone: { startCoords, endCoords },
      },
    } = getState();
    if (!isPlacing || !startCoords || !endCoords) return;
    if (coords.x === endCoords.x && coords.y === endCoords.y) return;

    dispatch(gameSlice.actions.onHoverWhilePlacing(coords));
  };

export const onLeaveField = (): AC => (dispatch, getState) => {
  const state = getState();

  if (state.game.isPlacing) return;
  dispatch(gameSlice.actions.endPlacement());
};
