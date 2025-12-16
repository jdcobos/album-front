import Request from "./request";
import { METHODS_HTTPS } from "../constant/methods";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {AUTH_ACTIONS} from "../actionsTypes/auth.actionsTypes";

export const AUTH_LOGIN = createAsyncThunk(
  AUTH_ACTIONS.AUTH_LOGIN,
  async (params: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await Request({authorization:false, method: METHODS_HTTPS.POST, route:"auth/login", params })
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Error de login")
    }
  }
)

export const REGISTER = createAsyncThunk(
  AUTH_ACTIONS.REGISTER,
  async (params: { name: string; email: string, password: string }, thunkAPI) => {
    try {
      const response = await Request({authorization:false, method: METHODS_HTTPS.POST, route:"auth/register", params })
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Error de registro")
    }
  }
)


