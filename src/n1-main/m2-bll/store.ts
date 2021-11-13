import {applyMiddleware, combineReducers, createStore} from "redux";
import {testReducer} from "./testReducer";
import thunkMiddleware from "redux-thunk";
import {authReducer} from "../../n2-features/f1-auth/a1-login/authReducer";

const reducers = combineReducers({
    testReducer: testReducer,
    auth: authReducer
})

export const store = createStore(reducers, applyMiddleware(thunkMiddleware))

export type AppStoreType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store; // for dev