import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userStatusReducer from './features/msgHub/userSlice';

export const store = configureStore({
  reducer: {
    msgHub: userStatusReducer,
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
