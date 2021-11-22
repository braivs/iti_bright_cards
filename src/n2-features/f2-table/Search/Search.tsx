import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setSearchPackNameAC} from "../../../n1-main/m2-bll/table-reducer";
import {AppStoreType} from "../../../n1-main/m2-bll/store";
import SuperInputText from "../../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText";

const Search = () => {
    const dispatch = useDispatch()
    const packName = useSelector<AppStoreType, string>(state => state.table.packName)
    return (
        <div>
            <SuperInputText value={packName} onChange={
                (e) =>
                    dispatch(setSearchPackNameAC(e.currentTarget.value))}
            />

        </div>
    );
};

export default Search;