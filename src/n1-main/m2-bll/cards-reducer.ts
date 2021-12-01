import {cardsAPI, CardType} from "./api/cards-api";
import {AppStoreType} from "./store";
import {ThunkAction} from "redux-thunk";
//import {getCardsPackTC, setCurrentPageAC} from "./table-reducer";
import {getCardsPackTC, setCurrentPageAC} from "./cardsPack-reducer";
import {Dispatch} from "redux";

const initialState: InitialStateType = {
    cards: [],
    pageCount: 1,
    page: 1,
    cardsTotalCount: 20,
    grade: 3,
    card_id: ''
}

export const cardsReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "CARDS/SET-CARDS":
            return {...state, cards: action.cards}
        case "CARDS/SET-CURRENT-PAGE-CARDS":
            return {...state, page: action.page}
        case "CARDS/SET-TOTAL-COUNT-CARDS":
            return {...state, cardsTotalCount: action.cardsTotalCount}
        case "CARDS/SET-PAGE-COUNT-CARDS":
            return {...state, pageCount: action.pageCount}
        case "CARDS/SET-CARDS-GRADE":
            return {...state, cards: state.cards.map(c => c._id === action.card_id ? {...c , grade: action.grade } : c)}
        default:
            return state
    }

}

type InitialStateType = {
    cards: Array<CardType>
    pageCount: number
    page: number
    cardsTotalCount: number
    grade: number
    card_id: string
}

export const setCardsGradeAC = (card_id: string, grade: number) =>
    ({type: 'CARDS/SET-CARDS-GRADE', card_id, grade} as const)

export const setCardsAC = (cards: Array<CardType>) =>
    ({type: 'CARDS/SET-CARDS', cards} as const)

export const setCurrentPageCardsAC = (page: number) =>
    ({type: 'CARDS/SET-CURRENT-PAGE-CARDS', page} as const)

export const setTotalCountCardsAC = (cardsTotalCount: number) =>
    ({type: 'CARDS/SET-TOTAL-COUNT-CARDS', cardsTotalCount,} as const)

export const setPageCountCardsAC = (pageCount: number) =>
    ({type: 'CARDS/SET-PAGE-COUNT-CARDS', pageCount,} as const)

//todo: need to fix @ts-ignore here
export const getCardsTC = (): AppThunk => {
    return (dispatch, getState: () => AppStoreType) => {
        const cardsPack_id = getState().table.selectedCardPackId;
        const page = getState().cards.page
        const pageCount = getState().cards.pageCount
        cardsAPI.getCards(cardsPack_id, page, pageCount)
            .then(res => {
                console.log('getCardsTC then:', res.data)
                // @ts-ignore
                dispatch(setCardsAC(res.data.cards))
                dispatch(setCurrentPageCardsAC(res.data.page))
                dispatch(setPageCountCardsAC(res.data.pageCount))
                dispatch(setTotalCountCardsAC(res.data.cardsTotalCount))
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

export const setCardsGrade = (cardId: string, grade: number) => {
    return (dispatch: Dispatch<ActionType>) => {
        cardsAPI.updateCardGrade(cardId, grade)
            .then(res => {
               dispatch(setCardsGradeAC(res.data.card_id, res.data.grade))
            })
            .catch(res =>{
                console.log(res.response.data.error)
            })
    }
}

type ActionType =
    | ReturnType<typeof setCardsAC>
    | ReturnType<typeof setCurrentPageCardsAC>
    | ReturnType<typeof setTotalCountCardsAC>
    | ReturnType<typeof setPageCountCardsAC>
    | ReturnType<typeof setCardsGradeAC>

type AppThunk = ThunkAction<void, AppStoreType, unknown, ActionType>
