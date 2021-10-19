import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userStatusReducer from './features/msgHub/userSlice';
import hubConnectionReducer from './features/msgHub/hubConnectionSlice';

export const store = configureStore({
  reducer: {
    userStatusReducer, hubConnectionReducer
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
