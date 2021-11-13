import {ThunkAction} from "redux-thunk";
import {AppStoreType} from "./store";
import {cardsAPI} from "./api/cards-api";
import {useDispatch} from "react-redux";
import {Dispatch} from "redux";

const initialState = {
    profile: null as ProfileType | null
}

type InitialStateType = typeof initialState;


export const recoveryReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "SET-AUTH-DATA": {
            return {...state, profile: action.profile}
        }
        default:
            return state
    }
}

export const recoveryPasswordTC = (email: string) => {
    return(dispatch: ThunkDispatch) => {
        cardsAPI.recoveryPassword(email)
            //todo: something here
            .then(() => {console.log('sended to email')})
    }
}

export const changePasswordTC = (email: string, resetPasswordToken: string) => {
    return(dispatch: ThunkDispatch) => {
        cardsAPI.changePassword(email, resetPasswordToken)
            //todo: something here
            .then(() => {console.log('password changed')})
    }
}

export const authMeTC = () => {
    return(dispatch: ThunkDispatch) => {
        cardsAPI.authMe()
            .then(res => {
                dispatch(setAuthUserDataAC(res.data as ProfileType))
            })

    }
}

export const RecoveryPasswordAC = () =>
    ({type: 'RECOVERY-PASSWORD'} as const)
const setAuthUserDataAC = (profile: ProfileType) => ({
    type: 'SET-AUTH-DATA', profile
} as const)

type ActionType = ReturnType<typeof RecoveryPasswordAC> | ReturnType<typeof setAuthUserDataAC>
// type AppThunkType = ThunkAction<void, AppStoreType, unknown, ActionType>
type ThunkDispatch = Dispatch<ActionType>

export type ProfileType = {
    created: string
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    rememberMe: boolean
    token: string
    tokenDeathTime: number
    updated: string
    verified: boolean
}