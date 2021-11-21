import React, {useEffect, useState} from 'react';
import sContainer from '../../n1-main/m1-ui/common/components/Container.module.scss'
import s from './Table.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {addCardsPackTC, getCardsPackTC} from "../../n1-main/m2-bll/table-reducer";
import {AppStoreType} from "../../n1-main/m2-bll/store";
import {CardType} from "../../n1-main/m2-bll/api/cards-api";
import {CardsPack} from "./CardsPack/CardsPack";
import SuperButton from "../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import SuperInputText from "../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import SuperRadio from "../../n1-main/m1-ui/common/c6-SuperRadio/SuperRadio";
import SuperCheckbox from "../../n1-main/m1-ui/common/c3-SuperCheckbox/SuperCheckbox";
import Pagination from "./Pagination/Pagination";


type TableProps = {
}

export const Table: React.FC<TableProps> = () => {

    const dispatch = useDispatch()
    const cardsPacks = useSelector<AppStoreType, Array<CardType>>(state => state.table.cardPacks)
    const userID = useSelector<AppStoreType, string>(state => state.profile._id)
    const [pageCount, setPageCount] = useState('6')
    const [dynamicUpdates, setDynamicUpdated] = useState(false)

    const superRadioArr = ['Profile', 'Public']  // for SuperRadio
    const [profileOrPublic, onChangeProfileOrPublic] = useState(superRadioArr[0]) // for SuperSelect & SuperRadio


    useEffect(() => {
        dispatch(getCardsPackTC(userID, pageCount, profileOrPublic))
    }, [])


    const addPackButtonHandler = () => {
        dispatch(addCardsPackTC('BrightPack'))
        dynamicUpdates && dispatch(getCardsPackTC(userID, pageCount, profileOrPublic))
    }

    const updateButtonHandler = () => {
        dispatch(getCardsPackTC(userID, pageCount, profileOrPublic))

    }


    return (
        <div className={`${sContainer.container} ${s.table}`}>
            <h1>This is table of Card Packs.</h1>
            <div className={s.settings}>
                <h2>Settings:</h2>
                <label className={s.settingEl}>
                    How much Card Packs to show:
                    <SuperInputText value={pageCount} onChangeText={setPageCount} className={s.input} type={"number"}/>
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
                <label className={`{s.dynamicLabel} ${s.settingEl}`}>
                    <SuperCheckbox
                        checked={dynamicUpdates}
                        onChangeChecked={setDynamicUpdated}
                        className={s.checkbox}
                    >Dynamic updates</SuperCheckbox>
                </label>
                <SuperButton className={s.settingEl} onClick={updateButtonHandler}>Update</SuperButton>
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
                                                dynamicUpdates={dynamicUpdates}
                                                profileOrPublic={profileOrPublic}/>)}
            </div>
            <Pagination/>
        </div>
    );
};

