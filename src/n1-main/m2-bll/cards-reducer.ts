import {cardsAPI, CardsPackType, CardType} from "./api/cards-api";
import {AppStoreType} from "./store";
import {ThunkAction} from "redux-thunk";

const initialState: InitialStateType = {
    cards: []
}

export const cardsReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "CARDS/SET-CARDS":
            return {...state, cards: action.cards}
        default:
            return state
    }

}

type InitialStateType = {
    cards: Array<CardType>
}

export const setCardsAC = (cards: Array<CardType>) =>
    ({type: 'CARDS/SET-CARDS', cards} as const)

//todo: need to fix @ts-ignore here
export const getCardsTC = (cardsPack_id: string): AppThunk => {
    return (dispatch, getState: () => AppStoreType) => {
        cardsAPI.getCards(cardsPack_id)
            .then(res => {
                console.log('getCardsTC then:', res.data)
                // @ts-ignore
                setCardsAC(res.data.cards)

            })
            .catch(res => {
                console.log('getCardsTC catch:', res.response.data.error)
            })
    }
}

export const updateCardTC = (cardsPack_id: string): AppThunk => {
    return (dispatch, getState: () => AppStoreType) => {
        cardsAPI.updateCard(cardsPack_id)
            .then(res => {
                console.log('updateCardTC then:', res)
            })
            .catch(res => {
                console.log('updateCardTC catch:', res.response.data.error)
            })
    }
}
export const addCardTC = (cardsPack_id: string): AppThunk => {
    return (dispatch, getState: () => AppStoreType) => {
        cardsAPI.addCard(cardsPack_id)
            .then(res => {
                console.log('addCardTC then:', res)
            })
            .catch(res => {
                console.log('addCardTC catch:', res.response.data.error)
            })
    }
}


export const deleteCardTC = (cardsPack_id: string): AppThunk => {
    return (dispatch, getState: () => AppStoreType) => {
        cardsAPI.deleteCard(cardsPack_id)
            .then(res => {
                console.log('deleteCardTC then:', res)
            })
            .catch(res => {
                console.log('deleteCardTC catch:', res.response.data.error)
            })
    }
}

type ActionType =
    | ReturnType<typeof setCardsAC>

type AppThunk = ThunkAction<void, AppStoreType, unknown, ActionType>
