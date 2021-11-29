import React, {useEffect} from 'react';
import {v1} from "uuid";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import s from "../Table/Table.module.scss";
import {AppStoreType} from "../../../n1-main/m2-bll/store";
import {CardType} from "../../../n1-main/m2-bll/api/cards-api";
import {addCardTC, deleteCardTC, getCardsTC, updateCardTC} from "../../../n1-main/m2-bll/cards-reducer";
import {TableHeaderModelType} from "../Table/Table";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {TableContent} from "../TableContent/TableContent";
import {setSelectedCardPack} from "../../../n1-main/m2-bll/cardsPack-reducer";
import CardsPagination from "../Pagination/CardsPagination";

const Cards = () => {
    const {packid} = useParams<{ packid: string }>();
    const dispatch = useDispatch()

    const cards = useSelector<AppStoreType, Array<CardType>>(state => state.cards.cards)
    const userID = useSelector<AppStoreType, string>(state => state.profile._id)

    let pageCount = useSelector<AppStoreType, number>(state => state.cards.pageCount) // кол-во элементов на одной стр
    let cardsTotalCount = useSelector<AppStoreType, number>(state => state.cards.cardsTotalCount)// кол-во карт
    let page = useSelector<AppStoreType, number>(state => state.cards.page)// выбранная страница
    useEffect(() => {
        if (!!packid) {
            dispatch(setSelectedCardPack(packid))
            dispatch(getCardsTC())
        }
    }, [packid, pageCount, cardsTotalCount, page  ])

    const addCardButtonHandler = () => {
        dispatch(addCardTC())
    }

    const delCardsHandler = (cardId: string) => {
        dispatch(deleteCardTC(cardId))
    }

    const updateCardsHandler = (cardId: string) => {
        dispatch(updateCardTC(cardId, 'UpdatedQuestion'))
    }



    const CardsHeader: TableHeaderModelType = [
        {id: v1(), element: 'answer'},
        {id: v1(), element: 'question'},
        {id: v1(), element: 'created'},
        {id: v1(), element: <SuperButton onClick={addCardButtonHandler}>Add Card</SuperButton>}
    ]

    let cardHeader = CardsHeader.map(el => {
        return {id: v1(), element: el.element}
    })
    const cardsMapped = cards.map(e => {
        return {
            id: e._id,
            element: [
                e.question,
                e.answer,
                e.created,
                e.user_id === userID
                    ? <div>
                        <SuperButton className={s.button} onClick={() => delCardsHandler(e._id)}>del</SuperButton>
                        <SuperButton className={s.button} onClick={() => updateCardsHandler(e._id)}>update</SuperButton>
                    </div>
                    : <div> </div>
            ]
        }
    })
    return (
        <div>
            <h1>This is table of Cards for selected Card Pack.</h1>
            <TableContent headerModel={cardHeader} bodyModel={cardsMapped}/>
            <CardsPagination pageCard={page} pageCountCards={pageCount} cardsTotalCountCards={cardsTotalCount}/>
        </div>
    );
};

export default Cards;