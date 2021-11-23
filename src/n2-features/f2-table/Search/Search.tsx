import React, {ChangeEvent, useState} from 'react';
import {useDispatch} from "react-redux";
import {setSearchPackNameAC} from "../../../n1-main/m2-bll/table-reducer";
import SuperInputText from "../../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import style from './Search.module.css'

const Search = () => {
    const dispatch = useDispatch()
    const [state, setState] = useState('')

    const currentHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setState(e.currentTarget.value)
    }

    const onClickHandler = () => {
        dispatch(setSearchPackNameAC(state))
        setState('')
    }

    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickHandler()
        }
    }

    return (
        <div>
            <SuperInputText
                value={state}
                onChange={currentHandler}
                onKeyPress={onKeyPressHandler}/>

            <SuperButton
                onClick={onClickHandler}
                className={style.search}>Search
            </SuperButton>
        </div>
    );
}

export default Search;