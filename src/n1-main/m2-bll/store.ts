import {applyMiddleware, combineReducers, createStore} from "redux";
import {testReducer} from "./test-reducer";
import thunkMiddleware from "redux-thunk";
import {registrationReducer} from "./registrationReducer";
import {recoveryReducer} from "./recovery-reducer";
import {authReducer} from "../../n2-features/f1-auth/a1-login/authReducer";
import {profileReducer} from "../../n2-features/f1-auth/a3-profile/profileReducer";

const reducers = combineReducers({
    testReducer: testReducer,
    registration: registrationReducer,
    recoveryPassword: recoveryReducer,
    auth: authReducer,
    profile: profileReducer,

})

export const store = createStore(reducers, applyMiddleware(thunkMiddleware))

export type AppStoreType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store; // for dev