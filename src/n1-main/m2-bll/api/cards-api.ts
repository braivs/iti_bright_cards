import {cardsPackInstance} from "./cardsPack-api";

export const cardsAPI = {
    getCards(cardsPack_id: string, page: number, pageCount: number) {
        return cardsPackInstance.get<GetCardsResponseType>('/cards/card', {params: {cardsPack_id, page, pageCount}})
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
    updateCardGrade(card_id: string, grade: number){
        return cardsPackInstance.put<UpdateCardGradeType>('cards/grade',{card_id, grade})
    }
}

type UpdateCardGradeType = {
    _id: ''
    cardsPack_id: ''
    card_id: ''
    user_id: ''
    grade: number
    shots: number
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
type GetCardsResponseType = {
    cards: Array<CardType>
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    packUserId: string
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}
// DeleteCardResponseType and UpdateCardResponseType not typed because in task no need.

// todo: Maybe need to type error.