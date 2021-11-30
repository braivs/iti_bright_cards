import React from "react";
import {Modal} from "../Modal/Modal";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../n1-main/m2-bll/store";
import {closeAllModalsAC} from "../../../n1-main/m2-bll/modal-reducer";
import {deleteCardTC} from "../../../n1-main/m2-bll/cards-reducer";

export const ModalDelCard = () => {

    const dispatch = useDispatch()
    const modalDelCardShowHide = useSelector<AppStoreType, boolean>(state => state.modal.modalDelCardShowHide)
    const activeCardId = useSelector<AppStoreType, string>(state => state.modal.activeCardId)

    const modalYesDelCardPackHandler = () => {
        dispatch(closeAllModalsAC())
        dispatch(deleteCardTC(activeCardId))
    }
    const modalNoDelCardPackHandler = () => {
        dispatch(closeAllModalsAC())

    }

    return <Modal modalShowHide={modalDelCardShowHide}>
        Are you sure you want to delete the Card?
        <div>
            <SuperButton onClick={modalYesDelCardPackHandler}>Yes</SuperButton>
            <SuperButton onClick={modalNoDelCardPackHandler}>No</SuperButton>
        </div>
    </Modal>
}