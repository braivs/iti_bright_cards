import React, {useEffect} from 'react';
import './App.css';
import {Main} from "./p2-main/Main";
import {InitializeTC} from "../m2-bll/authReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../m2-bll/store";
import {Modal} from "./common/c7-Modal/Modal";

export const App = () => {
    const dispatch = useDispatch()
    const isInitialize = useSelector<AppStoreType, boolean>(state => state.auth.isInitilize)
    useEffect(() => {
        dispatch(InitializeTC())
    }, [])
    return (
        <div className="App">
            <Modal />
            {isInitialize && <Main/>}
        </div>
    );
}