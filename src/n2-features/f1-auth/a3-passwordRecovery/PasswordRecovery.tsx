import React, {useState} from 'react';
import s from './PasswordRecovery.module.scss'
import SuperInputText from "../../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {useDispatch} from "react-redux";
import {recoveryPasswordTC} from "../../../n1-main/m2-bll/recovery-reducer";

export const PasswordRecovery = () => {
    const [email, setEmail] = useState<string>('')
    const dispatch = useDispatch()

    const onClickHandler = () => {
        dispatch(recoveryPasswordTC(email))
    }

    //todo: need to add error message here
    return (
        <div className={s.passwordRecovery}>
            <h1>This page will recover you password.</h1>
            <p className={s.element}>Please enter you email to input bellow and click recover.</p>
            <div className={s.element}>
                <label>
                    Your email:
                    <SuperInputText value={email} onChangeText={setEmail} className={s.input}/>
                </label>
            </div>
            <div className={s.element}><SuperButton onClick={onClickHandler} >Recover</SuperButton></div>
        </div>

    );
}