import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthResponse, IAuthState } from "../../types/auth";
import { ITrack, IUser } from "../../types/DBmodels";
import { addToPlaylist, getMeThunk, loginThunk, registerThunk } from "../thunks/auth";


const initialState: IAuthState = {
    user: null,
    isInitializing: true,
    loginError: "",
    registerError: "",
    isSubmitting: false,
    isAdding: false
}


const authSlice = createSlice({
    initialState,
    name: "auth",
    reducers: {
        logout(state) {
            state.user = null
        }
    },
    extraReducers: {
        [loginThunk.fulfilled.type]: (state, action: PayloadAction<IAuthResponse>) => {
            state.user = action.payload.data
            state.loginError = ""
            state.isSubmitting = false
        },
        [loginThunk.pending.type]: (state, action) => {
            state.isSubmitting = true
        },
        [loginThunk.rejected.type]: (state, action) => {
            state.loginError = action.payload
            state.isSubmitting = false
        },


        [registerThunk.fulfilled.type]: (state, action: PayloadAction<IAuthResponse>) => {
            state.user = action.payload.data
            state.registerError = ""
            state.isSubmitting = false
        },
        [registerThunk.pending.type]: (state, action) => {
            state.isSubmitting = true
        },
        [registerThunk.rejected.type]: (state, action) => {
            state.registerError = action.payload
            state.isSubmitting = false
        },


        [getMeThunk.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload
            state.isInitializing = false
        },
        [getMeThunk.pending.type]: (state, action) => {
            state.isInitializing = true
        },
        [getMeThunk.rejected.type]: (state, action) => {
            state.registerError = action.payload
            state.isInitializing = false
        },


        [addToPlaylist.fulfilled.type]: (state, action: PayloadAction<ITrack>) => {
            state.user?.playlist.push(action.payload)
            state.isAdding = false
        },
        [addToPlaylist.pending.type]: (state, action) => {
            state.isAdding = true
        },
        [addToPlaylist.rejected.type]: (state, action) => {
            state.isAdding = false
        },
    }
})


export default authSlice.reducer;
export const { logout } = authSlice.actions;