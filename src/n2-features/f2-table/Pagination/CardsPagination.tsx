import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import style from './Pagination.module.css'
import SuperButton from '../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton';
import {setCurrentPageAC} from "../../../n1-main/m2-bll/cardsPack-reducer";


type PropsType = {
    page: number
    pageCount: number
    cardsTotalCount: number

}
const CardsPagination = (props: PropsType) => {
    const {page, pageCount,cardsTotalCount } = props
    const dispatch = useDispatch()

    const currentPageHandler = (page: number) => {
        dispatch(setCurrentPageAC(page))
    }

    let pagesCount = Math.ceil(cardsTotalCount / pageCount); //количество страниц всех!!! до пагинатора
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    const portionSize = 10; // порция которая видна в пагинации
    const portionCount = Math.ceil(pagesCount / portionSize) // количество порций по 5 страниц

    const [portion, setPortion] = useState(1)
    const leftNumber = (portion - 1) * portionSize + 1
    const rightNumber = portion * portionSize
    const correctValue = pages.filter((p) => p ? p >= leftNumber && p <= rightNumber : '')

    return (
        <div className={style.pagination}> {portion > 1 &&
        <SuperButton onClick={() => {
            setPortion(portion - 1)
        }} className={style.btn}>Prev
        </SuperButton>
        }
            {correctValue.map(p => {
                return (
                    <span
                        key={p}
                        className={`${style.item} ${page === p ? style.select : style.item}`}
                        onClick={() => currentPageHandler(p)}>{p}
                    </span>
                )

            })}
            {portionCount > portion && <SuperButton onClick={() => {
                setPortion(portion + 1)
            }} className={style.btn}>Next
            </SuperButton>}
        </div>
    )
};


export default CardsPagination;