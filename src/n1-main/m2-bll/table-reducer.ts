import {Dispatch} from "react";
import {cardsAPI, CardType} from "./api/cards-api";
import {authAPI} from "../../n2-features/f1-auth/a1-login/AuthApi";
import {AppStoreType} from "./store";

const initialState: InitialStateType = {
    cardPacks: [],
    cardPacksTotalCount: 10,
    pageCount: 5,
    page: 1,
    packName: ''

}

export const tableReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "SET-CARDS":
            return {...state, cardPacks: action.cards}
        case "SET-CURRENT-PAGE":
            return {...state, page: action.page}
        case "SET-TOTAL-COUNT":
            return {...state, cardPacksTotalCount: action.cardPacksTotalCount}
        case "SET-SEARCH-PACK-NAME":
            return {...state, packName: action.packName}
        default:
            return state
    }
}

// todo: need to fix any
type InitialStateType = {
    cardPacks: Array<CardType>
    cardPacksTotalCount: number
    pageCount: number
    page: number
    packName: string
}

export const setSearchPackNameAC = (packName: string) =>
    ({type: 'SET-SEARCH-PACK-NAME', packName} as const)
export const setCardsAC = (cards: Array<CardType>) =>
    ({type: 'SET-CARDS', cards} as const)

export const setCurrentPageAC = (page: number) =>
    ({type: 'SET-CURRENT-PAGE', page} as const)

export const setTotalCountAC = (cardPacksTotalCount: number) =>
    ({type: 'SET-TOTAL-COUNT', cardPacksTotalCount,} as const)

export const getCardsPackTC = (userId: string, pageCount: string, profileOrPublic: string = '') => {
    return (dispatch: Dispatch<ActionType>, getState: () => AppStoreType) => {
        const page = getState().table.page
        const cardPacksTotalCount = getState().table.cardPacksTotalCount
        const packName = getState().table.packName
        cardsAPI.getCardsPack(userId, pageCount, profileOrPublic, page, cardPacksTotalCount, packName)
            .then((res) => {
                dispatch(setCardsAC(res.data.cardPacks))
                dispatch(setTotalCountAC(res.data.cardPacksTotalCount))
                //dispatch(setCurrentPageAC(res.data.page))
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

type ActionType =
    ReturnType<typeof setCardsAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setTotalCountAC>
    |ReturnType<typeof setSearchPackNameAC>