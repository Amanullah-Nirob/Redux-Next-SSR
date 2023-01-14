import { ITrack } from "./DBmodels";


export interface ITracksState {
    isSearching: boolean
    tracks: ITrack[]
    error: string
    totalCount: number
    searchedTracks: ITrack[],
    page: number,
    uploadError: string,
    isUploading: boolean
    isFetching: boolean
}


export enum TracksActionTypes {
    fetch_tracks = 'tracks/fetch_tracks',
    search = 'tracks/search',
    upload = "tracks/upload",
    fetchOne = "tracks/fetch_one",
}



export interface IFetchTracksResponse {
    totalCount: number
    tracks: ITrack[]
}