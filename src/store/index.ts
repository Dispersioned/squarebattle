import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { listenerMiddleware } from './listeners';
import { game } from './slices/gameSlice';

const rootReducer = combineReducers({
  game,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware),
  });
};

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
