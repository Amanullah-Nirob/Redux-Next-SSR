import { $authInstance } from "."
import { IComment } from "../types/DBmodels"



export class CommentsService {

    static async createComment(text: string, trackId: string): Promise<IComment> {
        const { data } = await $authInstance.post('/comments', { text, trackId })
        return data
    }

}