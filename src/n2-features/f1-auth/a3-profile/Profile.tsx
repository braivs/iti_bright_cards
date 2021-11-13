import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../n1-main/m2-bll/store";
import {InitialProfileType, SetProfileType} from "./profileReducer";
import s from './profile.module.scss'
import {InitializeTC} from "../a1-login/authReducer";
import {Redirect} from "react-router-dom";

export const Profile = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(InitializeTC())
    }, [])
    const {
        avatar,
        email,
        name,
        publicCardPacksCount,
        _id
    } = useSelector<AppStoreType, InitialProfileType>(state => state.profile)
    const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.auth.isLoggedIn)


    if(!isLoggedIn) {
        return <Redirect to='/login' />
    }
    return (
        <div>
            <div className={s.profileContainer}>
                <div className={s.profile}>
                    {avatar ? <img src={avatar} alt=""/> : null}
                    <span>{name}</span>
                    <span>Количество карт: {publicCardPacksCount}</span>
                </div>
            </div>
        </div>
    );
}