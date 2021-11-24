import {cardsAPI, CardType} from "./api/cards-api";
import {AppStoreType} from "./store";
import {ThunkAction} from "redux-thunk";

const initialState: InitialStateType = {
    activeCardsPackId: '619ccba94f185200047ad5ad', //temp hardcoded
}

export const cardsReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "CARDS/SET-ACTIVE-CARD-PACK":
            return {...state, activeCardsPackId: action.activeCardsPackId}
        default:
            return state
    }

}

type InitialStateType = {
    activeCardsPackId: string
}

export const setActiveCardPackAC = (activeCardsPackId: string) =>
    ({type: 'CARDS/SET-ACTIVE-CARD-PACK', activeCardsPackId} as const)



export const getCardsTC = (): AppThunk => {
    return (dispatch, getState: () => AppStoreType) => {
        const cardsPack_id = getState().cards.activeCardsPackId
        cardsAPI.getCards(cardsPack_id)
            .then(res => {

                    console.log('getCardsTC then:', res)
            })
            .catch(res => {
                console.log('getCardsTC catch:', res.response.data.error)
            })
    }
}

export const updateCardTC = (): AppThunk => {
    return (dispatch, getState: () => AppStoreType) => {
        const cardsPack_id = getState().cards.activeCardsPackId
        cardsAPI.updateCard(cardsPack_id)
            .then(res => {
                console.log('updateCardTC then:', res)
            })
            .catch(res => {
                console.log('updateCardTC catch:', res.response.data.error)
            })
    }
}
export const addCardTC = (): AppThunk => {
    return (dispatch, getState: () => AppStoreType) => {
        const cardsPack_id = 'needToGetId' // need to get it from redux
        cardsAPI.addCard(cardsPack_id)
            .then(res => {
                console.log('addCardTC then:', res)
            })
            .catch(res => {
                console.log('addCardTC catch:', res.response.data.error)
            })
    }
}



export const deleteCardTC = (): AppThunk => {
    return (dispatch, getState: () => AppStoreType) => {
        const cardsPack_id = 'needToGetId' // need to get it from redux
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
    | ReturnType<typeof setActiveCardPackAC>

type AppThunk = ThunkAction<void, AppStoreType, unknown, ActionType>
