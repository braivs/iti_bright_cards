import React, {useState} from "react";
import {closeAllModalsAC} from "../../../n1-main/m2-bll/modal-reducer";
import {Modal} from "../Modal/Modal";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../n1-main/m2-bll/store";
import {addCardTC} from "../../../n1-main/m2-bll/cards-reducer";
import sInput from '../../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText.module.scss'

export const ModalAddCard = () => {
    const dispatch = useDispatch()
    const modalAddCardShowHide = useSelector<AppStoreType, boolean>(state => state.modal.modalAddCardShowHide)

    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')

    const buttonHandler = () => {
        dispatch(addCardTC(question, answer))
        dispatch(closeAllModalsAC())
    }

    return <Modal modalShowHide={modalAddCardShowHide}>
        <div>Enter Card question:</div>
        <textarea className={sInput.input} value={question} onChange={(e) => {setQuestion(e.target.value)}} />
        <div>Enter Card answer:</div>
        <textarea className={sInput.input} value={answer} onChange={(e) => {setAnswer(e.target.value)}} />
        <SuperButton onClick={buttonHandler}>Add Card</SuperButton>
    </Modal>
}

// todo: Separate textarea to common component