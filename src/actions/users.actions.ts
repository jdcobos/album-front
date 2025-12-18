import { createAsyncThunk } from "@reduxjs/toolkit"
import Request from "./request"
import { METHODS_HTTPS } from "../constant/methods"
import { USER_ACTIONS } from "../actionsTypes/user.actionsTypes"

export interface IUser  {
  userId: string
}

export const GET_USER = createAsyncThunk(
  USER_ACTIONS.GET_USER,
  async (params: IUser, thunkAPI) => {
    try {
      const response = await Request({ method: METHODS_HTTPS.GET, route: `users/${params.userId}` })
    
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Error al obtener usuario")
    }
  }
)