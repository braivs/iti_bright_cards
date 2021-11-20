import {Dispatch} from "react";
import {cardsAPI} from "./api/cards-api";

const initialState: InitialStateType = {
    cardsPack: []
}

export const tableReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "SET-CARDS":
            return {...state}
        default:
            return state
    }
}

// todo: need to fix any
type InitialStateType = {
    cardsPack: Array<any>
}

export const setCardsAC = () =>
    ({type: 'SET-CARDS'} as const)

export const getCardsPackTC = () => {
    return (dispatch: Dispatch<ActionType>) => {
        // debugger
        cardsAPI.getCardsPack()
            .then((res) => {
                console.log('getCardsPack then:',res)
            })
            .catch((res) => {
                console.log('getCardsPack catch:', res.response.data.error)
            })
    }
}

type ActionType = ReturnType<typeof setCardsAC>