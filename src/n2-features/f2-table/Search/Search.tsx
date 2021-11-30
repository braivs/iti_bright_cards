import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {setSearchPackNameAC} from "../../../n1-main/m2-bll/cardsPack-reducer";
import SuperInputText from "../../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import style from './Search.module.css'
import PriceRange from "../Range/Range";
import {useCustomDebounce} from "../CustomHooks/CustomDebounce";


const Search = () => {
    const dispatch = useDispatch()
    const [searchTerm, setSearchTerm] = useState('');
    const [values, setValues] = useState<number[]>([0, 100])
    const debouncedSearchTerm = useCustomDebounce(searchTerm, 2000);

    useEffect(() => {
        dispatch(setSearchPackNameAC(debouncedSearchTerm))
    }, [debouncedSearchTerm])
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.currentTarget.value)
    }

    return (
        <div className={style.block}>

            <SuperInputText
                value={searchTerm}
                onChange={onChangeHandler}
                placeholder={'enter name'}/>

            <PriceRange
                values={values}
                setValues={setValues}
            />
        </div>)
}

export default Search;