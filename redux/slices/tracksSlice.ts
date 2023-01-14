import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITrack } from "../../types/DBmodels";
import { IFetchTracksResponse, ITracksState } from "../../types/tracks";
import { fetchTracks, searchTracks, uploadTrack } from "../thunks/tracks";

const initialState: ITracksState = {
    isSearching: false,
    tracks: [],
    totalCount: 0,
    error: "",
    searchedTracks: [],
    page: 1,
    uploadError: "",
    isUploading: false,
    isFetching: true
}


const tracksSlice = createSlice({
    name: "tracks",
    initialState,
    reducers: {
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload
        }
    },
    extraReducers: {
        [fetchTracks.fulfilled.type]: (state, action: PayloadAction<IFetchTracksResponse>) => {
            state.tracks = action.payload.tracks
            state.totalCount = action.payload.totalCount
            state.error = ""
            state.isFetching = false
        },
        [fetchTracks.rejected.type]: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.isFetching = false
        },
        [fetchTracks.pending.type]: (state, action) => {
            state.isFetching = true
        },


        [searchTracks.fulfilled.type]: (state, action: PayloadAction<ITrack[]>) => {
            state.isSearching = false
            state.searchedTracks = action.payload
        },
        [searchTracks.pending.type]: (state,) => {
            state.isSearching = true
        },
        [searchTracks.rejected.type]: (state) => {
            state.isSearching = false
        },


        [uploadTrack.fulfilled.type]: (state, action: PayloadAction<ITrack>) => {
            state.isUploading = false
            state.uploadError = ''
        },
        [uploadTrack.pending.type]: (state, action) => {
            state.isUploading = true
        },
        [uploadTrack.rejected.type]: (state, action) => {
            state.uploadError = action.payload
        },
    }
})


export default tracksSlice.reducer;

export const { setPage } = tracksSlice.actions;