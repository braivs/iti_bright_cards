import React from 'react';
import s from './CardsPack.module.scss'
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {useDispatch} from "react-redux";
import {deleteCardsPackTC, updateCardPackTC} from "../../../n1-main/m2-bll/table-reducer";
import {NavLink} from "react-router-dom";

type PropsType = {
    _id: string
    Name: string
    cardsCount: number
    updated: string
    pageCount: string
    userID: string
}


export const CardsPack: React.FC<PropsType> = (props) => {
    const dispatch = useDispatch()

    const delHandler = () => {
        dispatch(deleteCardsPackTC(props._id))
    }
    const updateHandler = () => {
        dispatch(updateCardPackTC(props._id, 'BrightUpdatedName'))
    }


    return <div className={s.cardsPack}>
        <NavLink to={`/table/${props._id}`}><div className={`${s.element}`}>{props.Name}</div></NavLink>
        <div className={`${s.element} ${s.cardsCount}`}>{props.cardsCount}</div>
        <div className={`${s.element} ${s.updated}`}>{props.updated}</div>
        <div>
            <SuperButton className={s.button} onClick={delHandler}>del</SuperButton>
            <SuperButton className={s.button} onClick={updateHandler}>update</SuperButton>

        </div>
    </div>

};