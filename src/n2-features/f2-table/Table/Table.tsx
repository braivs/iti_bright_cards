import React, {ChangeEvent, useEffect, useState} from 'react';
import sContainer from '../../../n1-main/m1-ui/common/components/Container.module.scss'
import s from './Table.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {
    getCardsPackTC,
    setCardsCountAC,
    setPageCountAC,
    setSearchPackNameAC,
    setUserIdAfterRadioAC, SortPackType
} from "../../../n1-main/m2-bll/cardsPack-reducer";
import {AppStoreType} from "../../../n1-main/m2-bll/store";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import Pagination from "../Pagination/Pagination";
import Search from "../Search/Search";
import {Settings} from "../Settings/Settings";
import {TableContent} from "../TableContent/TableContent";
import {NavLink, Redirect} from "react-router-dom";
import {CardsPackType} from "../../../n1-main/m2-bll/api/cardsPack-api";
import {v1} from "uuid";
import SortPacks from "../SortPacks/SortPacks";
import {
    setActiveCardPackAC,
    showModalAddCardsPackAC,
    showModalDelCardsPackAC,
    showModalUpdateCardsPackAC
} from "../../../n1-main/m2-bll/modal-reducer";
import {ModalAddCardsPack} from "../../f3-modal/ModalAddCardsPack/ModalAddCardsPack";
import {ModalDelCardsPack} from "../../f3-modal/ModalDelCardsPack/ModalDelCardsPack";
import {ModalUpdateCardsPack} from "../../f3-modal/ModalUpdateCardsPack/ModalUpdateCardsPack";
import {useCustomDebounce} from "../CustomHooks/CustomDebounce";
import {useCustomRangeDebounce} from "../CustomHooks/CustomRangeDebounse";

export const Table = () => {

    const dispatch = useDispatch()

    const userID = useSelector<AppStoreType, string>(state => state.profile._id)
    const pageCount = useSelector<AppStoreType, number>(state => state.table.pageCount).toString()
    const page = useSelector<AppStoreType, number>(state => state.table.page)
    const superRadioArr = ['Profile', 'Public']  // for SuperRadio in Settings
    const cardsPacks = useSelector<AppStoreType, Array<CardsPackType>>(state => state.table.cardPacks)
    const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.auth.isLoggedIn)
    const sortPacks = useSelector<AppStoreType, SortPackType>(state => state.table.sortPacks)

    const [profileOrPublic, onChangeProfileOrPublic] = useState(superRadioArr[0]) // for SuperRadio is Settings
    const [searchTerm, setSearchTerm] = useState('');
    const [values, setValues] = useState<number[]>([0, 100])
    const debouncedSearchTerm = useCustomDebounce(searchTerm, 2000);
    const debouncedRange = useCustomRangeDebounce(values, 2000)

    useEffect(() => {
        if (profileOrPublic === 'Public') {
            dispatch(setUserIdAfterRadioAC(''))
        } else {
            dispatch(setUserIdAfterRadioAC(userID))
        }
        dispatch(setSearchPackNameAC(debouncedSearchTerm))
        dispatch(setCardsCountAC(debouncedRange[0], debouncedRange[1]))
        dispatch(getCardsPackTC())

    }, [profileOrPublic, pageCount, page, sortPacks, debouncedSearchTerm, debouncedRange[0], debouncedRange[1]])

    const setPageCountHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (Number(e.currentTarget.value) < 1) e.currentTarget.value = '1'
        dispatch(setPageCountAC(Number(e.currentTarget.value)))
    }
    const delCardsPackHandler = (cardPackId: string) => {
        dispatch(showModalDelCardsPackAC())
        dispatch(setActiveCardPackAC(cardPackId))
    }
    const updateCardsPackHandler = (cardPackId: string) => {
        dispatch(showModalUpdateCardsPackAC())
        dispatch(setActiveCardPackAC(cardPackId))
    }
    const addCardPackButtonHandler = () => {
        dispatch(showModalAddCardsPackAC())
    }
    if (!isLoggedIn) {
        return <Redirect to='/login'/>
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
                            className={s.button}  disabled={!e.cardsCount}>Learn</SuperButton>
                        </NavLink>
                    </div>
                    : <div>
                        <NavLink className={s.item} exact to={`/learn/${e._id}`}> <SuperButton
                            className={s.button} disabled={!e.cardsCount}>Learn</SuperButton>
                        </NavLink>
                    </div>,
            ]
        }
    })

    return (
        <div className={`${sContainer.container} ${s.table}`}>
            <ModalAddCardsPack/>
            <ModalDelCardsPack/>
            <ModalUpdateCardsPack/>
            <h1>This is table of Card Packs.</h1>
            <Search
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                values={values}
                setValues={setValues}/>

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