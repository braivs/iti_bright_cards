import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../n1-main/m2-bll/store";
import {InitialProfileType, SetProfileType} from "../../../n1-main/m2-bll/profileReducer";
import s from './profile.module.scss'
import {InitializeTC} from "../../../n1-main/m2-bll/authReducer";
import {Redirect} from "react-router-dom";

export const Profile = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.auth.isLoggedIn)
    useEffect(() => {
        if(!isLoggedIn) {
            return
        }
        dispatch(InitializeTC())
    }, [])
    const {
        avatar,
        email,
        name,
        publicCardPacksCount,
        _id
    } = useSelector<AppStoreType, InitialProfileType>(state => state.profile)


    if(!isLoggedIn) {
        return <Redirect to='/login' />
    }
    return (
            <div className={s.profileContainer}>
                <div className={s.profile}>
                    {avatar ? <img src={avatar} alt=""/> : null}
                    <span>{name}</span>
                    <span>Количество карт: {publicCardPacksCount}</span>
                </div>
            </div>

    );
}