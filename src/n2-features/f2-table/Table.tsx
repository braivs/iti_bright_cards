import React, {CSSProperties, ReactNode, useEffect} from 'react';
import sContainer from '../../n1-main/m1-ui/common/components/Container.module.scss'
import s from './Table.module.scss'
import {log} from "util";
import {useDispatch} from "react-redux";
import {getCardsPackTC} from "../../n1-main/m2-bll/table-reducer";

export type TableModel = {
    title: (index: number) => ReactNode
    render: (dataItem: any, modelIndex: number, dataIndex: number) => ReactNode;
}

type TableProps = {
    model?: TableModel[]
    data?: any;

}

export const Table: React.FC<TableProps> = ({model,data}) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCardsPackTC())
    }, [])

    return (
        <div className={`${sContainer.container} ${s.table}`}>
            This is table.
            <div className={s.style1}>
                {/*{model.map((m: ITableModel, index: number) => m.title(index))}*/}
            </div>

            <div className={s.style2}>
                {/*{data.map((dataItem: any, dataIndex: number) => (*/}
                {/*    <div*/}
                {/*        key={dataItem._id || dataIndex}*/}
                {/*        className={s.style3}*/}
                {/*    >*/}
                {/*        {model.map((m, modelIndex) => m.render(dataItem, modelIndex, dataIndex))}*/}
                {/*    </div>*/}
                {/*))}*/}
            </div>
        </div>
    );
};

