import Request from "./request";
import { METHODS_HTTPS } from "../constant/methods";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {AUTH_ACTIONS} from "../actionsTypes/auth.actionsTypes";

export const AUTH_LOGIN = createAsyncThunk(
  AUTH_ACTIONS.AUTH_LOGIN,
  async (params: { email: string; password: string }, thunkAPI) => {
    try {
      // ✅ espera la promesa y obtiene la respuesta
      console.log("entró")
      const response = await Request({ method: METHODS_HTTPS.POST, params })

      // ✅ devuelve solo datos serializables
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Error de login")
    }
  }
)


