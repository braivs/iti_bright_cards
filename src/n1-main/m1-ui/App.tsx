import React from 'react';
import {HashRouter} from 'react-router-dom';
import './App.css';
import {Main} from "./p2-main/Main";

export const App = () => {
    return (
        <div className="App">
            <HashRouter />
            <Main />
        </div>
    );
}