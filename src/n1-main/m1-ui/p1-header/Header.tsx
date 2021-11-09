import React from 'react';
import {NavLink} from "react-router-dom";
import s from './Header.module.scss'

export const Header = () => {
    return (
        <div className={s.header}>
            <div className={s.logo}>BrightCards</div>
            <div className={s.links}>
                <NavLink className={s.item} to={'/login'}>Login</NavLink>
                <NavLink className={s.item} to={'/registration'}>Registration</NavLink>
                <NavLink className={s.item} to={'/profile'}>Profile</NavLink>
                <NavLink className={s.item} to={'/404'}>404</NavLink>
                <NavLink className={s.item} to={'/passwordrecovery'}>Recovery Password</NavLink>
                <NavLink className={s.item} to={'/passwordnew'}>New Password</NavLink>
                <NavLink className={s.item} to={'/tests'}>Tests</NavLink>
            </div>

        </div>
    );
}