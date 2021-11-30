import axios from "axios";
import {SortPackType} from "../cardsPack-reducer";

const settings = {
    withCredentials: true
}

export const cardsPackInstance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    // baseURL: 'https://neko-back.herokuapp.com/2.0/',
    ...settings
})

export const cardsPackApi = {
    getCardsPack(userId: string, pageCount: string, page: number,
                 packName: string,sortPacks: SortPackType, min: number, max: number) {
        return cardsPackInstance.get<CardsPackResponseType>(`cards/pack`, {params: {
                user_id: userId, pageCount, page, packName,
                sortPacks, min, max,
            }})
    },
    addCardPack(cardPackName: string) {
        const dataForPost: addCardsPackPostType = {
            cardsPack: {
                name: cardPackName
            }
        }
        return cardsPackInstance.post('cards/pack', dataForPost)
    },
    deleteCardPack(cardPackId: string) {
        return cardsPackInstance.delete(`cards/pack?id=${cardPackId}`)
    },
    updateCardPack(cardPackId: string, newName: string) {
        const dataForPost: updateCardsPackPostType = {
            cardsPack: {
                _id: cardPackId,
                name: newName,
            }
        }
        return cardsPackInstance.put('cards/pack', dataForPost)
    },
}

export type ResponseType<D = {}> = {
    info: string
    response: {
        data: D
    }
}

export type CardsPackType = {
    cardsCount: number
    created: string
    deckCover?: string
    grade: number // средняя оценка карточек
    more_id: string
    name: string
    path: string // папка
    private: boolean
    rating: number // лайки
    shots: number // количество попыток
    type: string // ещё будет "folder" (папка)
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id: string
}

type CardsPackResponseType = {
    cardPacks: Array<CardsPackType>
    cardPacksTotalCount: number // количество колод
    maxCardsCount: number
    minCardsCount: number
    page: number // выбранная страница
    pageCount: number // количество элементов на странице
}
type addCardsPackPostType = {
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
type updateCardsPackPostType = {
    cardsPack: {
        _id: string
        name?: string // не обязательно
    }
}
