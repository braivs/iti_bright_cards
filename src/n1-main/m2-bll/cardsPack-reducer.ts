import {Dispatch} from "react";
import {AppStoreType} from "./store";
import {ThunkAction} from "redux-thunk";
import {cardsPackApi, CardsPackType} from "./api/cardsPack-api";


 export type SortPackType = '0name' | '1name' | '0cardsCount' | '1cardsCount' | '0updated'| '1updated'| null
const initialState: InitialStateType = {
    cardPacks: [],
    cardPacksTotalCount: 10,
    pageCount: 5,
    page: 1,
    userIdAfterRadio: '',
    packName: '',
    sortPacks:null,
    max: 4,
    min: 0,
    selectedCardPackId: ''

}

export const cardsPackReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "TABLE/SET-CARD-PACKS":
            return {...state, cardPacks: action.cardPack}
        case "TABLE/SET-CURRENT-PAGE":
            return {...state, page: action.page}
        case "TABLE/SET-TOTAL-COUNT":
            return {...state, cardPacksTotalCount: action.cardPacksTotalCount}
        case "TABLE/SET-PAGE-COUNT":
            return {...state, pageCount: action.pageCount}
        case "TABLE/SET-USER-ID-AFTER-RADIO":
            return {...state, userIdAfterRadio: action.userIdAfterRadio}
        case "TABLE/SET-SEARCH-PACK-NAME":
            return {...state, packName: action.packName}
        case "TABLE/SORT-PACKS":
            return {...state, sortPacks: action.sortPacks}
        case "TABLE/SET-CARDS-COUNT":
            return {...state, max: action.max, min: action.min}
        case "TABLE/SET-SELECTED-CARD-PACK":
            return {...state, selectedCardPackId: action.cardPackId}
        default:
            return state
    }
}

type InitialStateType = {
    cardPacks: Array<CardsPackType>
    cardPacksTotalCount: number
    pageCount: number
    page: number
    userIdAfterRadio: string
    packName: string
    sortPacks: SortPackType
    min: number
    max: number
    selectedCardPackId: string
}

export const setSearchPackNameAC = (packName: string) =>
    ({type: 'TABLE/SET-SEARCH-PACK-NAME', packName} as const)

export const setCardPacksAC = (cardPack: Array<CardsPackType>) =>
    ({type: 'TABLE/SET-CARD-PACKS', cardPack} as const)

export const setCurrentPageAC = (page: number) =>
    ({type: 'TABLE/SET-CURRENT-PAGE', page} as const)

export const setTotalCountAC = (cardPacksTotalCount: number) =>
    ({type: 'TABLE/SET-TOTAL-COUNT', cardPacksTotalCount,} as const)

export const setPageCountAC = (pageCount: number) =>
    ({type: 'TABLE/SET-PAGE-COUNT', pageCount,} as const)

export const setUserIdAfterRadioAC = (userIdAfterRadio: string) =>
    ({type: 'TABLE/SET-USER-ID-AFTER-RADIO', userIdAfterRadio} as const)

export const sortPacksAC = (sortPacks: SortPackType) =>
    ({type: 'TABLE/SORT-PACKS', sortPacks} as const)

export const setCardsCountAC = (min: number,max: number ) =>  //минимальное и максимальное число карт
    ({type: 'TABLE/SET-CARDS-COUNT', min, max,} as const)

export const setSelectedCardPack = (cardPackId: string) =>
    ({type: 'TABLE/SET-SELECTED-CARD-PACK', cardPackId} as const)

export const getCardsPackTC = () => {
    return (dispatch: Dispatch<ActionType>, getState: () => AppStoreType) => {
        const page = getState().table.page
        const cardPacksTotalCount = getState().table.cardPacksTotalCount
        const packName = getState().table.packName
        const pageCount = getState().table.pageCount.toString()
        const userIdAfterRadio = getState().table.userIdAfterRadio
        const sortPacks = getState().table.sortPacks
        const min = getState().table.min
        const max = getState().table.max

        cardsPackApi.getCardsPack(userIdAfterRadio, pageCount, page, cardPacksTotalCount,
            packName, sortPacks, min, max,)
            .then((res) => {
                dispatch(setCardPacksAC(res.data.cardPacks))
                dispatch(setTotalCountAC(res.data.cardPacksTotalCount))
                dispatch(setCurrentPageAC(res.data.page))
                console.log('getCardsPack then:', res.data.cardPacks)
            })
            .catch((res) => {
                console.log('getCardsPack catch:', res.response.data.error)
            })

    }
}

export const addCardsPackTC = (cardPackName: string): AppThunk => {
    return (dispatch, getState: () => AppStoreType) => {
        cardsPackApi.addCardPack(cardPackName)
            .then(res => {
                console.log('addCardsPackTC then:', res)
                dispatch(getCardsPackTC())
            })
            .catch(res => {
                console.log('addCardsPackTC catch:', res.response.data.error)
            })
    }
}

export const deleteCardsPackTC = (cardPackId: string): AppThunk => {
    return (dispatch, getState: () => AppStoreType) => {
        cardsPackApi.deleteCardPack(cardPackId)
            .then(res => {
                console.log('deleteCardsPackTC then:', res)
                dispatch(getCardsPackTC())
            })
            .catch(res => {
                console.log('deleteCardsPackTC catch:', res.response.data.error)
            })
    }
}

export const updateCardPackTC = (cardPackId: string, newName: string): AppThunk => {
    return (dispatch, getState: () => AppStoreType) => {
        cardsPackApi.updateCardPack(cardPackId, newName)
            .then(res => {
                console.log('updateCardPackTC then:', res)
                dispatch(getCardsPackTC())
            })
            .catch(res => {
                console.log('updateCardPackTC catch:', res.response.data.error)
            })
    }
}

type ActionType =
    | ReturnType<typeof setCardPacksAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setTotalCountAC>
    | ReturnType<typeof setPageCountAC>
    | ReturnType<typeof setUserIdAfterRadioAC>
    | ReturnType<typeof setSearchPackNameAC>
    | ReturnType<typeof sortPacksAC>
    | ReturnType<typeof setCardsCountAC>
    | ReturnType<typeof setSearchPackNameAC>
    | ReturnType<typeof setSelectedCardPack>

type AppThunk = ThunkAction<void, AppStoreType, unknown, ActionType>
