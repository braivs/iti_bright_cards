import React from 'react';
import {HashRouter, NavLink} from 'react-router-dom';
import './App.css';
import {Examples} from "./routes/Examples/Examples";
import {Route} from "react-router-dom";
import {Login} from "./routes/Login";
import {Registration} from "./routes/Registration";
import {Profile} from "./routes/Profile";
import {Page404} from "./routes/Page404";
import {PasswordRecovery} from "./routes/PasswordRecovery";
import {PasswordNew} from "./routes/PasswordNew";
import {Main} from "./p2-main/Main";

export const App = () => {
    return (
        <div className="App">
            <HashRouter />
            <Main />
            {/*hashRouter, provider*/}
            <>
                {/*в хэдер добавим навлинки чтобы прыгать по проекту через хэдер, а не через логику*/}
                {/*<p2-main/>*/}
                    {/* внутри p2-main отрисовываем Header и роуты */}
                    {/*<Header/>*/}

            </>
        </div>
    );
}