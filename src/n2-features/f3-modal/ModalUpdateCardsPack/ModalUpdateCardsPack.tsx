import React, {useEffect, useState} from "react";
import {closeAllModalsAC} from "../../../n1-main/m2-bll/modal-reducer";
import {Modal} from "../Modal/Modal";
import SuperInputText from "../../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../n1-main/m2-bll/store";
import {CardsPackType} from "../../../n1-main/m2-bll/api/cardsPack-api";
import {updateCardPackTC} from "../../../n1-main/m2-bll/cardsPack-reducer";
import s from './ModalUpdateCardsPack.module.scss'

export const ModalUpdateCardsPack = () => {
    const dispatch = useDispatch()

    const [cardsPackName, setCardPackName] = useState('')

    const activeCardPackId = useSelector<AppStoreType, string>(state => state.modal.activeCardPackId)
    const cardsPacks = useSelector<AppStoreType, Array<CardsPackType>>(state => state.table.cardPacks)

    const cardsPack = cardsPacks.find(e => e._id === activeCardPackId)
    let oldCardsPackName = ''
    if (cardsPack) oldCardsPackName = cardsPack.name

    useEffect(() => {
        setCardPackName(oldCardsPackName)
    }, [oldCardsPackName])

    const modalUpdateCardsPackShowHide = useSelector<AppStoreType, boolean>(state => state.modal.modalUpdateCardsPackShowHide)

    const buttonHandler = () => {
        dispatch(closeAllModalsAC())
        dispatch(updateCardPackTC(activeCardPackId, cardsPackName))
    }

    return <Modal modalShowHide={modalUpdateCardsPackShowHide}>
        Enter new Cards Pack name.
        <div>
            <SuperInputText value={cardsPackName}
                            onChangeText={setCardPackName}/>
        </div>
        <SuperButton onClick={buttonHandler} className={s.button}>Change Cards Pack name</SuperButton>
    </Modal>
}