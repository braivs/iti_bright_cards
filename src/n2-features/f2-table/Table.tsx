import React, {CSSProperties, ReactNode, useEffect} from 'react';
import sContainer from '../../n1-main/m1-ui/common/components/Container.module.scss'
import s from './Table.module.scss'
import {log} from "util";
import {useDispatch, useSelector} from "react-redux";
import {getCardsPackTC} from "../../n1-main/m2-bll/table-reducer";
import {AppStoreType} from "../../n1-main/m2-bll/store";
import {CardType} from "../../n1-main/m2-bll/api/cards-api";
import {CardsPack} from "./CardsPack/CardsPack";

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

    let cardsPacks = useSelector<AppStoreType, Array<CardType>>(state => state.table.cardPacks)
    debugger
    // пустой получается :(

    // на это думал опираться пока приложение не загрузилось, но тоже что-то не то (
    /*const isInitialize = useSelector<AppStoreType, boolean>(state => state.auth.isInitilize)
    if (!isInitialize) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            Loading...
        </div>

    }*/

    // debugger

    return (
        <div className={`${sContainer.container} ${s.table}`}>
            This is table.
            <div className={s.header}>
                <div>Name</div><div>cardsCount</div><div>updated</div>
            </div>
            <div className={s.style1}>
                {/*{model.map((m: ITableModel, index: number) => m.title(index))}*/}
                {cardsPacks.map(m => <CardsPack key={m._id} Name={m.name} cardsCount={m.cardsCount} updated={m.updated}/>)}
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

