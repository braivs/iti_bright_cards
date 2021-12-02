import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../n1-main/m2-bll/store";
import {CardType} from "../../../n1-main/m2-bll/api/cards-api";
import {getCardsTC, setPageCountCardsAC} from "../../../n1-main/m2-bll/cards-reducer";
import {Learn} from "./Learn";
import {setSelectedCardPack} from "../../../n1-main/m2-bll/cardsPack-reducer";
import {CardsPackType} from "../../../n1-main/m2-bll/api/cardsPack-api";


const getCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});

    return cards[res.id + 1];
}
let initialCard: CardType = {
    answer: '',
    cardsPack_id: '',
    comments: '',
    created: '',
    grade: 1,
    more_id: '',
    question: '',
    rating: 1,
    shots: 1,
    type: '',
    updated: '',
    user_id: '',
    __v: 1,
    _id: '',
}
export const LearnContainer = () => {
    const {packid} = useParams<{ packid: string }>();
    const dispatch = useDispatch()
    const cards = useSelector<AppStoreType, Array<CardType>>(state => state.cards.cards)
    const cardsPacks = useSelector<AppStoreType, Array<CardsPackType>>(state => state.table.cardPacks)


    const cardsIndex = cardsPacks.find(cp => cp._id === packid)
    let cardsCount = 0
    if (cardsIndex) {
        cardsCount = cardsIndex.cardsCount
    }
    console.log(cardsIndex)
    let [card, setCards] = useState<CardType>(initialCard)
    let [initial, setInitial] = useState<boolean>(false)

    let nextCard = () => {
        setCards(getCard(cards))
    }

    useEffect(() => {
        if (!initial) {
            dispatch(setPageCountCardsAC(cardsCount))
            dispatch(setSelectedCardPack(packid))
            dispatch(getCardsTC())
            setInitial(true)
        }
        if (cards.length > 0) {
            setCards(getCard(cards))
        }

    }, [packid, cards])


    return <Learn card={card} nextCard={nextCard} />
}