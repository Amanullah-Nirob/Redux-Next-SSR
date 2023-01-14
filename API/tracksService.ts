import { $authInstance, $instance } from ".";
import { ITrack } from "../types/DBmodels";
import { IFetchTracksResponse } from "../types/tracks";


export class TracksService {
    static async fetchTracks(page: number): Promise<IFetchTracksResponse> {
        const { data } = await $instance.get('/tracks', { params: { limit: 5, page } })
        return data
    }

    static async searchTracks(query: String): Promise<ITrack[]> {
        const { data } = await $instance.get("/tracks/search", { params: { query } })
        return data
    }

    static async uploadTrack(formData: FormData): Promise<ITrack> {
        const { data } = await $instance.post("/tracks", formData)
        return data
    }


    static async fetchOne(id: string): Promise<ITrack> {
        const { data } = await $instance.get(`/tracks/track/${id}`)
        return data
    }


    static async addToPlaylist(trackId: string): Promise<ITrack> {
        const { data } = await $authInstance.post('/tracks/playlist', { trackId })
        return data
    }
}