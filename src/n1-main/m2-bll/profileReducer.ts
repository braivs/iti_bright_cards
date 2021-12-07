import {Dispatch} from "redux";
import {authAPI, changeAPI} from "./api/AuthApi";
import {setIsError, setIsLoggedId} from "./authReducer";
import {log} from "util";
import {AppStoreType} from "./store";


let initialState = {
    avatar: '',
    email: '',
    name: '',
    publicCardPacksCount: 0,
    _id: '',
}

export type InitialProfileType = {
    avatar: string
    email: string
    name: string
    publicCardPacksCount: number
    _id: string
}
//1
export const profileReducer = (state: InitialProfileType = initialState, action: ActionsType): InitialProfileType => {
    switch (action.type) {
        case 'profile/SET-PROFILE':
            return {
                ...state, avatar: action.avatar, email: action.email, name: action.name,
                publicCardPacksCount: action.publicCardPacksCount, _id: action._id
            }
        case 'profile/SET-AVATAR' :
            return {
                ...state, avatar: action.avatar
            }
        default:
            return {...state}
    }
}
export const setAvatarAC = (avatar: string) => {
    return ({type: 'profile/SET-AVATAR', avatar} as const)
}
export const ChangeProfileTC = () => (dispatch: Dispatch, getState: () => any) => {
    const name = getState().profile.name
    const avatar = getState().profile.avatar
    console.log(avatar)
    changeAPI.changeProfile(name, avatar).then(res => console.log(res))
}
/*
export const LoginTC = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch<ActionsType | SetProfileType>) => {
    authAPI.login({email, password, rememberMe}).then(res => {
            dispatch(setIsLoggedId(true))
            dispatch(setProfile(res.data))

        }
    ).catch(e => {
            e.response ? dispatch(setIsError(e.response.data.error))
                : dispatch(setIsError(e.message + ', more details in the console'));
        }
    )
}
*/



//ActionsCreators

export const setProfile = (data: InitialProfileType) => {
    const {avatar, email, name, publicCardPacksCount, _id} = data
    return ({type: 'profile/SET-PROFILE', avatar, email, name, publicCardPacksCount, _id} as const)
}


//Thunks


//Types

export type SetProfileType = ReturnType<typeof setProfile>
export type SetAvatarType = ReturnType<typeof setAvatarAC>


type ActionsType = SetProfileType | SetAvatarType