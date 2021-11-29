import React, {useState} from 'react';
import s from './Learn.module.scss'
import {CardType} from "../../../n1-main/m2-bll/api/cards-api";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {NavLink} from 'react-router-dom';

export type LearnPropsType = {
    card: CardType
    nextCard: () => void
}

export const Learn = (props: LearnPropsType) => {
    const [hidden, setHidden] = useState(true)

    const nextCard = () => {
        props.nextCard()
        setHidden(true)
    }
    return <div className={s.body}>

        <span>{props.card.question}</span>

        <div>
            {hidden ? <SuperButton onClick={() => setHidden(false)}>Answer</SuperButton> :
            <span>{props.card.answer}</span>}
        </div>

        <div className={s.grade}>
            <SuperButton className={s.gradeBtn} onClick={() => ('')}>1</SuperButton>
            <SuperButton className={s.gradeBtn} onClick={() => ('')}>2</SuperButton>
            <SuperButton className={s.gradeBtn} onClick={() => ('')}>3</SuperButton>
            <SuperButton className={s.gradeBtn} onClick={() => ('')}>4</SuperButton>
            <SuperButton className={s.gradeBtn} onClick={() => ('')}>5</SuperButton>
        </div>

        <div className={s.btn}>
            <NavLink exact to={`/table`}><SuperButton>Cancel</SuperButton></NavLink>
            <SuperButton onClick={nextCard}>Next</SuperButton>
        </div>

    </div>
}