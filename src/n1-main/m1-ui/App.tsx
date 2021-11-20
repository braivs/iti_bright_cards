import React, {useEffect} from 'react';
import './App.css';
import {Main} from "./p2-main/Main";
import {InitializeTC} from "../m2-bll/authReducer";
import {useDispatch} from "react-redux";

export const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(InitializeTC())
    }, [])
    return (
        <div className="App">
            <Main />
        </div>
    );
}