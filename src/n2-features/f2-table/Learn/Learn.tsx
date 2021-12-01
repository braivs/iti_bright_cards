import React, {useState} from 'react';
import s from './Learn.module.scss'
import {CardType} from "../../../n1-main/m2-bll/api/cards-api";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {NavLink} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {setCardsGrade} from "../../../n1-main/m2-bll/cards-reducer";

export type LearnPropsType = {
    card: CardType
    nextCard: () => void
}

export const Learn = (props: LearnPropsType) => {
    const [hidden, setHidden] = useState(true)
    const dispatch = useDispatch()

    const submitHandler = ( grade: number) =>{
        dispatch(setCardsGrade( props.card._id, grade))
    }
    const nextCard = () => {
        props.nextCard()
        setHidden(true)
    }
    const grades = [1,2,3,4,5]

    return <div className={s.body}>

        <span>{props.card.question}</span>

        <div>
            {hidden ? <SuperButton onClick={() => setHidden(false)}>Answer</SuperButton> :
            <span>{props.card.answer}</span>}
        </div>


        <div className={s.grade}>
            {grades.map((g,i) => (
                <SuperButton key={i} className={s.gradeBtn} onClick={() => (submitHandler(g))}>{g}</SuperButton>
            ))}
        </div>

        <div className={s.btn}>
            <NavLink exact to={`/table`}><SuperButton>Cancel</SuperButton></NavLink>
            <SuperButton onClick={nextCard}>Next</SuperButton>
        </div>

    </div>
}