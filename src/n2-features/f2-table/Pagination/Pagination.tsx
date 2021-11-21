import React from 'react';
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../n1-main/m2-bll/store";
import style from './Pagination.module.css'

const Pagination = () => {
    let pageCount = useSelector<AppStoreType, number>(state=> state.table.pageCount) // кол-во элементов на одной стр
    let cardPacksTotalCount = useSelector<AppStoreType, number>(state=> state.table.cardPacksTotalCount)// кол-во колод
    let page = useSelector<AppStoreType, number>(state=> state.table.page)// выбранная страница


    let pagesCount = Math.ceil(cardPacksTotalCount / pageCount); //количество страниц визуально в пагинаторе
    let pages = [];
    for(let i = 1; i<=pagesCount; i++){
        pages.push(i)
    }
    const newPages = pages.map(p => <span className={page===p ? style.select : ''}>{p}</span>)
    return (
        <div>
            {newPages}
        </div>
    );
};

export default Pagination;