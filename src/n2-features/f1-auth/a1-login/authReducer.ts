import {Dispatch} from 'redux'
import {authAPI, AuthLoginType} from "./AuthApi";


let initialState = {
    isLoggedIn: false
}


type InitialStateType = typeof initialState


export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return {...state}
    }

}


//ActionsCreators

export const setIsLoggedId = (value: boolean) => {
    return ({type: 'login/SET-IS-LOGGED-IN', value} as const)
}

//Thunks
export const LoginTC = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch) => {
    authAPI.login({email, password, rememberMe}).then(res => {
            if (res.statusText === 'OK') {
                dispatch(setIsLoggedId(true))
            }
        }
    )

}


//Types

type SetIsLoggedIdType = ReturnType<typeof setIsLoggedId>

type ActionsType = SetIsLoggedIdType