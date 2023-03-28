import React from "react";
import DeleteConfirmModal from "../../DeleteConfirm";
import { WorkExpirience } from "../../../../types/user";
import Experience from "../../../../components/user/profileComponents/experience/Experience";

interface DeleteExperienceModalProps {
    exp: WorkExpirience | null;
    show: boolean;
    setHide: () => void;
    onConfirm: () => void;
}

const DeleteExperienceModal = ({ exp, show, setHide, onConfirm }: DeleteExperienceModalProps) => {
    return (
        <DeleteConfirmModal
            show={show}
            setHide={setHide}
            onConfirm={onConfirm}
            confirmString="Удалить выбранный элемент?"
        >
            {exp ? <Experience exp={exp} /> : <></>}
        </DeleteConfirmModal>
    );
};

export default DeleteExperienceModal;
