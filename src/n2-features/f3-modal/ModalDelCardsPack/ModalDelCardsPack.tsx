import {deleteCardsPackTC} from "../../../n1-main/m2-bll/cardsPack-reducer";
import {closeAllModalsAC} from "../../../n1-main/m2-bll/modal-reducer";
import {Modal} from "../Modal/Modal";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../n1-main/m2-bll/store";

export const ModalDelCardsPack = () => {
    const dispatch = useDispatch()

    const activeCardPackId = useSelector<AppStoreType, string>(state => state.modal.activeCardPackId)
    const modalDelCardPackShowHide = useSelector<AppStoreType, boolean>(state => state.modal.modalDelCardsPackShowHide)

    const modalYesDelCardPackHandler = () => {
        dispatch(deleteCardsPackTC(activeCardPackId))
        dispatch(closeAllModalsAC())
    }
    const modalNoDelCardPackHandler = () => {
        dispatch(closeAllModalsAC())

    }

    return <Modal modalShowHide={modalDelCardPackShowHide}>
        Are you sure you want to delete the Card Pack?
        <div>
            <SuperButton onClick={modalYesDelCardPackHandler}>Yes</SuperButton>
            <SuperButton onClick={modalNoDelCardPackHandler}>No</SuperButton>
        </div>
    </Modal>
}