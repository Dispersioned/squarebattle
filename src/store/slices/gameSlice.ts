import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { createDefaultBlocks } from 'shared/helpers/createDefaultBlocks';
import { createField } from 'shared/helpers/createField';
import { getFieldSize } from 'shared/helpers/getFieldSize';
import { getPosition } from 'shared/helpers/getPosition';
import { Block, Coords, Player } from 'shared/types';

interface InitialState {
  field: number[][];
  isPlacing: boolean;
  isValidPlace: boolean;
  player: Player;
  blocks: Block[];
  newZone: {
    startCoords: Coords | null;
    endCoords: Coords | null;
  };
}

const field = createField(30, 20);
const blocks = createDefaultBlocks(field);

const initialState: InitialState = {
  field,
  isPlacing: false,
  isValidPlace: false,
  player: 'first',
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
  },
});

export const game = gameSlice.reducer;
