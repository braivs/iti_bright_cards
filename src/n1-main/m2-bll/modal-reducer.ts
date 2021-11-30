const initialState: InitialStateType = {
    activeCardPackId: '',
    modalDelCardsPackShowHide: false,
    modalAddCardsPackShowHide: false,
    modalUpdateCardsPackShowHide: false
}

export const modalReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'MODAL/SET-ACTIVE-CARDS-PACK':
            return {...state, activeCardPackId: action.activeCardPack}
        case 'MODAL/CLOSE-ALL-MODALS':
            return {...state,
                modalDelCardsPackShowHide: false,
                modalAddCardsPackShowHide: false,
                modalUpdateCardsPackShowHide: false
            }
        case 'MODAL/SHOW-MODAL-DEL-CARDS-PACK':
            return {...state, modalDelCardsPackShowHide: true}
        case "MODAL/SHOW-MODAL-ADD-CARDS-PACK":
            return {...state, modalAddCardsPackShowHide: true}
        case "MODAL/SHOW-MODAL-UPDATE-CARDS-PACK":
            return {...state, modalUpdateCardsPackShowHide: true}
        default:
            return state
    }
}

export const setActiveCardPackAC = (activeCardPack: string) =>
    ({type: 'MODAL/SET-ACTIVE-CARDS-PACK', activeCardPack} as const)
export const closeAllModalsAC = () =>
    ({type: 'MODAL/CLOSE-ALL-MODALS'} as const)
export const showModalDelCardsPackAC = () =>
    ({type: 'MODAL/SHOW-MODAL-DEL-CARDS-PACK'} as const)
export const showModalAddCardsPackAC = () =>
    ({type: 'MODAL/SHOW-MODAL-ADD-CARDS-PACK'} as const)
export const showModalUpdateCardsPackAC = () =>
    ({type: 'MODAL/SHOW-MODAL-UPDATE-CARDS-PACK'} as const)

type InitialStateType = {
    activeCardPackId: string
    modalDelCardsPackShowHide: boolean
    modalAddCardsPackShowHide: boolean
    modalUpdateCardsPackShowHide: boolean
}

type ActionType =
    | ReturnType<typeof setActiveCardPackAC>
    | ReturnType<typeof closeAllModalsAC>
    | ReturnType<typeof showModalDelCardsPackAC>
    | ReturnType<typeof showModalAddCardsPackAC>
    | ReturnType<typeof showModalUpdateCardsPackAC>