import React from 'react';
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import style from './SortPacks.module.css';
import {sortPacksAC, SortPackType} from "../../../n1-main/m2-bll/cardsPack-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../n1-main/m2-bll/store";


type PropsType = {
    upperSort: SortPackType
    lowerCount: SortPackType
}
const SortPacks = (props: PropsType) => {
    const dispatch = useDispatch()
    const sortPack = useSelector<AppStoreType, SortPackType>((state)=> state.table.sortPacks)
    const upperSortHandler = () => {
        dispatch(sortPacksAC(props.upperSort))
    }
    const lowerSortHandler = () => {
            dispatch(sortPacksAC(props.lowerCount))

    }
    return (
        <div className={style.container}>
            <span className={style.elem}>updated  </span>
            <div className={style.block}>
                <SuperButton className={style.btn} onClick={upperSortHandler}>
                    ^
                </SuperButton>
                <SuperButton className={style.btn} onClick={lowerSortHandler}>
                    v
                </SuperButton>
            </div>

        </div>
    );
};

export default SortPacks;