import {Dispatch} from "react";
import {cardsAPI, CardType} from "./api/cards-api";
import {authAPI} from "../../n2-features/f1-auth/a1-login/AuthApi";

const initialState: InitialStateType = {
    cardPacks: []
}

export const tableReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "SET-CARDS":
            return {...state, cardPacks: action.cards}
        default:
            return state
    }
}

// todo: need to fix any
type InitialStateType = {
    cardPacks: Array<CardType>
}

export const setCardsAC = (cards: Array<CardType>) =>
    ({type: 'SET-CARDS', cards} as const)

export const getCardsPackTC = (userId: string, pageCount: string, profileOrPublic: string) => {
    return (dispatch: Dispatch<ActionType>) => {
        cardsAPI.getCardsPack(userId, pageCount, profileOrPublic)
            .then((res) => {
                dispatch(setCardsAC(res.data.cardPacks))
                console.log('getCardsPack then:', res.data.cardPacks)
            })
            .catch((res) => {
                console.log('getCardsPack catch:', res.response.data.error)
            })

    }
}

export const addCardsPackTC = (cardPackName: string) => {
    return (dispatch: any) => {
        cardsAPI.addCardPack(cardPackName)
            .then(res => {
                console.log('addCardsPackTC then:', res)
                // dispatch(getCardsPackTC(userID, pageCount, profileOrPublic))
            })
            .catch(res => {
                console.log('addCardsPackTC catch:', res.response.data.error)
            })
    }
}

export const deleteCardsPackTC = (cardPackId: string) => {
    return (dispatch: Dispatch<ActionType>) => {
        cardsAPI.deleteCardPack(cardPackId)
            .then(res => {
                console.log('deleteCardsPackTC then:', res)
            })
            .catch(res => {
                console.log('deleteCardsPackTC catch:', res.response.data.error)
            })
    }
}

export const updateCardPackTC = (cardPackId: string, newName: string) => {
    return (dispatch: Dispatch<ActionType>) => {
        cardsAPI.updateCardPack(cardPackId, newName)
            .then(res => {
                console.log('updateCardPackTC then:', res)
            })
            .catch(res => {
                console.log('updateCardPackTC catch:', res.response.data.error)
            })
    }
}

type ActionType = ReturnType<typeof setCardsAC>