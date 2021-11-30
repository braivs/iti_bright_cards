const initialState: InitialStateType = {
    modalShowHide: false,
    activeCardPack: ''
}

export const modalReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "MODAL/SET-MODAL-SHOW-HIDE":
            return {...state, modalShowHide: action.status}
        case "MODAL/SET-ACTIVE-CARD-PACK":
            return {...state, activeCardPack: action.activeCardPack}
        default:
            return state
    }
}

export const setModalShowHideAC = (status: boolean) =>
    ({type: 'MODAL/SET-MODAL-SHOW-HIDE', status} as const)

export const setActiveCardPackAC = (activeCardPack: string) =>
    ({type: 'MODAL/SET-ACTIVE-CARD-PACK', activeCardPack} as const)


type InitialStateType = {
    modalShowHide: boolean
    activeCardPack: string
}

type ActionType =
    | ReturnType<typeof setModalShowHideAC>
    | ReturnType<typeof setActiveCardPackAC>