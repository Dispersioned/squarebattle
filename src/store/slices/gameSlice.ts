import { createSlice } from '@reduxjs/toolkit';
import { createField } from 'shared/helpers/createField';

interface InitialState {
  field: number[][];
}

const initialState: InitialState = {
  field: createField(30, 20),
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {},
});

export const game = gameSlice.reducer;
