import Request from "./request";
import { METHODS_HTTPS } from "../constant/methods";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {MULTIMEDIA_ACTIONS} from "../actionsTypes/multimedia.actionsTypes";

export const GET_MULTIMEDIA = createAsyncThunk(
  MULTIMEDIA_ACTIONS.MULTIMEDIA,
  async (_, thunkAPI) => {
    try {
      const response = await Request({ method: METHODS_HTTPS.GET, route: "multimedia"  })
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Error de login")
    }
  }
)


