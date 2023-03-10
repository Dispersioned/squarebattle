import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { initDefaultBlocks } from 'shared/helpers/createDefaultBlocks';
import { createField } from 'shared/helpers/createField';
import { getPosition } from 'shared/helpers/getPosition';
import { getRandomDice } from 'shared/helpers/getRandomDice';
import { Block, Coords, Dices, Player } from 'shared/types';

interface InitialState {
  field: number[][];
  isPlacing: boolean;
  isValidPlace: boolean;
  dices: Dices;
  player: Player;
  winner: Player | null;
  blocks: Block[];
  newZone: {
    startCoords: Coords | null;
    endCoords: Coords | null;
  };
}

const field = createField(30, 20);
const { blocks, initedField } = initDefaultBlocks(field);

const initialState: InitialState = {
  field: initedField,
  isPlacing: false,
  isValidPlace: false,
  dices: getRandomDice(),
  player: 'first',
  winner: null,
  blocks,
  newZone: {
    startCoords: null,
    endCoords: null,
  },
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startPlacement(state, action: PayloadAction<Coords>) {
      state.isPlacing = true;
      state.newZone.startCoords = action.payload;
      state.newZone.endCoords = action.payload;
    },
    onHoverWhilePlacing(state, action: PayloadAction<Coords>) {
      state.newZone.endCoords = action.payload;
    },
    endPlacement(state) {
      state.isPlacing = false;
      state.newZone.startCoords = null;
      state.newZone.endCoords = null;
    },
    createBlock(state, action: PayloadAction<Block>) {
      state.blocks.push(action.payload);

      const {
        indexes: { lx, rx, ly, ry },
      } = getPosition(action.payload.start, action.payload.end);

      for (let i = lx; i <= rx; i++) {
        for (let j = ly; j <= ry; j++) {
          state.field[j][i] = action.payload.player === 'first' ? 1 : 2;
        }
      }
    },
    changePlayer(state, action: PayloadAction<Player>) {
      state.player = action.payload;
    },
    setValidity(state, action: PayloadAction<boolean>) {
      state.isValidPlace = action.payload;
    },
    setDices(state, action: PayloadAction<Dices>) {
      state.dices = action.payload;
    },
    setWinner(state, action: PayloadAction<Player>) {
      state.winner = action.payload;
    },
  },
});

export const game = gameSlice.reducer;
