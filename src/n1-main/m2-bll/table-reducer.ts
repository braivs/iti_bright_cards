import {Dispatch} from "react";
import {cardsAPI, CardType} from "./api/cards-api";

const initialState: InitialStateType = {
    cards: []
}

export const tableReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "SET-CARDS":
            return {...state, cards: action.cards}
        default:
            return state
    }
}

// todo: need to fix any
type InitialStateType = {
    cards: Array<CardType>
}

export const setCardsAC = (cards: Array<CardType>) =>
    ({type: 'SET-CARDS', cards} as const)

export const getCardsPackTC = () => {
    return (dispatch: Dispatch<ActionType>) => {
        cardsAPI.getCardsPack()
            .then((res) => {
                setCardsAC(res.data.cardPacks)
                console.log('getCardsPack then:',res.data.cardPacks)
            })
            .catch((res) => {
                console.log('getCardsPack catch:', res.response.data.error)
            })

    }
}

type ActionType = ReturnType<typeof setCardsAC>