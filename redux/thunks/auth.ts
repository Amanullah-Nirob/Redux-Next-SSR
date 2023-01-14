import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthService } from "../../API/authService";
import { TracksService } from "../../API/tracksService";
import { AuthActionTypes } from "../../types/auth";


export const loginThunk = createAsyncThunk(AuthActionTypes.login,
    async (payload: { email: string, password: string }, thunk) => {
        try {
            const data = await AuthService.login(payload.email, payload.password)
            return data

        } catch (err: any) {
            return thunk.rejectWithValue(err.response?.data.message)
        }
    })


export const registerThunk = createAsyncThunk(AuthActionTypes.register,
    async (payload: { email: string, password: string }, thunk) => {
        try {
            const data = await AuthService.register(payload.email, payload.password)
            return data

        } catch (err: any) {
            return thunk.rejectWithValue(err.response?.data.message)
        }
    })


export const getMeThunk = createAsyncThunk(AuthActionTypes.get_me,
    async (token: string, thunk) => {
        try {
            const data = await AuthService.getMe(token)
            return data
 
        } catch (err: any) {
            return thunk.rejectWithValue(err.response?.data.message)
        }
    })



export const addToPlaylist = createAsyncThunk(AuthActionTypes.add_to_playlist,
    async (trackId: string, thunk) => {
        try {
            const data = await TracksService.addToPlaylist(trackId)
            return data
        } catch (err: any) {
            return thunk.rejectWithValue(err.response?.data.message)
        }
    })