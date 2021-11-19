import axios from "axios";

const instance = axios.create({
    // baseURL: 'http://localhost:7542/2.0/',
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
})

/*type ResponseType = {
    info: string
    response: {
        data: {
            email: string
            password: string
        }
    }
}*/

export const registrationAPI = {
    registration(email: string, password: string ){
        return instance.post<any>(`auth/register`, { email, password} )
    }
}
