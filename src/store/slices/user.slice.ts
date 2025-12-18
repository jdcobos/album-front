import { createSlice } from '@reduxjs/toolkit';
import {GET_USER} from '../../actions/users.actions';
import { SLICE_NAME_AUTH } from '../../actionsTypes/auth.actionsTypes';

const initialState = { 
  loading: false,
  user:{}
 };

export const auth = createSlice({
  name: SLICE_NAME_AUTH,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GET_USER.pending, (state) => {
         state.loading = true
      })
      .addCase(GET_USER.fulfilled, (state, action) => {
         state.loading = false
         state.user = action.payload.user
      })
      .addCase(GET_USER.rejected, (state) => {
         state.loading = false
      })  
  },
})

export default auth.reducer
