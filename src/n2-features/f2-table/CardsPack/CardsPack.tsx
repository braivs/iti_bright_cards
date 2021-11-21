import React from 'react';
import s from './CardsPack.module.scss'
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";

type PropsType = {
    _id: string
    Name: string
    cardsCount: number
    updated: string
}

export const CardsPack: React.FC<PropsType> = (props) => {

    const delHandler = () => {
        console.log('delHandler',`my id is: ${props._id}`)
    }
    const updateHandler = () => {
        console.log('updateHandler',`my id is: ${props._id}`)
    }



    return <div className={s.cardsPack}>
        <div className={`${s.element}`}>{props.Name}</div>
        <div className={`${s.element} ${s.cardsCount}`}>{props.cardsCount}</div>
        <div className={`${s.element} ${s.updated}`}>{props.updated}</div>
        <div>
            <SuperButton className={s.button} onClick={delHandler}>del</SuperButton>
            <SuperButton className={s.button} onClick={updateHandler}>update</SuperButton>

        </div>
    </div>

}