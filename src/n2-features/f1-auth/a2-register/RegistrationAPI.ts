import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const registrationAPI = {
    registration(email: string, password: string ){
        return instance.post<any>(`auth/register`, { email, password} )
    }
}
