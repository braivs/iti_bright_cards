import React from 'react';
import s from './CardsPack.module.scss'
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {deleteCardsPackTC, getCardsPackTC, updateCardPackTC} from "../../../n1-main/m2-bll/table-reducer";
import {AppStoreType} from "../../../n1-main/m2-bll/store";

type PropsType = {
    _id: string
    Name: string
    cardsCount: number
    updated: string
    pageCount: string
    dynamicUpdates: boolean
    profileOrPublic: string
}


export const CardsPack: React.FC<PropsType> = (props) => {
    const userID = useSelector<AppStoreType, string>(state => state.profile._id)

    const dispatch = useDispatch()

    const delHandler = () => {
        dispatch(deleteCardsPackTC(props._id))
        props.dynamicUpdates && dispatch(getCardsPackTC(userID, props.pageCount, props.profileOrPublic))

    }
    const updateHandler = () => {
        dispatch(updateCardPackTC(props._id, 'BrightUpdatedName'))
        props.dynamicUpdates && dispatch(getCardsPackTC(userID, props.pageCount, props.profileOrPublic))
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