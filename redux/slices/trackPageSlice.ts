import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IComment, ITrack } from "../../types/DBmodels"
import { ITrackPageState } from "../../types/trackPage"
import { createComment, fetchOneTrack } from "../thunks/trackPage"



const initialState: ITrackPageState = {
    track: null,
    error: "",
    isAdding: false
} 


const trackPageSlice = createSlice({
    initialState,
    name: "trackpage",
    reducers: {},
    extraReducers: {
        [fetchOneTrack.fulfilled.type]: (state, action: PayloadAction<ITrack>) => {
            state.track = action.payload
            state.error = ""
        },
        [fetchOneTrack.rejected.type]: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        },



        [createComment.fulfilled.type]: (state, action: PayloadAction<IComment>) => {
            state.track?.comments.push(action.payload)
            state.isAdding = false
            state.error = ""
        },
        [createComment.pending.type]: (state, action) => {
            state.isAdding = true
        },
        [createComment.rejected.type]: (state, action) => {
            state.isAdding = false
            state.error = action.payload
        },
    }
})


export default trackPageSlice.reducer;