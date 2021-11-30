import {cardsPackInstance} from "./cardsPack-api";

//todo: need to add types
export const cardsAPI = {
    getCards(cardsPack_id: string, page: number, pageCount: number) {
        return cardsPackInstance.get<any>('/cards/card', {params: {cardsPack_id, page, pageCount}})
    },
    addCard(cardsPack_id: string, question: string, answer: string) {
        const dataForPost = {
            card: {
                cardsPack_id,
                question,
                answer
            }
        }
        return cardsPackInstance.post('cards/card', dataForPost)
    },
    deleteCard(card_id: string) {
        return cardsPackInstance.delete(`cards/card?id=${card_id}`)
    },
    updateCard(card_id: string, newQuestion: string, newAnswer: string) {
        const dataForPost = {
            card: {
                _id: card_id,
                question: newQuestion,
                answer: newAnswer,
            }
        }
        return cardsPackInstance.put('cards/card', dataForPost)
    },
}

type ResponseType<D = {}> = {
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

type CardsResponseType = {
    cardPacks: Array<CardsPackType>
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

type cardDataType = {
    cards: Array<CardsPackType>
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    packUserId: string
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}

export type CardType = {
    answer: string
    cardsPack_id: string
    comments: string
    created: string
    grade: number
    more_id: string
    question: string
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    __v: number
    _id: string
}