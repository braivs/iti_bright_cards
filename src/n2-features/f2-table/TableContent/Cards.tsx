import React, {useEffect} from 'react';
import {v1} from "uuid";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import s from "../Table.module.scss";
import {AppStoreType} from "../../../n1-main/m2-bll/store";
import {CardType} from "../../../n1-main/m2-bll/api/cards-api";
import {addCardTC, deleteCardTC, getCardsTC, updateCardTC} from "../../../n1-main/m2-bll/cards-reducer";
import {TableHeaderModelType} from "../Table";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {TableContent} from "./TableContent";
import CardsPagination from "../Pagination/CardsPagination";

const Cards = () => {
    const {packid} = useParams<{ packid: string }>();
    const dispatch = useDispatch()
    const cards = useSelector<AppStoreType, Array<CardType>>(state => state.cards.cards)
    let pageCount = useSelector<AppStoreType, number>(state => state.cards.pageCount) // кол-во элементов на одной стр
    let cardsTotalCount = useSelector<AppStoreType, number>(state => state.cards.cardsTotalCount)// кол-во карт
    let page = useSelector<AppStoreType, number>(state => state.cards.page)// выбранная страница
    useEffect(() => {
        if (!!packid) {
            dispatch(getCardsTC(packid))
        }
    }, [packid, pageCount, cardsTotalCount, page  ])

    const addCardButtonHandler = () => {
        dispatch(addCardTC(packid))
    }

    const delCardsHandler = (cardId: string) => {
        dispatch(deleteCardTC(cardId))
    }

    const updateCardsHandler = (cardId: string) => {
        dispatch(updateCardTC(cardId))
    }



    const CardsHeader: TableHeaderModelType = [
        {id: '1', element: 'answer'},
        {id: '2', element: 'question'},
        {id: '3', element: 'created'},
        {id: '4', element: <SuperButton onClick={addCardButtonHandler}>Add Card</SuperButton>}
    ]

    let cardHeader = CardsHeader.map(el => {
        return {id: v1(), element: el.element}
    })
    const cardsMapped = cards.map(e => {
        return {id: e._id,
            element: [
                e.question,
                e.answer,
                e.created,
                <div>
                    <SuperButton className={s.button} onClick={() => delCardsHandler(e._id)}>del</SuperButton>
                    <SuperButton className={s.button} onClick={() => updateCardsHandler(e._id)}>update</SuperButton>
                </div>
            ]}
    })
    return (
        <div>
            <h1>This is table of Cards for selected Card Pack.</h1>

            <div className={s.selectedCardPackInfo}>
                <div className={s.element}>
                    <div className={s.elementHeader}>Selected CardPack Name:</div>
                    {/*   <div className={s.elementValue}>{selectedCardsPack ? selectedCardsPack.name : ''}</div>*/}
                </div>
                <div className={s.element}>
                    <div className={s.elementHeader}>Selected CardPack updated:</div>
                </div>
                <div className={s.element}>
                    <div className={s.elementHeader}>Selected CardPack id:</div>
                </div>
            </div>
            <TableContent headerModel={cardHeader} bodyModel={cardsMapped}/>
            <CardsPagination page={page} pageCount={pageCount} cardsTotalCount={cardsTotalCount}/>
        </div>
    );
};

export default Cards;