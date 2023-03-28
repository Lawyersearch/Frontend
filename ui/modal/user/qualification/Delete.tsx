import React from "react";
import DeleteConfirmModal from "../../DeleteConfirm";
import { Education } from "../../../../types/user";
import Qualification from "../../../../components/user/profileComponents/qualification/Qualification";

interface DeleteQualificationModalProps {
    ed: Education | null;
    show: boolean;
    setHide: () => void;
    onConfirm: () => void;
}

const DeleteQualificationModal = ({ ed, show, setHide, onConfirm }: DeleteQualificationModalProps) => {
    return (
        <DeleteConfirmModal
            show={show}
            setHide={setHide}
            onConfirm={onConfirm}
            confirmString="Удалить выбранный элемент?"
        >
            {ed ? <Qualification ed={ed} /> : <></>}
        </DeleteConfirmModal>
    );
};

export default DeleteQualificationModal;
