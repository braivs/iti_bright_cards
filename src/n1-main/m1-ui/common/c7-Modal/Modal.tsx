import React from 'react';
import s from './Modal.module.scss'

export const Modal = () => {
    return <div className={s.modal}>
        <div className={s.modalText}>
            Modal text
        </div>
    </div>
}