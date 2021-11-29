import React from 'react';
import s from './Modal.module.scss'

type ModalPropsType = {
    show: boolean
    onClose: () => void
}

export const Modal: React.FC<ModalPropsType> = (props) => {
    if (!props.show) return null

    const onCloseHandler = () => {
        props.onClose()
    }

    return <div className={s.modalBackground}>
        <div className={s.modalWindow}>
            <div className={s.modalContent}>
                {props.children}
            </div>
            <div className={s.close} onClick={onCloseHandler}>X</div>
        </div>
    </div>
}