import {cardsAPI} from "./api/cards-api";
import {Dispatch} from "redux";

const initialState = {
    info: '',
    errorText: ''
}

export const recoveryReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "RESTORE-PASS/SHOW-INFO-AND-ERROR":
            return {...state, info: action.infoText, errorText: action.errorText}
        default:
            return state
    }
}

export const showInfoAndErrorAC = (infoText: string, errorText: string) =>
    ({type: 'RESTORE-PASS/SHOW-INFO-AND-ERROR', infoText, errorText} as const)

export const forgotPasswordTC = (email: string) => {
    return (dispatch: Dispatch<ActionType>) => {
        cardsAPI.recoveryPassword(email)
            .then(res => {
                dispatch(showInfoAndErrorAC(res.data.info, ''))
            })
            .catch(res => {
                dispatch(showInfoAndErrorAC('', res.response.data.error))
            })
    }
}

export const setNewPasswordTC = (password: string, resetPasswordToken: string) => {
    return (dispatch: Dispatch<ActionType>) => {
        cardsAPI.changePassword(password, resetPasswordToken)
            .then(res => {
                dispatch(showInfoAndErrorAC(res.data.info, ''))
            })
            .catch(res => {
                dispatch(showInfoAndErrorAC('', res.response.data.error))
            })
    }
}

type InitialStateType = {
    info: string
    errorText: string
}
type ActionType = ReturnType<typeof showInfoAndErrorAC>
