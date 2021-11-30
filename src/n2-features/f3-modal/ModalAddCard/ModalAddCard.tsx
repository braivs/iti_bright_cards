import React, {useState} from "react";
import {closeAllModalsAC} from "../../../n1-main/m2-bll/modal-reducer";
import {Modal} from "../Modal/Modal";
import SuperInputText from "../../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../n1-main/m2-bll/store";
import {addCardTC} from "../../../n1-main/m2-bll/cards-reducer";

export const ModalAddCard = () => {
    const dispatch = useDispatch()
    const modalAddCardShowHide = useSelector<AppStoreType, boolean>(state => state.modal.modalAddCardShowHide)

    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')

    const buttonHandler = () => {
        dispatch(addCardTC(question, answer))
        dispatch(closeAllModalsAC())
    }
    //todo: change to textarea
    return <Modal modalShowHide={modalAddCardShowHide}>
        <div>Enter Card question:</div>
        <SuperInputText value={question} onChangeText={setQuestion}/>
        <div>Enter Card answer:</div>
        <SuperInputText value={answer} onChangeText={setAnswer}/>
        <SuperButton onClick={buttonHandler}>Add Card</SuperButton>
    </Modal>
}