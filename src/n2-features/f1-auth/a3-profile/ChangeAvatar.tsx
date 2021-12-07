import React, {ChangeEvent, useState} from "react";
import {ChangeProfileTC, setAvatarAC} from "../../../n1-main/m2-bll/profileReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../n1-main/m2-bll/store";


export const ChangeAvatar = () => {

    const dispatch = useDispatch()
    const reader = new FileReader()
    const [change, setChange] = useState(false)
    const [file, setFile] = useState<any>();
    const [fileURL, setFileURL] = useState<any>()
    const [file64, setFile64] = useState<any>()
    const upload = (e: ChangeEvent<HTMLInputElement>) => {


        const newFile = e.target.files && e.target.files[0]
        reader.onloadend = () => {
            setFile64(reader.result)
        }
        // @ts-ignore
        reader.readAsDataURL(newFile)
        // @ts-ignore


        if (newFile) {

            setFileURL(window.URL.createObjectURL(newFile))
        }
    }

    const changeAvatar = () => {
        dispatch(setAvatarAC(file64))
        dispatch(ChangeProfileTC())
        setChange(false)
    }
    return <>
        {change ?
            <div>
                <input type="file" accept='.jpg, .jpeg, .png' onChange={upload}/>
                <div>
                    <button onClick={changeAvatar}>Send</button>
                </div>
            </div> : <button onClick={() => setChange(true)}>Change avatar</button>}

    </>
}