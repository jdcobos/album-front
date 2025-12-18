import { createSlice } from '@reduxjs/toolkit';
import {GET_MULTIMEDIA, GET_MULTIMEDIA_BY_USER} from '../../actions/multimedia.actions';
import { SLICE_NAME_MULTIMEDIA } from '../../actionsTypes/multimedia.actionsTypes';

const initialState = { 
  loading: false,
  count:0,
  countUsers: 0,
  multimedia: [],
  multimediaUser:[]
 };

export const auth = createSlice({
  name: SLICE_NAME_MULTIMEDIA,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GET_MULTIMEDIA.pending, (state) => {
         state.loading = true
      })
      .addCase(GET_MULTIMEDIA.fulfilled, (state, action) => {
         state.loading = false,
         state.multimedia = action.payload.multimedia
         state.count = action.payload.count
      })
      .addCase(GET_MULTIMEDIA.rejected, (state) => {
         state.loading = false
      })
      .addCase(GET_MULTIMEDIA_BY_USER.pending, (state) => {
         state.loading = true
      })
      .addCase(GET_MULTIMEDIA_BY_USER.fulfilled, (state, action) => {
         state.loading = false,
         state.multimediaUser = action.payload.multimedia
         state.countUsers = action.payload.count
      })
      .addCase(GET_MULTIMEDIA_BY_USER.rejected, (state) => {
         state.loading = false
      }) 
      
  },
})

export default auth.reducer
