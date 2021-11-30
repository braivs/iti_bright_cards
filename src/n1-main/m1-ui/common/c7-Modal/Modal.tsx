import React from 'react';
import s from './Modal.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../m2-bll/store";
import {setModalShowHideAC} from "../../../m2-bll/modal-reducer";

type ModalPropsType = {

}

export const Modal: React.FC<ModalPropsType> = (props) => {
    const dispatch = useDispatch()

    const modalShowHide = useSelector<AppStoreType, boolean>(state => state.modal.modalShowHide)

    if (!modalShowHide) return null

    const onCloseHandler = () => {
        dispatch(setModalShowHideAC(false))
    }

    return <div className={s.modalBackground}>
        <div className={s.modalWindow}>
            <div className={s.modalContent}>
                {props.children}
            </div>
            <div className={s.close} onClick={onCloseHandler}>X</div>
        </div>
    </div>
}