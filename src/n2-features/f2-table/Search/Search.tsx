import React, {ChangeEvent} from 'react';
import SuperInputText from "../../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import style from './Search.module.css'
import PriceRange from "../Range/Range";

type PropsType = {
    setSearchTerm: (search: string) => void
    searchTerm: string
    setValues: ([]: number[]) => void
    values: number[]
}
const Search = (props: PropsType) => {
    const {
        setSearchTerm,
        searchTerm,
        setValues,
        values
    } = props

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