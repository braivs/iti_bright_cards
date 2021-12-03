import {cardsPackInstance} from "./cardsPack-api";
import axios from "axios";

const settings = {
    withCredentials: true
}

const recoveryPasswordInstanceHeroku = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/', // this works only with heroku
    ...settings
})

export const passwordRecoveryApi = {
    recoveryPassword(email: string) {
        const dataForPost = {
            email,
            from: "Briws <brightwiths@gmail.com>",
            /*message: `<div>password recovery link:<a href='http://localhost:3000/#/passwordnew/$token$'>link</a></div>`*/
            message: `<div>password recovery link:<a href='https://neko-back.herokuapp.com/2.0/#/passwordnew/$token$'>link</a></div>`
            // todo: need to change this before yarn deploy
        }
        return recoveryPasswordInstanceHeroku.post<ResponseType>('auth/forgot', dataForPost)
    },
    changePassword(password: string, resetPasswordToken: string) {
        return cardsPackInstance.post<ResponseType>('auth/set-new-password', {password, resetPasswordToken})
    },
}

type ResponseType = {
    answer: boolean
    html: boolean
    info: string
    success: boolean
}

// todo: Maybe need to type error.
