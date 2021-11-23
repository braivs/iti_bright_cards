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
import {CardType} from "../../n1-main/m2-bll/api/cards-api";
import SuperButton from "../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import Pagination from "./Pagination/Pagination";
import Search from "./Search/Search";
import {Settings} from "./Settings/Settings";
import {TableBody} from "./TableBody/TableBody";
import {TableHeader} from "./TableHeader/TableHeader";


export const Table = () => {

    const dispatch = useDispatch()

    const cardsPacks = useSelector<AppStoreType, Array<CardType>>(state => state.table.cardPacks)
    const userID = useSelector<AppStoreType, string>(state => state.profile._id)
    const pageCount = useSelector<AppStoreType, number>(state => state.table.pageCount).toString()
    const page = useSelector<AppStoreType, number>(state => state.table.page)
    const packName = useSelector<AppStoreType, string>(state => state.table.packName)
    const superRadioArr = ['Profile', 'Public']  // for SuperRadio in Settings

    const [profileOrPublic, onChangeProfileOrPublic] = useState(superRadioArr[0]) // for SuperRadio is Settings

    useEffect(() => {
        if (profileOrPublic === 'Public') {
            dispatch(setUserIdAfterRadioAC(''))
        } else {
            dispatch(setUserIdAfterRadioAC(userID))
        }
        dispatch(getCardsPackTC())


    }, [profileOrPublic, pageCount, page, packName])

    const addPackButtonHandler = () => {
        dispatch(addCardsPackTC('BrightPack'))
    }

    const setPageCountHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (Number(e.currentTarget.value) < 1) e.currentTarget.value = '1'
        dispatch(setPageCountAC(Number(e.currentTarget.value)))
    }


    const TableHeaderData: TableHeaderModelType = [
        'Name', 'cardsCount', 'updated',
        <SuperButton className={s.button} onClick={addPackButtonHandler}>Add CardPack</SuperButton>
    ]



    return (
        <div className={`${sContainer.container} ${s.table}`}>
            <h1>This is table of Card Packs.</h1>
            <Settings setPageCountHandler={setPageCountHandler}
                      superRadioArr={superRadioArr}
                      profileOrPublic={profileOrPublic}
                      onChangeProfileOrPublic={onChangeProfileOrPublic}
            />
            <Search/>
            <TableHeader model={TableHeaderData}/>
            <TableBody model={cardsPacks}/>
            <Pagination/>
        </div>
    );
};

export type TableHeaderModelType = Array<string | JSX.Element>
