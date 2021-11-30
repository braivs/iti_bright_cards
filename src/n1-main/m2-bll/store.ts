import {applyMiddleware, combineReducers, createStore} from "redux";
import {testReducer} from "./test-reducer";
import thunkMiddleware from "redux-thunk";
import {registrationReducer} from "./registrationReducer";
import {recoveryReducer} from "./recovery-reducer";
import {authReducer} from "./authReducer";
import {profileReducer} from "./profileReducer";
import {cardsPackReducer} from "./cardsPack-reducer";
import {cardsReducer} from "./cards-reducer";
import {modalReducer} from "./modal-reducer";

const reducers = combineReducers({
    testReducer: testReducer,
    registration: registrationReducer,
    recoveryPassword: recoveryReducer,
    auth: authReducer,
    profile: profileReducer,
    table: cardsPackReducer,
    cards: cardsReducer,
    modal: modalReducer,
})

export const store = createStore(reducers, applyMiddleware(thunkMiddleware))

export type AppStoreType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store; // for dev