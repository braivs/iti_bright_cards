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
            message: `<div>password recovery link:<a href='http://localhost:3000/#/passwordnew/$token$'>link</a></div>` //need to change this before yarn deploy
        }
        return instance.post<ResponseType>('auth/forgot', dataForPost)
    },
    changePassword(password: string, resetPasswordToken: string) {
        return instance.post<ResponseType>('auth/set-new-password', {password, resetPasswordToken})
    },
    getCardsPack() {
        // debugger
        return instance.get<CardsResponseType>('cards/pack')
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

type CardsPack = {
    _id: string
    user_id: string
    name: string
    path: string // папка
    cardsCount: number
    grade: number // средняя оценка карточек
    shots: number // количество попыток
    rating: number // лайки
    type: string // ещё будет "folder" (папка)
    created: string
    updated: string
    __v: number
}

type CardsResponseType = {
    cardsPack: Array<CardsPack>
    cardPacksTotalCount: number // количество колод
    maxCardsCount: number
    minCardsCount: number
    page: number // выбранная страница
    pageCount: number // количество элементов на странице
}