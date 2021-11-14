import {Dispatch} from "redux";
import {authAPI} from "./AuthApi";


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

export const profileReducer = (state: InitialProfileType = initialState, action: ActionsType): InitialProfileType => {
    switch (action.type) {
        case 'profile/SET-PROFILE':
            return {
                ...state, avatar: action.avatar, email: action.email, name: action.name,
                publicCardPacksCount: action.publicCardPacksCount, _id: action._id
            }
        default:
            return {...state}
    }
}


//ActionsCreators

export const setProfile = (data: InitialProfileType) => {
    const {avatar, email, name, publicCardPacksCount, _id} = data
    return ({type: 'profile/SET-PROFILE', avatar, email, name, publicCardPacksCount, _id} as const)
}


//Thunks


//Types

export type SetProfileType = ReturnType<typeof setProfile>


type ActionsType = SetProfileType