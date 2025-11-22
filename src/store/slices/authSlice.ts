import { createSlice } from '@reduxjs/toolkit';
import {AUTH_LOGIN} from '../../actions/auth.actions';
import { SLICE_NAME_AUTH } from '../../actionsTypes/auth.actionsTypes';

const initialState = { 
  loading: false,
  auth: {
   token:'',
   user:{
      name:'',
      email: '',
      id:''
   }
  }
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
      .addCase(AUTH_LOGIN.fulfilled, (state, action) => {
         state.loading = false
         state.auth = action.payload
      })
      .addCase(AUTH_LOGIN.rejected, (state) => {
         state.loading = false
      })  
  },
})

export default auth.reducer
