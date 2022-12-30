import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { createField } from 'shared/helpers/createField';
import { Coords } from 'shared/types';

interface InitialState {
  field: number[][];
  isPlacing: boolean;
  newZone: {
    startCoords: Coords | null;
    endCoords: Coords | null;
  };
}

const initialState: InitialState = {
  field: createField(30, 20),
  isPlacing: false,
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
    },
    onLeaveField(state) {
      state.isPlacing = false;
    },
    endPlacement(state, action: PayloadAction<Coords>) {
      state.isPlacing = false;
      state.newZone.endCoords = action.payload;
      // logic...
      // state.newZone.startCoords = null;
    },
  },
});

export const game = gameSlice.reducer;
