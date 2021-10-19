import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import smarthutReducer from './features/smartHut/smartHutSlice';

export const store = configureStore({
  reducer: {
    smarthut: smarthutReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
