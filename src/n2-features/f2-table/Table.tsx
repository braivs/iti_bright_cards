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
import {CardsPack} from "./CardsPack/CardsPack";
import SuperButton from "../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import SuperInputText from "../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import SuperRadio from "../../n1-main/m1-ui/common/c6-SuperRadio/SuperRadio";
import SuperCheckbox from "../../n1-main/m1-ui/common/c3-SuperCheckbox/SuperCheckbox";
import Pagination from "./Pagination/Pagination";

export const Table = () => {

    const dispatch = useDispatch()

    const cardsPacks = useSelector<AppStoreType, Array<CardType>>(state => state.table.cardPacks)
    const userID = useSelector<AppStoreType, string>(state => state.profile._id)
    const pageCount = useSelector<AppStoreType, number>(state => state.table.pageCount).toString()
    const userIdAfterRadio = useSelector<AppStoreType, string>(state => state.table.userIdAfterRadio)

    const superRadioArr = ['Profile', 'Public']  // for SuperRadio

    const [profileOrPublic, onChangeProfileOrPublic] = useState(superRadioArr[0]) // for SuperRadio


    useEffect(() => {
        dispatch(getCardsPackTC(profileOrPublic === 'Profile' ? userID : '', pageCount))
    }, [])

    useEffect(() => {
        if (profileOrPublic === 'Public') {
            dispatch(setUserIdAfterRadioAC(''))
            dispatch(getCardsPackTC('', pageCount))
        } else {
            dispatch(setUserIdAfterRadioAC(userID))
            dispatch(getCardsPackTC(userID, pageCount))
        }
    }, [profileOrPublic]) // userIdAfterRadio this is 'UserID' depending on SuperRadio

    useEffect(() => {
        dispatch(getCardsPackTC(userIdAfterRadio, pageCount))
    },[pageCount]) // dynamic updated if pageCount changed


    const addPackButtonHandler = () => {
        dispatch(addCardsPackTC('BrightPack'))
    }

    const setPageCountHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (Number(e.currentTarget.value) < 1) e.currentTarget.value = '1'
        dispatch(setPageCountAC(Number(e.currentTarget.value)))
    }

    return (
        <div className={`${sContainer.container} ${s.table}`}>
            <h1>This is table of Card Packs.</h1>
            <div className={s.settings}>
                <h2>Settings:</h2>
                <label className={s.settingEl}>
                    How much Card Packs to show:
                    <SuperInputText value={pageCount} onChange={setPageCountHandler} className={s.input}
                                    type={"number"}/>
                </label>
                <label className={`${s.radioLabel} ${s.settingEl}`}>
                    <div>Profile Card Packs only or Public:</div>
                    <SuperRadio
                        options={superRadioArr}
                        value={profileOrPublic}
                        onChangeOption={onChangeProfileOrPublic}
                        className={s.radio}
                    />
                </label>
            </div>

            <div className={s.header}>
                <div>Name</div>
                <div>cardsCount</div>
                <div>updated</div>
                <div><SuperButton className={s.button} onClick={addPackButtonHandler}>Add CardPack</SuperButton></div>
            </div>
            <div className={s.style1}>
                {cardsPacks.map(m => <CardsPack key={m._id} _id={m._id} Name={m.name} cardsCount={m.cardsCount}
                                                updated={m.updated} pageCount={pageCount}
                                                userID={userIdAfterRadio}
                />)}
            </div>
            <Pagination/>
        </div>
    );
};

