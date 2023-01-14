import { ITrack } from "./DBmodels";

export interface ITrackPageState {
    error: string
    track: null | ITrack
    isAdding: boolean
}


export enum TrackPageActionTypes {
    fetch_one = "trackPage/fetch_one",
    create_comment = "trackPage/create_comment",
}