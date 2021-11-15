import React from 'react';
import {NavLink} from "react-router-dom";
import s from './Header.module.scss'
import {useDispatch} from "react-redux";
import {LogoutTC} from "../../../n2-features/f1-auth/a1-login/authReducer";

export const Header = () => {

    const dispatch = useDispatch()
    const logout = () => {
        dispatch(LogoutTC())
    }

    return (
        <div className={s.header}>
            <NavLink to={'/profile'}><div className={s.logo}>BrightCards</div></NavLink>
            <div className={s.links}>
                <NavLink className={s.item} to={'/login'}>Login</NavLink>
                <NavLink className={s.item} to={'/registration'}>Registration</NavLink>
                <NavLink className={s.item} to={'/profile'}>Profile</NavLink>
                <NavLink className={s.item} to={'/passwordrecovery/:token'}>PasswordRecovery</NavLink>
                <NavLink className={s.item} to={'/tests'}>Tests</NavLink>
                <NavLink className={s.item} to={'/login'} onClick={logout}>Log out</NavLink>
            </div>

        </div>
    );
}