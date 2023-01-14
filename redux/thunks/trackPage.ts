import { createAsyncThunk } from "@reduxjs/toolkit"
import { CommentsService } from "../../API/commentsService"
import { TracksService } from "../../API/tracksService"
import { TrackPageActionTypes } from "../../types/trackPage"


export const fetchOneTrack = createAsyncThunk(TrackPageActionTypes.fetch_one,
    async (id: string, thunk) => {
        try {
            const data = await TracksService.fetchOne(id)
            return data
        } catch (err: any) {
            return thunk.rejectWithValue(err.response?.data.message)
        }
    })


export const createComment = createAsyncThunk(TrackPageActionTypes.create_comment,
    async (payload: { text: string, trackId: string }, thunk) => {
        try {
            const data = await CommentsService.createComment(payload.text, payload.trackId)
            return data
        } catch (err: any) {
            return thunk.rejectWithValue(err.response?.data.message)
        }
    }) 