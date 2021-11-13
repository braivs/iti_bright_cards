import {ThunkAction} from "redux-thunk";
import {AppStoreType} from "./store";
import {cardsAPI} from "./api/cards-api";

export const recoveryPasswordTC = (email: string) => {
    return(dispatch: AppThunkType) => {
        cardsAPI.recoveryPassword(email)
            //todo: something here
            .then(() => {console.log('sended to email')})
    }
}

export const RecoveryPasswordAC = () =>
    ({type: 'RECOVERY-PASSWORD'} as const)

type ActionType = ReturnType<typeof RecoveryPasswordAC>
type AppThunkType = ThunkAction<void, AppStoreType, unknown, ActionType>