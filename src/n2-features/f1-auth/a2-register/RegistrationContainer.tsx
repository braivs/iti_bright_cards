import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Registration} from "./Registration";

export const RegistrationContainer = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')

    const dispatch = useDispatch()

    const register = () => {
        if (password === repeatPassword) {


            //dispatch(registrationTC(email, password))
        } else {
            //dispatch(setErrorMessageAC('password mismatch'))
        }
    }

    // if (isRegistered) {
    //     return <Redirect to={'/login'}/>
    // }

    return (
        <div>
            <Registration
                email={email}
                setEmail={setEmail}
                password={password}
                repeatPassword={repeatPassword}
                setPassword={setPassword}
                setRepeatPassword={setRepeatPassword}
                register={register}
            />
        </div>
    );
};
