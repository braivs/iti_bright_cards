import React from 'react';
import {NavLink} from "react-router-dom";

export const Header = () => {
    return (
        <div>
            <NavLink to={'/login'}>Login</NavLink>
            <NavLink to={'/registration'}>Registration</NavLink>
            <NavLink to={'/profile'}>Profile</NavLink>
            <NavLink to={'/404'}>404</NavLink>
            <NavLink to={'/passwordrecovery'}>Recovery Password</NavLink>
            <NavLink to={'/passwordnew'}>New Password</NavLink>
            <NavLink to={'/tests'}>Tests</NavLink>
        </div>
    );
}