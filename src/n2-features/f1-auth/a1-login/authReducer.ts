import {Dispatch} from 'redux'
import {authAPI, AuthLoginType} from "./AuthApi";
import {setProfile, SetProfileType} from "../a3-profile/profileReducer";


let initialState = {
    isLoggedIn: false,
    error: null
}


type InitialStateType = {
    isLoggedIn: boolean
    error: string | null
}


export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        case 'login/SET-IS-ERROR':
            return {...state, error: action.error}
        default:
            return {...state}
    }

}


//ActionsCreators

export const setIsLoggedId = (value: boolean) => {
    return ({type: 'login/SET-IS-LOGGED-IN', value} as const)
}

export const setIsError = (error: string) => {
    return ({type: 'login/SET-IS-ERROR', error} as const)
}

//Thunks
export const LoginTC = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch<ActionsType | SetProfileType>) => {
    authAPI.login({email, password, rememberMe}).then(res => {
            if (res.statusText === 'OK') {
                dispatch(setIsLoggedId(true))
                console.log(res.data)
                dispatch(setProfile(res.data))
            }
        }
    ).catch(e => {
            e.response ? dispatch(setIsError(e.response.data.error))
                : dispatch(setIsError(e.message + ', more details in the console'));
        }
    )
}

export const InitializeTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
            if (res.statusText === 'OK') {
                dispatch(setIsLoggedId(true))
                console.log(res.data)
                dispatch(setProfile(res.data))
            }
        }
    ).catch(e => {
            e.response && dispatch(setIsLoggedId(false))

        }
    )
}


//Types

type SetIsLoggedIdType = ReturnType<typeof setIsLoggedId>
type SetIsErrorType = ReturnType<typeof setIsError>

type ActionsType = SetIsLoggedIdType | SetIsErrorType