import React, {ChangeEvent, useState} from 'react';
import {setPageCountCardsAC} from "../../../n1-main/m2-bll/cards-reducer";
import {useDispatch} from "react-redux";
import style from './Select.module.css'


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
    const arOptions: number[] = [1, 3, 5, 7, 10,15, 20, 30]
    const option = arOptions.map(arr=> {
        return <option>{arr}</option>
    })
    return (
        <div className={style.container}>
            <select value={state}
                    onChange={onChangeHandler}
                    onClick={onClickHandler} className={style.select}>
                {option}
            </select>
        </div>
    );
};

export default Select;