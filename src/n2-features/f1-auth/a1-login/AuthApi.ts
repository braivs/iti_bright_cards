import axios, {AxiosResponse} from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
})

// api
export const authAPI = {
    login(data: AuthLoginType) {
        return instance.post<AuthLoginType>('/auth/login', data);
    },
}


/*
    export const authAPI = {
        login(data: AuthLoginType) {
            return instance.post<AuthLoginType, AxiosResponse<ResponseType<{ userId: number }>>>('auth/login', data)


        },
        */

export type AuthLoginType = {
    email: string,
    password: string,
    rememberMe: boolean,
}
