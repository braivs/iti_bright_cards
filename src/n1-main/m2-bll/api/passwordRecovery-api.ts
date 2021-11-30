import {cardsPackInstance} from "./cardsPack-api";
import {ResponseType} from "./cardsPack-api";

//todo: need to add types
export const passwordRecoveryApi = {
    recoveryPassword(email: string) {
        const dataForPost = {
            email,
            from: "Briws <brightwiths@gmail.com>",
            message: `<div>password recovery link:<a href='http://localhost:3000/#/passwordnew/$token$'>link</a></div>` // todo: need to change this before yarn deploy
        }
        return cardsPackInstance.post<ResponseType>('auth/forgot', dataForPost)
    },
    changePassword(password: string, resetPasswordToken: string) {
        return cardsPackInstance.post<ResponseType>('auth/set-new-password', {password, resetPasswordToken})
    },
}

