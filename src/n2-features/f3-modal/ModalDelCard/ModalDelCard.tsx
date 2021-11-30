
import React from "react";
import {Modal} from "../Modal/Modal";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";

export const ModalDelCard = () => {
    return <Modal modalShowHide={false}>
        Are you sure you want to delete the Card?
        <div>
            <SuperButton onClick={() => {window.alert('Yes')}}>Yes</SuperButton>
            <SuperButton onClick={() => {window.alert('No')}}>No</SuperButton>
        </div>
    </Modal>
}