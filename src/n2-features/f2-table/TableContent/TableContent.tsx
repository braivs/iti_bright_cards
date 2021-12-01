import React from 'react';
import s from './TableContent.module.scss'
import {TableHeaderModelType} from "../Table/Table";

type BodyType = {
    id: string,
    element: Array<string | number | JSX.Element>
}
type PropsType = {
    headerModel: TableHeaderModelType
    bodyModel: Array<BodyType>
}


export const TableContent: React.FC<PropsType> = (props) => {
    return (
        <div className={s.tableContent}>
            <div className={s.tableHeader}>
                {props.headerModel.map(m =>  <div key={m.id}>
                    {m.element}</div>)}
            </div>
            <div className={s.tableBody}>
                {props.bodyModel.map(e => {
                    let cardPackId = e.id
                    return <div className={s.bodyModel} key={e.id}>{
                        e.element.map((e, index) => {
                            return <div key={cardPackId + index}>{e}</div>
                        })
                    }</div>
                })
                }

            </div>
        </div>
    )
}