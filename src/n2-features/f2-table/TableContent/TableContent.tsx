import React from 'react';
import {CardType} from "../../../n1-main/m2-bll/api/cards-api";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../n1-main/m2-bll/store";
import {CardsPack} from "../CardsPack/CardsPack";
import s from './TableContent.module.scss'
import {TableHeaderModelType} from "../Table";

type PropsType = {
    headerModel: TableHeaderModelType
    bodyModel: Array<CardType>
}

export const TableContent: React.FC<PropsType> = (props) => {
    const userIdAfterRadio = useSelector<AppStoreType, string>(state => state.table.userIdAfterRadio)
    const pageCount = useSelector<AppStoreType, number>(state => state.table.pageCount).toString()

    return (
        <div className={s.tableContent}>
            <div className={s.tableHeader}>
                {props.headerModel.map(m => <div key={m.id}>
                    {m.element}
                </div>)}
            </div>
            <div className={s.tableBody}>
                {props.bodyModel.map(m => <CardsPack key={m._id} _id={m._id} Name={m.name} cardsCount={m.cardsCount}
                                                 updated={m.updated} pageCount={pageCount}
                                                 userID={userIdAfterRadio}
                />)}
            </div>
        </div>
    )
}