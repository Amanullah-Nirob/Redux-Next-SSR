


export interface ITrack {
    name: string
    img: string
    text: string
    comments: IComment[]
    listens: number
    author: IAuthor
    audio: string
    _id: string
}


export interface IUser {
    email: string
    playlist: ITrack[]
    img: string
    comments: IComment[]
    _id: string
}


export interface IAuthor {
    tracks: ITrack[]
    name: string
    img: string
    _id: string
}

export interface IComment {
    track: string
    user: IUser
    text: string
    _id: string
    createdAt: string
}