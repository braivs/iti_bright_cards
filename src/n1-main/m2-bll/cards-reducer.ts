import {cardsAPI, CardType} from "./api/cards-api";
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
export const getCardsTC = (): AppThunk => {
    return (dispatch, getState: () => AppStoreType) => {
        const cardsPack_id = getState().table.selectedCardPackId;

        cardsAPI.getCards(cardsPack_id)
            .then(res => {
                console.log('getCardsTC then:', res.data)
                // @ts-ignore
                dispatch(setCardsAC(res.data.cards))

            })
            .catch(res => {
                console.log('getCardsTC catch:', res.response.data.error)
            })
    }
}

export const addCardTC = (): AppThunk => {
    return (dispatch, getState: () => AppStoreType) => {
        const cardsPack_id = getState().table.selectedCardPackId;

        cardsAPI.addCard(cardsPack_id)
            .then(res => {
                console.log('addCardTC then:', res)
                dispatch(getCardsTC())
            })
            .catch(res => {
                console.log('addCardTC catch:', res.response.data.error)
            })
    }
}

export const updateCardTC = (cardId: string, newQuestion: string): AppThunk => {
    return (dispatch) => {
        cardsAPI.updateCard(cardId, newQuestion)
            .then(res => {
                dispatch(getCardsTC())
                console.log('updateCardTC then:', res)

            })
            .catch(res => {
                console.log('updateCardTC catch:', res.response.data.error)
            })
    }
}

export const deleteCardTC = (cardId: string): AppThunk => {
    return (dispatch) => {

        cardsAPI.deleteCard(cardId)
            .then(res => {
                dispatch(getCardsTC())
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
