import React, {ChangeEvent, useState} from 'react';
import {setPageCountCardsAC} from "../../../n1-main/m2-bll/cards-reducer";
import {useDispatch} from "react-redux";
import style from './Select.module.scss'

type PropsType = {
    pageCountCards: number
}
const Select =(props: PropsType) => {
    const {pageCountCards} = props
    const dispatch = useDispatch()
    const [state, setState] = useState<number>(pageCountCards)

    const onClickHandler = () =>{
        dispatch(setPageCountCardsAC(state))
    }

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>)=>{
        setState(+e.currentTarget.value)
    }
    const arOptions = Array.from(Array(30).keys())
    const option = arOptions.map((index,arr)=> {
        return <option key={index}>{arr}</option>
    })
    return (
        <div>
            <select value={state}
                    onChange={onChangeHandler}
                    onClick={onClickHandler}
                    className={style.select}>
                {option}
            </select>
        </div>
    );
};

export default Select;