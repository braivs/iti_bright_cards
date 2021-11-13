import React from 'react';
import SuperInputText from "../../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import SuperCheckbox from "../../../n1-main/m1-ui/common/c3-SuperCheckbox/SuperCheckbox";
import s from './Login.module.scss'
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {NavLink} from "react-router-dom";


export type LoginPropsType = {
    email: string,
    password: string,
    rememberMe: boolean,
    setEmail: (s: string) => void,
    setPassword: (s: string) => void,
    setRememberMe: (s: boolean) => void,
    LoggedIn: () => void
}


export const Login: React.FC<LoginPropsType> = (props) => {
    const changeLogin = (e:any) => {
        props.setEmail(e.currentTarget.value)
    }
    const changePassword = (e:any) => {
        props.setPassword(e.currentTarget.value)
    }
    const changeRemember = (e:any) => {
        props.setRememberMe(e.currentTarget.value)
    }
    return (
        <div className={s.form}>
            <form>
                <div className={s.border}>
                    <div className={s.text}>Sign In</div>
                    <div><SuperInputText value={props.email} onChange={changeLogin}/></div>
                    <div><SuperInputText type={"password"} value={props.password} onChange={changePassword}/></div>
                    <div><SuperCheckbox checked={props.rememberMe} onChange={changeRemember} className={s.checkbox} children={'Remember Me'}/></div>
                    <div><SuperButton children={'Login'} onClick={props.LoggedIn}/></div>
                    <NavLink to={'/passwordrecovery'}>Forgot password</NavLink>
                </div>
            </form>
        </div>
    );
}