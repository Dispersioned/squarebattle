import React from 'react';
import { getCellCoords } from 'shared/helpers/getCellCoords';
import { getPosition } from 'shared/helpers/getPosition';
import { validate } from 'shared/helpers/validate';
import { gameSlice } from 'store/slices/gameSlice';

import { AC } from '.';

export const onStartPlacement =
  (e: React.MouseEvent<HTMLDivElement, MouseEvent>): AC =>
  (dispatch, getState) => {
    const coords = getCellCoords(e);
    if (!coords) return;

    dispatch(gameSlice.actions.startPlacement(coords));

    const {
      game: { field, player },
    } = getState();

    // validate first 1x1 block
    const { indexes } = getPosition(coords, coords);
    if (!validate(field, indexes, player)) {
      dispatch(gameSlice.actions.setValidity(false));
    } else {
      dispatch(gameSlice.actions.setValidity(true));
    }
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
    dispatch(gameSlice.actions.setValidity(true));
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
  dispatch(gameSlice.actions.endPlacement());
};

export const onHoverWhilePlacing =
  (e: React.MouseEvent<HTMLDivElement, MouseEvent>): AC =>
  (dispatch, getState) => {
    const coords = getCellCoords(e);
    if (!coords) return;

    const {
      game: {
        field,
        isPlacing,
        player,
        newZone: { startCoords, endCoords },
      },
    } = getState();
    if (!isPlacing || !startCoords || !endCoords) return;

    const { indexes } = getPosition(startCoords, coords);
    if (!validate(field, indexes, player)) {
      dispatch(gameSlice.actions.setValidity(false));
    } else {
      dispatch(gameSlice.actions.setValidity(true));
    }

    if (coords.x === endCoords.x && coords.y === endCoords.y) return;

    dispatch(gameSlice.actions.onHoverWhilePlacing(coords));
  };

export const onLeaveField = (): AC => (dispatch, getState) => {
  const state = getState();
  if (state.game.isPlacing) {
    dispatch(gameSlice.actions.setValidity(true));
    dispatch(gameSlice.actions.endPlacement());
  }
};
