import React from 'react';
import {NavLink} from "react-router-dom";
import s from './Header.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {LogoutTC} from "../../m2-bll/authReducer";
import {AppStoreType} from "../../m2-bll/store";

export const Header = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.auth.isLoggedIn)

    const logout = () => {
        dispatch(LogoutTC())
    }

    return (
        <div className={s.header}>
            <NavLink to={'/profile'}><div className={s.logo}>BrightCards</div></NavLink>
            <div className={s.links}>
                {isLoggedIn && <NavLink className={s.item} to={'/table'}>Table</NavLink>}
                {!isLoggedIn && <NavLink className={s.item} to={'/login'}>Login</NavLink>}
                {!isLoggedIn && <NavLink className={s.item} to={'/registration'}>Registration</NavLink>}
                <NavLink className={s.item} to={'/profile'}>Profile</NavLink>
                {!isLoggedIn && <NavLink className={s.item} to={'/passwordrecovery'}>PasswordRecovery</NavLink>}
                {/*<NavLink className={s.item} to={'/tests'}>Tests</NavLink> for tests type /tests in address*/}
                {isLoggedIn && <a className={s.link} onClick={logout}>Log out</a>}
            </div>

        </div>
    );
}