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

    const error = useSelector<AppStoreType, null | string>(state => state.registration.error)

    const emailHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }

    const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }

    const setRepeatPasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setRepeatPassword(e.currentTarget.value)
    }

    return (
        <>
            <div className={style.form}>
                <SuperInputText
                    value={email}
                    onChange={emailHandler}
                    spanClassName={s.testSpanError}
                    placeholder={'email'}
                />

                <SuperInputText
                    type='password'
                    value={password}
                    onChange={passwordHandler}
                    spanClassName={s.testSpanError}
                    placeholder={'password'}
                />

                <SuperInputText
                    value={repeatPassword}
                    onChange={setRepeatPasswordHandler}
                    spanClassName={s.testSpanError}
                    placeholder={'password'}
                />

                {error !== null && <div className={style.error}>{error}</div>}

                <SuperButton onClick={register} className={s.superButton}>
                    registration
                </SuperButton>
            </div>
        </>

    );
}