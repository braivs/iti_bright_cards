import React, {ReactNode, useEffect} from 'react';
import sContainer from '../../n1-main/m1-ui/common/components/Container.module.scss'
import s from './Table.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {addCardsPackTC, getCardsPackTC} from "../../n1-main/m2-bll/table-reducer";
import {AppStoreType} from "../../n1-main/m2-bll/store";
import {CardType} from "../../n1-main/m2-bll/api/cards-api";
import {CardsPack} from "./CardsPack/CardsPack";
import SuperButton from "../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import Pagination from "./Pagination/Pagination";

export type TableModel = {
    title: (index: number) => ReactNode
    render: (dataItem: any, modelIndex: number, dataIndex: number) => ReactNode;
}

type TableProps = {
    model?: TableModel[]
    data?: any;
}

export const Table: React.FC<TableProps> = ({model, data}) => {

    const dispatch = useDispatch()
    const cardsPacks = useSelector<AppStoreType, Array<CardType>>(state => state.table.cardPacks)
    const userID = useSelector<AppStoreType, string>(state => state.profile._id)

    useEffect(() => {
        dispatch(getCardsPackTC(userID))
    }, [])


    const buttonHandler = () => {
        dispatch(addCardsPackTC('BrightPack'))
        dispatch(getCardsPackTC(userID))
    }

    return (
        <div className={`${sContainer.container} ${s.table}`}>
            <h1>This is table of CardPacks.</h1>

            <div className={s.header}>
                <div>Name</div>
                <div>cardsCount</div>
                <div>updated</div>
                <div><SuperButton className={s.button} onClick={buttonHandler}>Add CardPack</SuperButton></div>
            </div>
            <div className={s.style1}>
                {/*{model.map((m: ITableModel, index: number) => m.title(index))}*/}
                {cardsPacks.map(m => <CardsPack key={m._id} _id={m._id} Name={m.name} cardsCount={m.cardsCount}
                                                updated={m.updated}/>)}
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
            <Pagination/>
        </div>
    );
};

