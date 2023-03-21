import React from "react";
import ConfirmModal from "./ConfirmModal";
import { Education } from "../../types/user";
import Qualification from "../../components/user/profileComponents/qualification/Qualification";

interface DeleteQualificationModalProps {
    ed: Education | null;
    show: boolean;
    setHide: () => void;
    onConfirm: () => void;
}

const DeleteQualificationModal = ({ ed, show, setHide, onConfirm }: DeleteQualificationModalProps) => {
    return (
        <ConfirmModal show={show} setHide={setHide} onConfirm={onConfirm} confirmString="Удалить выбранный элемент?">
            {ed ? <Qualification ed={ed} /> : <></>}
        </ConfirmModal>
    );
};

export default DeleteQualificationModal;
