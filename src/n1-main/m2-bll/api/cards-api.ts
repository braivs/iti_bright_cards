import axios from "axios";
import {cardsPackInstance, CardsPackType} from "./cards-pack-api";

export const cardsAPI = {
    getCards(cardsPack_id: string) {
        return cardsPackInstance.get('/cards/card', {params: {cardsPack_id}})
    },
    addCard(cardsPack_id: string) {
        const dataForPost = {
            card: {
                cardsPack_id
            }
        }
        return cardsPackInstance.post('cards/card', dataForPost)
    },
    deleteCard(cardsPack_id: string) {
        return cardsPackInstance.delete(`cards/card?id=${cardsPack_id}`)
    },
    updateCard(cardsPack_id: string) {
        const dataForPost = {
            cardsPack: {
                _id: cardsPack_id
            }
        }
        return cardsPackInstance.put('cards/pack', dataForPost)
    },
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