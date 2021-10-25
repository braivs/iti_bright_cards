import React from 'react';
import {Header} from "../p1-header/Header";
import {Redirect, Route, Switch} from "react-router-dom";
import {Login} from "../routes/Login";
import {Registration} from "../routes/Registration";
import {Profile} from "../routes/Profile";
import {Page404} from "../routes/Page404";
import {PasswordRecovery} from "../routes/PasswordRecovery";
import {PasswordNew} from "../routes/PasswordNew";
import {Examples} from "../routes/Examples/Examples";
import {TestForReducer} from "../p3-pages/TestForReducer";

export const Main = () => {
    return (
        <div>
            <Header/>
            <TestForReducer />
            <Switch>
                <Route exact path={'/login'} render={() => <Login/>}/>
                <Route exact path={'/registration'} render={() => <Registration/>}/>
                <Route exact path={'/profile'} render={() => <Profile/>}/>
                <Route exact path={'/404'} render={() => <Page404/>}/>
                <Route exact path={'/passwordrecovery'} render={() => <PasswordRecovery/>}/>
                <Route exact path={'/passwordnew'} render={() => <PasswordNew/>}/>
                <Route exact path={'/tests'} render={() => <Examples/>}/>
                <Redirect exact from={'/'} to={'/tests'}/>
                <Redirect from={'*'} to={'/404'}/>
            </Switch>
        </div>
    );
}