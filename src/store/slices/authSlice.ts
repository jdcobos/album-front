import { createSlice } from '@reduxjs/toolkit';
import {AUTH_LOGIN} from '../../actions/auth.actions';
import { SLICE_NAME_AUTH } from '../../actionsTypes/auth.actionsTypes';
const initialState = { 
  loading: false
 };

export const auth = createSlice({
  name: SLICE_NAME_AUTH,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AUTH_LOGIN.pending, (state) => {
         state.loading = true
      })
      .addCase(AUTH_LOGIN.fulfilled, (state) => {
         state.loading = false
      })
      .addCase(AUTH_LOGIN.rejected, (state) => {
         state.loading = false
      })  
  },
})

export default auth.reducer
