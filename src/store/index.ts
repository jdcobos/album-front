import { configureStore } from '@reduxjs/toolkit';
import auth from './slices/authSlice';
import multimedia from './slices/multimedia.slice'
import user from './slices/user.slice'
export const Store = configureStore({
  reducer: {
    auth,
    multimedia,
    user
  },
});

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch
