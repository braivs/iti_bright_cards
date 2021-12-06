import React from 'react';
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../n1-main/m2-bll/store";
import {InitialProfileType, SetProfileType} from "../../../n1-main/m2-bll/profileReducer";
import s from './profile.module.scss'
import {Redirect} from "react-router-dom";
import {ChangeAvatar} from "./ChangeAvatar";

export const Profile = () => {
    const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.auth.isLoggedIn)

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
                    <ChangeAvatar />
                    <span>{name}</span>
                    <span>Количество карт: {publicCardPacksCount}</span>
                </div>
            </div>

    );
}