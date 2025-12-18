import Request from "./request";
import { METHODS_HTTPS } from "../constant/methods";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {MULTIMEDIA_ACTIONS} from "../actionsTypes/multimedia.actionsTypes";

export interface Ilike  {
  multimediaId: string,
  userId: string
}

export interface IMultimedia  {
  userId: string
}

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

export const LIKE_MULTIMEDIA = createAsyncThunk(
  MULTIMEDIA_ACTIONS.LIKE,
  async (params: object, thunkAPI) => {
    try {
      const response = await Request({ method: METHODS_HTTPS.POST, route: "multimedia/like/", params})
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Error de login")
    }
  }
)

export const GET_LIKE = createAsyncThunk(
  MULTIMEDIA_ACTIONS.GET_LIKE,
  async (params: Ilike, thunkAPI) => {
    try {
      if (!params.userId) return thunkAPI.rejectWithValue("userId no proporcionado");

      const response = await Request({
        method: METHODS_HTTPS.GET,
        route: `like?multimediaId=${params.multimediaId}&userId=${params.userId}`,
      });

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Error de login");
    }
  }
);

export const GET_MULTIMEDIA_BY_USER = createAsyncThunk(
  MULTIMEDIA_ACTIONS.GET_MULTIMEDIA_BY_USER,
  async (params: IMultimedia, thunkAPI) => {
    try {
      const response = await Request({
        method: METHODS_HTTPS.GET,
        route: `multimedia/byUser/${params.userId}`,
      });

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error al obtener multimedia"
      );
    }
  }
);


