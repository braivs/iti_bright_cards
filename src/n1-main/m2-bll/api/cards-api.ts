import axios from "axios";

const settings = {
    withCredentials: true
}

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    // baseURL: 'https://neko-back.herokuapp.com/2.0/',
    ...settings
})

export const cardsAPI = {
    recoveryPassword(email: string) {
        const dataForPost = {
            email,
            from: "Briws <brightwiths@gmail.com>",
            message: `<div>password recovery link:<a href='http://localhost:3000/#/passwordnew/$token$'>link</a></div>` // todo: need to change this before yarn deploy
        }
        return instance.post<ResponseType>('auth/forgot', dataForPost)
    },
    changePassword(password: string, resetPasswordToken: string) {
        return instance.post<ResponseType>('auth/set-new-password', {password, resetPasswordToken})
    },
    getCardsPack(userId: string, pageCount: string, profileOrPublic: string, page: number, cardPacksTotalCount: number  ) {
            return instance.get<CardsResponseType>(`cards/pack`, {params: {
                user_id: (profileOrPublic === 'Profile') ? userId : '', pageCount, page, cardPacksTotalCount,
            }})
    },
    addCardPack(cardPackName: string) {
        const dataForPost: addCardsPostType = {
            cardsPack: {
                name: cardPackName
            }
        }
        return instance.post('cards/pack', dataForPost)
    },
    deleteCardPack(cardPackId: string) {
        return instance.delete(`cards/pack?id=${cardPackId}`)
    },
    updateCardPack(cardPackId: string, newName: string) {
        const dataForPost: updateCardsPostType = {
            cardsPack: {
                _id: cardPackId,
                name: newName,
            }
        }
        return instance.put('cards/pack', dataForPost)
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

export type CardType = {
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
    cardPacks: Array<CardType>
    cardPacksTotalCount: number // количество колод
    maxCardsCount: number
    minCardsCount: number
    page: number // выбранная страница
    pageCount: number // количество элементов на странице
}
type addCardsPostType = {
    cardsPack: {
        name?: string
        path?: string
        grade?: number
        shots?: number
        rating?: number
        deckCover?: "url" | "base64"
        private?: boolean
        type?: string
    }
}
type updateCardsPostType = {
    cardsPack: {
        _id: string
        name?: string // не обязательно
    }
}