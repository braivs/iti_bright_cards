import axios from "axios";
import {cardsPackInstance, CardsPackType} from "./cardsPack-api";

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
    deleteCard(card_id: string) {
        return cardsPackInstance.delete(`cards/card?id=${card_id}`)
    },
    updateCard(card_id: string, newQuestion: string) {
        const dataForPost = {
            card: {
                _id: card_id,
                question: newQuestion
            }
        }
        return cardsPackInstance.put('cards/card', dataForPost)
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