import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import style from './Pagination.module.css'
// import {setCurrentPageAC} from "../../../n1-main/m2-bll/table-reducer";
import SuperButton from '../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton';
import {setCurrentPageCardsAC, setPageCountCardsAC} from "../../../n1-main/m2-bll/cards-reducer";


type PropsType = {
    pageCard: number
    pageCountCards: number
    cardsTotalCountCards: number

}
const CardsPagination = (props: PropsType) => {
    const {pageCard, pageCountCards,cardsTotalCountCards } = props
    const dispatch = useDispatch()

    const currentPageHandler = (page: number) => {
        dispatch(setCurrentPageCardsAC(page))
        dispatch(setPageCountCardsAC(pageCountCards))
    }

    let pagesCountCards = Math.ceil(cardsTotalCountCards / pageCountCards); //количество страниц всех!!! до пагинатора
    let pages = [];
    for (let i = 1; i <= pagesCountCards; i++) {
        pages.push(i)
    }
    const portionSize = 10; // порция которая видна в пагинации
    const portionCount = Math.ceil(pagesCountCards / portionSize) // количество порций по 5 страниц

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
                        className={`${style.item} ${pageCard === p ? style.select : style.item}`}
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