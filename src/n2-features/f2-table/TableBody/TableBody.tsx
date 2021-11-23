import React from 'react';
import {CardsPack} from "../CardsPack/CardsPack";
import s from "./TableBody.module.scss";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../n1-main/m2-bll/store";
import {CardType} from "../../../n1-main/m2-bll/api/cards-api";

type PropsType = {
    model: Array<CardType>
}

export const TableBody: React.FC<PropsType> = (props) => {
    const userIdAfterRadio = useSelector<AppStoreType, string>(state => state.table.userIdAfterRadio)
    const pageCount = useSelector<AppStoreType, number>(state => state.table.pageCount).toString()

    return (
        <div className={s.tableBody}>
            {props.model.map(m => <CardsPack key={m._id} _id={m._id} Name={m.name} cardsCount={m.cardsCount}
                                            updated={m.updated} pageCount={pageCount}
                                            userID={userIdAfterRadio}
            />)}
        </div>
    )
}