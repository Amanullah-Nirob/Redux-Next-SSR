import { $authInstance, $instance } from ".";
import { IAuthResponse } from "../types/auth";
import { setCookie, destroyCookie } from 'nookies'
import { IUser } from "../types/DBmodels";


export class AuthService {

    static async register(email: string, password: string): Promise<IAuthResponse> {
        const { data } = await $instance.post<IAuthResponse>("/auth/register", { email, password })
        setCookie(null, "musicToken", data.token, {
            maxAge: 30 * 24 * 60 * 60,
            path: "/"
        })

        return data
    }


    static async login(email: string, password: string): Promise<IAuthResponse> {
        const { data } = await $instance.post<IAuthResponse>("/auth/login", { email, password })
        setCookie(null, "musicToken", data.token, {
            maxAge: 30 * 24 * 60 * 60,
            path: "/"
        })

        return data
    }


    static async getMe(token: string): Promise<IUser> {
        const { data } = await $authInstance.get<IUser>("/auth/get-me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        
        return data
    }
}