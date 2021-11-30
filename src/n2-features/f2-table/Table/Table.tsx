import React, {ChangeEvent, useEffect, useState} from 'react';
import sContainer from '../../../n1-main/m1-ui/common/components/Container.module.scss'
import s from './Table.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {
    addCardsPackTC, deleteCardsPackTC,
    getCardsPackTC,
    setPageCountAC,
    setUserIdAfterRadioAC,
    SortPackType,
    updateCardPackTC
} from "../../../n1-main/m2-bll/cardsPack-reducer";
import {AppStoreType} from "../../../n1-main/m2-bll/store";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import Pagination from "../Pagination/Pagination";
import Search from "../Search/Search";
import {Settings} from "../Settings/Settings";
import {TableContent} from "../TableContent/TableContent";
import {NavLink} from "react-router-dom";
import {CardsPackType} from "../../../n1-main/m2-bll/api/cardsPack-api";
import {v1} from "uuid";
import {Modal} from "../../f3-modal/Modal";
import SuperInputText from "../../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import SortPacks from "../SortPacks/SortPacks";
import {
    closeAllModalsAC,
    setActiveCardPackAC,
    showModalAddCardPackAC,
    showModalDelCardPackAC
} from "../../../n1-main/m2-bll/modal-reducer";

export const Table = () => {

    const dispatch = useDispatch()
    const userID = useSelector<AppStoreType, string>(state => state.profile._id)
    const pageCount = useSelector<AppStoreType, number>(state => state.table.pageCount).toString()
    const page = useSelector<AppStoreType, number>(state => state.table.page)
    const packName = useSelector<AppStoreType, string>(state => state.table.packName)
    const superRadioArr = ['Profile', 'Public']  // for SuperRadio in Settings
    const sortPacks = useSelector<AppStoreType, SortPackType>(state => state.table.sortPacks)
    const min = useSelector<AppStoreType, number>(state => state.table.min)
    const max = useSelector<AppStoreType, number>(state => state.table.max)
    const activeCardPack = useSelector<AppStoreType, string>(state => state.modal.activeCardPack) // for modals
    const modalDelCardPackShowHide = useSelector<AppStoreType, boolean>(state => state.modal.modalDelCardPackShowHide)
    const modalAddCardPackShowHide = useSelector<AppStoreType, boolean>(state => state.modal.modalAddCardPackShowHide)

    const [profileOrPublic, onChangeProfileOrPublic] = useState(superRadioArr[0]) // for SuperRadio is Settings

    const cardsPacks = useSelector<AppStoreType, Array<CardsPackType>>(state => state.table.cardPacks)

    useEffect(() => {
        if (profileOrPublic === 'Public') {
            dispatch(setUserIdAfterRadioAC(''))
        } else {
            dispatch(setUserIdAfterRadioAC(userID))
        }
        dispatch(getCardsPackTC())

    }, [profileOrPublic, pageCount, page, packName, sortPacks, min, max])

    const setPageCountHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (Number(e.currentTarget.value) < 1) e.currentTarget.value = '1'
        dispatch(setPageCountAC(Number(e.currentTarget.value)))
    }
    const delCardsPackHandler = (cardPackId: string) => {
        dispatch(showModalDelCardPackAC())
        dispatch(setActiveCardPackAC(cardPackId))
    }
    const updateCardsPackHandler = (cardPackId: string) => {
        dispatch(updateCardPackTC(cardPackId, 'BrightUpdatedName'))
    }
    const addCardPackButtonHandler = () => {
        dispatch(showModalAddCardPackAC())
    }

    const CardsPackHeader: TableHeaderModelType = [
        {id: v1(), element: <div><span>Name</span><SortPacks upperSort={'0name'} lowerCount={'1name'}/></div>},
        {
            id: v1(),
            element: <div><span>cardsCount</span><SortPacks upperSort={'0cardsCount'} lowerCount={'1cardsCount'}/></div>
        },
        {id: v1(), element: <div><span>updated</span><SortPacks upperSort={'0updated'} lowerCount={'1updated'}/></div>},
        {id: v1(), element: <SuperButton onClick={addCardPackButtonHandler}>Add CardPack</SuperButton>},
    ]

    // remapping arrays for TableContent
    const cardsPackMapped = cardsPacks.map(e => {
        return {
            id: e._id,
            element: [
                <NavLink className={s.item} exact to={`/cards/${e._id}`}>{e.name}</NavLink>,
                e.cardsCount,
                e.updated,
                e.user_id === userID
                    ? <div>
                        <SuperButton className={s.button} onClick={() => delCardsPackHandler(e._id)}>del</SuperButton>
                        <SuperButton className={s.button} onClick={() => updateCardsPackHandler(e._id)}>update</SuperButton>
                        <NavLink className={s.item} exact to={`/learn/${e._id}`}> <SuperButton
                            className={s.button}>Learn</SuperButton>
                        </NavLink>
                    </div>
                    : <div>
                        <NavLink className={s.item} exact to={`/learn/${e._id}`}> <SuperButton
                            className={s.button}>Learn</SuperButton>
                        </NavLink>
                    </div>,
            ]
        }
    })

    const ModalAddCardPack = () => {
        const [cardPackNameInModal, setCardPackNameInModal] = useState('')

        const addCardPackInModalButtonHandler = () => {
            dispatch(addCardsPackTC(cardPackNameInModal))
            dispatch(closeAllModalsAC())
        }

        return <Modal modalShowHide={modalAddCardPackShowHide}>
            Enter Card Pack name.
            <div>
                <SuperInputText value={cardPackNameInModal}
                                onChangeText={setCardPackNameInModal}/>
            </div>
            <SuperButton onClick={addCardPackInModalButtonHandler}>Add Card Pack</SuperButton>
        </Modal>
    }

    const ModalDelCardPack = () => {
        const modalYesDelCardPackHandler = () => {
            dispatch(deleteCardsPackTC(activeCardPack))
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

    return (
        <div className={`${sContainer.container} ${s.table}`}>
            <ModalAddCardPack />
            <ModalDelCardPack/>
            <h1>This is table of Card Packs.</h1>
            <Search/>
            <Settings setPageCountHandler={setPageCountHandler}
                      superRadioArr={superRadioArr}
                      profileOrPublic={profileOrPublic}
                      onChangeProfileOrPublic={onChangeProfileOrPublic}
            />

            <TableContent headerModel={CardsPackHeader} bodyModel={cardsPackMapped}/>
            <Pagination/>
        </div>
    );
};

type HeaderModelElementType = {
    id: string,
    element: string | JSX.Element
}

export type TableHeaderModelType = Array<HeaderModelElementType>
