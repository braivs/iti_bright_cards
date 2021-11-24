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
import {TableContent} from "./TableContent/TableContent";
import SuperInputText from "../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import {useParams} from "react-router-dom";
import {getCardsTC, setActiveCardPackAC} from "../../n1-main/m2-bll/cards-reducer";


export const Table = () => {

    const dispatch = useDispatch()

    const cardsPacks = useSelector<AppStoreType, Array<CardType>>(state => state.table.cardPacks)
    const userID = useSelector<AppStoreType, string>(state => state.profile._id)
    const pageCount = useSelector<AppStoreType, number>(state => state.table.pageCount).toString()
    const page = useSelector<AppStoreType, number>(state => state.table.page)
    const packName = useSelector<AppStoreType, string>(state => state.table.packName)
    const superRadioArr = ['Profile', 'Public']  // for SuperRadio in Settings

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
        if (packid !== '') {
            /*dispatch(setActiveCardPackAC(packid))
            dispatch(getCardsTC())
            console.log(packid)*/ // temporally disabled because I have pain about no authorize error.
                                  // And I have made a decision to do with hardcode cardPackId:
                                  // _id: "619ccba94f185200047ad5ad". Later will fix.
            getCardsTC()
        }
        dispatch(getCardsTC())
    }, [profileOrPublic, pageCount, page, packName, packid])

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

    return (
        <div className={`${sContainer.container} ${s.table}`}>
            <h1>This is table of Card Packs.</h1>
            <Settings setPageCountHandler={setPageCountHandler}
                      superRadioArr={superRadioArr}
                      profileOrPublic={profileOrPublic}
                      onChangeProfileOrPublic={onChangeProfileOrPublic}
            />
            <Search/>
            <TableContent headerModel={CardsPackHeader} bodyModel={cardsPacks}/>
            <Pagination/>

            <h1>This is table of Cards for selected Card Pack.</h1>
            <div className={s.selectedCardPackInfo}>
                <label className={s.settingEl}>
                    Selected CardPack Name:
                    <SuperInputText value={selectedCardsPack ? selectedCardsPack.name : ''} onChange={() => {
                    }} className={s.input} disabled={true}/>
                </label>
                <label className={s.settingEl}>
                    Selected CardPack updated:
                    <SuperInputText value={selectedCardsPack ? selectedCardsPack.updated : ''} onChange={() => {
                    }} className={s.input} disabled={true}/>
                </label>
                <label className={s.settingEl}>
                    Selected CardPack id:
                    <SuperInputText value={packid} className={s.input} onChange={() => {
                    }} disabled={true}/>
                </label>
            </div>

        </div>
    );
};

type HeaderModelElementType = {
    id: string,
    element: string | JSX.Element
}
export type TableHeaderModelType = Array<HeaderModelElementType>
