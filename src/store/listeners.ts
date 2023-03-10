import { TypedStartListening, createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { getPosition } from 'shared/helpers/getPosition';
import { isTurnReal } from 'shared/helpers/isTurnReal';
import { validate } from 'shared/helpers/validate';
import { AppDispatch, RootState } from 'store';

import { gameSlice } from './slices/gameSlice';

export const listenerMiddleware = createListenerMiddleware();

type AppStartListening = TypedStartListening<RootState, AppDispatch>;

const startAppListening = listenerMiddleware.startListening as AppStartListening;

startAppListening({
  matcher: isAnyOf(
    gameSlice.actions.startPlacement,
    gameSlice.actions.onHoverWhilePlacing,
    gameSlice.actions.endPlacement
  ),
  effect: (_action, { getState, dispatch }) => {
    const {
      game: {
        field,
        player,
        dices,
        newZone: { startCoords, endCoords },
      },
    } = getState();

    if (!startCoords || !endCoords) return;

    const { indexes } = getPosition(startCoords, endCoords);
    dispatch(gameSlice.actions.setValidity(validate({ field, indexes, player, dices })));
  },
});

startAppListening({
  actionCreator: gameSlice.actions.setDices,
  effect: (_action, { getState, dispatch }) => {
    const {
      game: { field, dices, player },
    } = getState();

    const playerWhoMadeTurn = player === 'first' ? 'second' : 'first';

    if (isTurnReal({ field, player, dices })) return;
    dispatch(gameSlice.actions.setWinner(playerWhoMadeTurn));
  },
});
