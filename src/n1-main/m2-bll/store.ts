import {combineReducers, createStore} from "redux";
import {testReducer} from "./testReducer";

const reducers = combineReducers({
    testReducer: testReducer
})

export const store = createStore(reducers)

export type AppStoreType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store; // for dev