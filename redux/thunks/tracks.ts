import { createAsyncThunk } from "@reduxjs/toolkit";
import { TracksService } from "../../API/tracksService";
import { TracksActionTypes } from "../../types/tracks";

 

export const fetchTracks = createAsyncThunk(TracksActionTypes.fetch_tracks,
    async (page: number, thunk) => {
        try {
            const data = await TracksService.fetchTracks(page)
            return data

        } catch (err: any) {
            return thunk.rejectWithValue(err.response?.data.message)
        }
    })


export const searchTracks = createAsyncThunk(TracksActionTypes.search,
    async (query: string, thunk) => {
        try {
            const data = await TracksService.searchTracks(query)
            return data

        } catch (err) {
            return thunk.rejectWithValue(err)
        }
    })


export const uploadTrack = createAsyncThunk(TracksActionTypes.upload, async (fd: FormData, thunk) => {
    try {
        const data = await TracksService.uploadTrack(fd)
        return data
    } catch (err: any) {
        return thunk.rejectWithValue(err.response?.data.message)
    }
})


