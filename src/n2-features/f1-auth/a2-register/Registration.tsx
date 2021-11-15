import React, {ChangeEvent} from 'react';
import {useSelector} from "react-redux";
import {AppStoreType} from '../../../n1-main/m2-bll/store'
import SuperInputText from "../../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import s from "../../f0-test/Examples/Examples.module.scss";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import style from './Registration.module.scss'


type PropsType = {
    email: string
    setEmail: (email: string) => void
    password: string
    setPassword: (password: string) => void
    repeatPassword: string
    setRepeatPassword: (repeatPassword: string) => void
    register: () => void
}
export const Registration = (props: PropsType) => {
    const {
        email,
        setEmail,
        password,
        setPassword,
        repeatPassword,
        setRepeatPassword,
        register
    } = props

    //const error = useSelector<AppStoreType, null | string>(state => state.registration.error)

    return (
        <>
            <div className={style.form}>

                <label>
                    <div>Your email</div>
                    <SuperInputText
                        value={email}
                        onChangeText={setEmail}
                        className={s.testSpanError}
                    />
                </label>

                <label>
                    <div>Your password</div>
                    <SuperInputText
                        type={'password'}
                        value={password}
                        onChangeText={setPassword}
                        className={s.testSpanError}
                    />
                </label>

                <label>
                    <div>Repeat your password</div>
                    <SuperInputText
                        type={'password'}
                        value={repeatPassword}
                        onChangeText={setRepeatPassword}
                        className={s.testSpanError}
                    />

                </label>

                <SuperButton onClick={register} className={s.superButton}>
                    registration
                </SuperButton>
            </div>
        </>
    );
}