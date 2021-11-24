import React, {ChangeEvent, useEffect, useState} from 'react';
import sContainer from '../../n1-main/m1-ui/common/components/Container.module.scss'
import s from './Table.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {
    addCardsPackTC,
    getCardsPackTC,
    setPageCountAC,
    setUserIdAfterRadioAC
} from "../../n1-main/m2-bll/table-reducer";
import {AppStoreType} from "../../n1-main/m2-bll/store";
import {CardsPackType} from "../../n1-main/m2-bll/api/cards-api";
import SuperButton from "../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import Pagination from "./Pagination/Pagination";
import Search from "./Search/Search";
import {Settings} from "./Settings/Settings";
import {TableContent} from "./TableContent/TableContent";
import {useParams} from "react-router-dom";
import {getCardsTC} from "../../n1-main/m2-bll/cards-reducer";

export const Table = () => {

    const dispatch = useDispatch()

    const cardsPacks = useSelector<AppStoreType, Array<CardsPackType>>(state => state.table.cardPacks)
    const userID = useSelector<AppStoreType, string>(state => state.profile._id)
    const pageCount = useSelector<AppStoreType, number>(state => state.table.pageCount).toString()
    const page = useSelector<AppStoreType, number>(state => state.table.page)
    const packName = useSelector<AppStoreType, string>(state => state.table.packName)
    const superRadioArr = ['Profile', 'Public']  // for SuperRadio in Settings
    const sortPacks = useSelector<AppStoreType, string>(state => state.table.sortPacks)
    const min = useSelector<AppStoreType, number>(state => state.table.min)
    const max = useSelector<AppStoreType, number>(state => state.table.max)

    const [profileOrPublic, onChangeProfileOrPublic] = useState(superRadioArr[0]) // for SuperRadio is Settings
    const {packid} = useParams<{ packid: string }>();

    const selectedCardsPack = cardsPacks.find(e => e._id === packid)

    useEffect(() => {
        if (profileOrPublic === 'Public') {
            dispatch(setUserIdAfterRadioAC(''))
        } else {
            dispatch(setUserIdAfterRadioAC(userID))
        }
        dispatch(getCardsPackTC())

        // dispatch(getCardsTC())
    }, [profileOrPublic, pageCount, page, packName, sortPacks, min, max])

    useEffect(() => {

        if (!!packid) {
            console.log('packid', packid)
            dispatch(getCardsTC(packid))
        }
    }, [packid])

    const addPackButtonHandler = () => {
        dispatch(addCardsPackTC('BrightPack'))
    }

    const setPageCountHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (Number(e.currentTarget.value) < 1) e.currentTarget.value = '1'
        dispatch(setPageCountAC(Number(e.currentTarget.value)))
    }


    const CardsPackHeader: TableHeaderModelType = [
        {id: '1', element: 'Name'},
        {id: '2', element: 'cardsCount'},
        {id: '3', element: 'updated'},
        {id: '4', element: <SuperButton className={s.button} onClick={addPackButtonHandler}>Add CardPack</SuperButton>},
    ]

    const CardsHeader: TableHeaderModelType = [
        {id: '1', element: 'answer'},
        {id: '2', element: 'question'},
        {id: '3', element: 'created'},
    ]

    return (
        <div className={`${sContainer.container} ${s.table}`}>
            <h1>This is table of Card Packs.</h1>
            <Search/>
            <Settings setPageCountHandler={setPageCountHandler}
                      superRadioArr={superRadioArr}
                      profileOrPublic={profileOrPublic}
                      onChangeProfileOrPublic={onChangeProfileOrPublic}
            />
            <TableContent headerModel={CardsPackHeader} bodyModel={cardsPacks}/>
            <Pagination/>

            <h1>This is table of Cards for selected Card Pack.</h1>

            <div className={s.selectedCardPackInfo}>
                <div className={s.element}>
                    <div className={s.elementHeader}>Selected CardPack Name:</div>
                    <div className={s.elementValue}>{selectedCardsPack ? selectedCardsPack.name : ''}</div>
                </div>
                <div className={s.element}>
                    <div className={s.elementHeader}>Selected CardPack updated:</div>
                    <div className={s.elementValue}>{selectedCardsPack ? selectedCardsPack.updated : ''}</div>
                </div>
                <div className={s.element}>
                    <div className={s.elementHeader}>Selected CardPack id:</div>
                    <div className={s.elementValue}>{packid}</div>
                </div>
            </div>



            {/*<TableContent headerModel={CardsPackHeader} bodyModel={cardsPacks}/>*/}

        </div>
    );
};

type HeaderModelElementType = {
    id: string,
    element: string | JSX.Element
}

export type TableHeaderModelType = Array<HeaderModelElementType>
