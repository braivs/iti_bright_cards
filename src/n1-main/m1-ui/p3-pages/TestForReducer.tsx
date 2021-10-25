import React from 'react';
import SuperInputText from "../common/c1-SuperInputText/SuperInputText";
import SuperButton from "../common/c2-SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../m2-bll/store";
import {setTestValueAC} from "../../m2-bll/testReducer";

export const TestForReducer = () => {

    const dispatch = useDispatch()
    let reducerValue = useSelector<AppStoreType, string>(state => state.testReducer.testValue)

    return <div>
        <hr/>
        <div>Hi, I am test for reducer. I will set 'test value' to state and will show it at the input, if you click the
            button.
        </div>
        <div>
            <SuperInputText value={reducerValue}/>
            <SuperButton onClick={() => {dispatch(setTestValueAC('test value'))}}>Click Me</SuperButton>
        </div>
        <hr/>
    </div>
}