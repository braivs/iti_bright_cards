import {Dispatch} from "react";
import {cardsAPI, CardType} from "./api/cards-api";
import {AppStoreType} from "./store";
import {useSelector} from "react-redux";

const initialState: InitialStateType = {
    cardPacks: [],
    cardPacksTotalCount: 10,
    pageCount: 5,
    page: 1,
    userIdAfterRadio: '',
}

export const tableReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "TABLE/SET-CARDS":
            return {...state, cardPacks: action.cards}
        case "TABLE/SET-CURRENT-PAGE":
            return {...state, page: action.page}
        case "TABLE/SET-TOTAL-COUNT":
            return {...state, cardPacksTotalCount: action.cardPacksTotalCount}
        case "TABLE/SET-PAGE-COUNT":
            return {...state, pageCount: action.pageCount}
        case "TABLE/SET-USER-ID-AFTER-RADIO":
            return {...state, userIdAfterRadio: action.userIdAfterRadio}
        default:
            return state
    }
}

type InitialStateType = {
    cardPacks: Array<CardType>
    cardPacksTotalCount: number
    pageCount: number
    page: number
    userIdAfterRadio: string
}

export const setCardsAC = (cards: Array<CardType>) =>
    ({type: 'TABLE/SET-CARDS', cards} as const)

export const setCurrentPageAC = (page: number) =>
    ({type: 'TABLE/SET-CURRENT-PAGE', page} as const)

export const setTotalCountAC = (cardPacksTotalCount: number) =>
    ({type: 'TABLE/SET-TOTAL-COUNT', cardPacksTotalCount,} as const)

export const setPageCountAC = (pageCount: number) =>
    ({type: 'TABLE/SET-PAGE-COUNT', pageCount,} as const)

export const setUserIdAfterRadioAC = (userIdAfterRadio: string) =>
    ({type: 'TABLE/SET-USER-ID-AFTER-RADIO', userIdAfterRadio} as const)

export const getCardsPackTC = (userId: string, pageCount: string) => {
    return (dispatch: Dispatch<ActionType>, getState: () => AppStoreType) => {
        const page = getState().table.page
        const cardPacksTotalCount = getState().table.cardPacksTotalCount
        cardsAPI.getCardsPack(userId, pageCount, page, cardPacksTotalCount)
            .then((res) => {
                dispatch(setCardsAC(res.data.cardPacks))
                dispatch(setTotalCountAC(res.data.cardPacksTotalCount))
                dispatch(setCurrentPageAC(res.data.page))
                console.log('getCardsPack then:', res.data.cardPacks)
            })
            .catch((res) => {
                console.log('getCardsPack catch:', res.response.data.error)
            })

    }
}



export const addCardsPackTC = (cardPackName: string) => {
    // const userIdAfterRadio = useSelector<AppStoreType, string>(state => state.table.userIdAfterRadio)
    // const pageCount = useSelector<AppStoreType, number>(state => state.table.pageCount).toString()
    // const state = getState();

    return (dispatch: any) => {
        cardsAPI.addCardPack(cardPackName)
            .then(res => {
                console.log('addCardsPackTC then:', res)
                // dispatch(getCardsPackTC(userIdAfterRadio, pageCount))
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
    | ReturnType<typeof setCardsAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setTotalCountAC>
    | ReturnType<typeof setPageCountAC>
    | ReturnType<typeof setUserIdAfterRadioAC>