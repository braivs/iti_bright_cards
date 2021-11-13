import {applyMiddleware, combineReducers, createStore} from "redux";
import {testReducer} from "./test-reducer";
import thunkMiddleware from "redux-thunk";
import {recoveryReducer} from "./recovery-reducer";

const reducers = combineReducers({
    testReducer: testReducer,
    profile: recoveryReducer
})

export const store = createStore(reducers, applyMiddleware(thunkMiddleware))

export type AppStoreType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store; // for dev