const initialState: InitialStateType = {
    activeCardPackId: '',
    modalDelCardsPackShowHide: false,
    modalAddCardsPackShowHide: false,
    modalUpdateCardsPackShowHide: false,
    activeCardId: '',
    modalDelCardShowHide: false,
    modalAddCardShowHide: false,
    modalUpdateCardShowHide: false,
}

export const modalReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'MODAL/SET-ACTIVE-CARDS-PACK-ID':
            return {...state, activeCardPackId: action.activeCardPackId}
        case 'MODAL/CLOSE-ALL-MODALS':
            return {...state, modalDelCardsPackShowHide: false, modalAddCardsPackShowHide: false,
                modalUpdateCardsPackShowHide: false, modalDelCardShowHide: false, modalAddCardShowHide: false,
                modalUpdateCardShowHide: false
            }
        case 'MODAL/SHOW-MODAL-DEL-CARDS-PACK':
            return {...state, modalDelCardsPackShowHide: true}
        case "MODAL/SHOW-MODAL-ADD-CARDS-PACK":
            return {...state, modalAddCardsPackShowHide: true}
        case "MODAL/SHOW-MODAL-UPDATE-CARDS-PACK":
            return {...state, modalUpdateCardsPackShowHide: true}
        case "MODAL/SET-ACTIVE-CARD-ID":
            return {...state, activeCardId: action.activeCardId}
        case "MODAL/SHOW-MODAL-DEL-CARD":
            return {...state, modalDelCardShowHide: true}
        case "MODAL/SHOW-MODAL-ADD-CARD":
            return {...state, modalAddCardShowHide: true}
        case "MODAL/SHOW-MODAL-UPDATE-CARD":
            return {...state, modalUpdateCardShowHide: true}
        default:
            return state
    }
}

export const setActiveCardPackAC = (activeCardPackId: string) =>
    ({type: 'MODAL/SET-ACTIVE-CARDS-PACK-ID', activeCardPackId} as const)
export const closeAllModalsAC = () =>
    ({type: 'MODAL/CLOSE-ALL-MODALS'} as const)
export const showModalDelCardsPackAC = () =>
    ({type: 'MODAL/SHOW-MODAL-DEL-CARDS-PACK'} as const)
export const showModalAddCardsPackAC = () =>
    ({type: 'MODAL/SHOW-MODAL-ADD-CARDS-PACK'} as const)
export const showModalUpdateCardsPackAC = () =>
    ({type: 'MODAL/SHOW-MODAL-UPDATE-CARDS-PACK'} as const)
export const showModalDelCardAC = () =>
    ({type: 'MODAL/SHOW-MODAL-DEL-CARD'} as const)
export const setActiveCardAC = (activeCardId: string) =>
    ({type: 'MODAL/SET-ACTIVE-CARD-ID', activeCardId} as const)
export const showModalAddCardAC = () =>
    ({type: 'MODAL/SHOW-MODAL-ADD-CARD'} as const)
export const showModalUpdateCardAC = () =>
    ({type: 'MODAL/SHOW-MODAL-UPDATE-CARD'} as const)

type InitialStateType = {
    activeCardPackId: string
    modalDelCardsPackShowHide: boolean
    modalAddCardsPackShowHide: boolean
    modalUpdateCardsPackShowHide: boolean
    activeCardId: string
    modalDelCardShowHide: boolean
    modalAddCardShowHide: boolean
    modalUpdateCardShowHide: boolean
}

type ActionType =
    | ReturnType<typeof setActiveCardPackAC>
    | ReturnType<typeof closeAllModalsAC>
    | ReturnType<typeof showModalDelCardsPackAC>
    | ReturnType<typeof showModalAddCardsPackAC>
    | ReturnType<typeof showModalUpdateCardsPackAC>
    | ReturnType<typeof setActiveCardAC>
    | ReturnType<typeof showModalDelCardAC>
    | ReturnType<typeof showModalAddCardAC>
    | ReturnType<typeof showModalUpdateCardAC>

// todo: maybe possible to optimize boilerplate code is cases