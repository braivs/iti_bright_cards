import React, {useEffect, useState} from 'react';
import s from './PasswordNew.module.scss'
import SuperInputText from "../../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {authMeTC, changePasswordTC, ProfileType} from "../../../n1-main/m2-bll/recovery-reducer";
import {AppStoreType} from "../../../n1-main/m2-bll/store";

export const PasswordNew = () => {
    const [newPassword, setNewPassword] = useState<string>('')
    const [newPassword2, setNewPassword2] = useState<string>('')
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(authMeTC())

    },[])

    const profile = useSelector<AppStoreType, ProfileType | null>(state => state.profile.profile)


    // const { token } = useParams<{token: string}>();
    const { token } = useParams<{token: string}>();
    // console.log('tokeen', token)

    const onClickHandler = () => {
        if (newPassword === newPassword2 && newPassword.length > 7) {
            console.log('password change', token)
            // dispatch(changePasswordTC())
            if (profile) {
                console.log(profile.email)
                dispatch(changePasswordTC(profile.email, token))
            } else {
                console.log('you are not authorized')
            }
        } else {
            console.log('problem with pass')
        }
    }

    return (
        <div className={s.passwordNew}>
            <h1>This page for changing you password.</h1>
            <p className={s.element}>It will take token from address link and new password from input and then new password will be set to
                you.</p>
            <div className={s.element}>
                <label className={s.passEl}>
                    <div>New password:</div>
                    <SuperInputText value={newPassword} onChangeText={setNewPassword} type={'password'} className={s.input}/>
                </label>
            </div>
            <div className={s.element}>
                <label className={s.passEl}>
                    <div>Password confirmation:</div>
                    <SuperInputText value={newPassword2} onChangeText={setNewPassword2} type={'password'} className={s.input}/>
                </label>
            </div>
            <div className={s.element}><SuperButton onClick={onClickHandler} className={s.button}>Change
                password</SuperButton></div>
        </div>
    );
}