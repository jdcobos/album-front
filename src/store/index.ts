import { configureStore } from '@reduxjs/toolkit';
import auth from './slices/authSlice';

export const Store = configureStore({
  reducer: {
    auth,
  },
});
