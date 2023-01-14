import { ITrack, IUser } from "./DBmodels";



export interface IAuthState {
    user: IUser | null
    isInitializing: boolean
    loginError: string
    registerError: string
    isSubmitting: boolean
    isAdding: boolean
}


export enum AuthActionTypes {
    login = 'auth/login',
    get_me = "auth/get_me",
    register = 'auth/register',
    add_to_playlist = 'auth/add_to_playlist'
}


export interface IAuthResponse {
    token: string
    data: IUser
}

