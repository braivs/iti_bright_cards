import React from 'react';
import {TableHeaderModelType} from "../Table";
import s from './TableHeader.module.scss'

type PropsType = {
    model: TableHeaderModelType
}

export const TableHeader = (props: PropsType) => {
    return <div className={s.tableHeader}>
        {props.model.map(m => <div key={'createMe'}>
            {m}
        </div>)}
    </div>
}