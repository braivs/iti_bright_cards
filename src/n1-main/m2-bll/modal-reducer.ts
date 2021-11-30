const initialState: InitialStateType = {
    activeCardPack: '',
    modalDelCardPackShowHide: false,
    modalAddCardPackShowHide: false
}

export const modalReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'MODAL/SET-ACTIVE-CARD-PACK':
            return {...state, activeCardPack: action.activeCardPack}
        case 'MODAL/CLOSE-ALL-MODALS':
            return {...state,
                modalDelCardPackShowHide: false,
                modalAddCardPackShowHide: false}
        case 'MODAL/SHOW-MODAL-DEL-CARD':
            return {...state, modalDelCardPackShowHide: true}
        case "MODAL/SHOW-MODAL-ADD-CARD":
            return {...state, modalAddCardPackShowHide: true}
        default:
            return state
    }
}

export const setActiveCardPackAC = (activeCardPack: string) =>
    ({type: 'MODAL/SET-ACTIVE-CARD-PACK', activeCardPack} as const)
export const closeAllModalsAC = () =>
    ({type: 'MODAL/CLOSE-ALL-MODALS'} as const)
export const showModalDelCardPackAC = () =>
    ({type: 'MODAL/SHOW-MODAL-DEL-CARD'} as const)
export const showModalAddCardPackAC = () =>
    ({type: 'MODAL/SHOW-MODAL-ADD-CARD'} as const)

type InitialStateType = {
    activeCardPack: string
    modalDelCardPackShowHide: boolean
    modalAddCardPackShowHide: boolean
}

type ActionType =
    | ReturnType<typeof setActiveCardPackAC>
    | ReturnType<typeof closeAllModalsAC>
    | ReturnType<typeof showModalDelCardPackAC>
    | ReturnType<typeof showModalAddCardPackAC>