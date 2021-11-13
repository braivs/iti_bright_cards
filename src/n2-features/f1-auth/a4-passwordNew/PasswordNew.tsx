import React, {useState} from 'react';
import s from './PasswordNew.module.scss'
import SuperInputText from "../../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";

export const PasswordNew = () => {
    const [newPassword, setNewPassword] = useState<string>('')
    const [newPassword2, setNewPassword2] = useState<string>('')
    const onClickHandler = () => {
        if (newPassword === newPassword2 && newPassword.length > 7) {
            console.log('password change')
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