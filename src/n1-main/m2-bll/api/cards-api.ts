import axios from "axios";

const settings = {
    withCredentials: true
}

const instance = axios.create({
    // baseURL: 'http://localhost:7542/2.0/',
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    ...settings
})

export const cardsAPI = {
    recoveryPassword(email: string) {
        const dataForPost = {
            email,
            from: "Briws <brightwiths@gmail.com>",
            message: `<div>password recovery link:<a href='http://localhost:3000/#/passwordnew/$token$'>link</a></div>`
        }
        return instance.post<ResponseType>('auth/forgot', dataForPost)
    },
    changePassword(password: string, resetPasswordToken: string) {
        return instance.post<ResponseType>('/auth/set-new-password', {password, resetPasswordToken})
    }
}

type ResponseType = {
    info: string
    response: {
        data: {
            error: string
        }
    }
}
