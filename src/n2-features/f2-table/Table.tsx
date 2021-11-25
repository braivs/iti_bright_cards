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
import {CardsPackType, CardType} from "../../n1-main/m2-bll/api/cards-api";
import SuperButton from "../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import Pagination from "./Pagination/Pagination";
import Search from "./Search/Search";
import {Settings} from "./Settings/Settings";
import {TableContent} from "./TableContent/TableContent";
import {useParams} from "react-router-dom";
import {getCardsTC} from "../../n1-main/m2-bll/cards-reducer";
import {v1} from "uuid";

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

    let cardHeader = CardsHeader.map(el => {
        return {id: v1(), element: el.element}
    })


    // hardcoded arrays of card packs and cards, just for practice

    const cardsPackHard: Array<CardsPackType> = [
        {
            cardsCount: 0,
            created: "2021-11-25T14:16:15.666Z",
            grade: 0,
            more_id: "618d3fbc2e34470004348291",
            name: "Dimasik",
            path: "/master",
            private: false,
            rating: 0,
            shots: 0,
            type: "pack",
            updated: "2021-11-25T14:16:15.666Z",
            user_id: "618d3fbc2e34470004348291",
            user_name: "Dva stula",
            __v: 0,
            _id: "619f9aaf23b2bc000423bcfa"
        },
        {
            cardsCount: 0,
            created: "2021-11-24T16:32:15.931Z",
            grade: 0,
            more_id: "618f7b3ada4cff00045585f6",
            name: "BrightPack",
            path: "/def",
            private: false,
            rating: 0,
            shots: 0,
            type: "pack",
            updated: "2021-11-24T16:32:15.931Z",
            user_id: "618f7b3ada4cff00045585f6",
            user_name: "brightwiths@gmail.com",
            __v: 0,
            _id: "619e690f77b5760fa0b42b3b"
        }
    ]
    const cardsHard: Array<CardType> = [
        {
            answer: "no answer",
            cardsPack_id: "619e58f925d1300ce7e09a17",
            comments: "",
            created: "2021-11-25T11:56:00.841Z",
            grade: 0,
            more_id: "6194e16524fbdc00040782c2",
            question: "hgjhghf",
            rating: 0,
            shots: 0,
            type: "card",
            updated: "2021-11-25T11:56:00.841Z",
            user_id: "6194e16524fbdc00040782c2",
            __v: 0,
            _id: "619f79d0fef41c1604601d9b",
        },
        {
            answer: "no answer",
            cardsPack_id: "619e58f925d1300ce7e09a17",
            comments: "",
            created: "2021-11-25T11:55:52.910Z",
            grade: 0,
            more_id: "6194e16524fbdc00040782c2",
            question: "What is it?",
            rating: 0,
            shots: 0,
            type: "card",
            updated: "2021-11-25T11:55:52.910Z",
            user_id: "6194e16524fbdc00040782c2",
            __v: 0,
            _id: "619f79c8fef41c1604601d9a",
        }
    ]

    // remapping arrays for TableContent
    const cardsPackHardMapped = cardsPacks.map(e => {
        return { id: e._id, element: [e.name, e.cardsCount, e.updated] }
    })

    const cardsHardMapped = cardsHard.map(e => {
        return { id: e._id, element: [e.question, e.answer, e.created] }
    })


    console.log('cardsPackHardMapped', cardsPackHardMapped)
    console.log('cardsHardMapped', cardsHardMapped)


    return (
        <div className={`${sContainer.container} ${s.table}`}>
            <h1>This is table of Card Packs.</h1>
            <Search/>
            <Settings setPageCountHandler={setPageCountHandler}
                      superRadioArr={superRadioArr}
                      profileOrPublic={profileOrPublic}
                      onChangeProfileOrPublic={onChangeProfileOrPublic}
            />

            <TableContent headerModel={CardsPackHeader} bodyModel={cardsPackHardMapped}/>
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
            <TableContent headerModel={cardHeader} bodyModel={cardsHardMapped}/>


            {/**/}

            {/*<TableContent headerModel={CardsPackHeader} bodyModel={cardsPacks}/>*/}

        </div>
    );
};

type HeaderModelElementType = {
    id: string,
    element: string | JSX.Element
}

export type TableHeaderModelType = Array<HeaderModelElementType>
