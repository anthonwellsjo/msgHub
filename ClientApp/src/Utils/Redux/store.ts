import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userStatusReducer from './features/msgHub/userSlice';
import whiteboardReducer from './features/msgHub/whiteboardSlice';

export const store = configureStore({
  reducer: {
    userStatusReducer, whiteboardReducer
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
