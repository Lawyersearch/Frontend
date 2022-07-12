import React from "react";
import ConfirmModal from "./ConfirmModal";
import { WorkExpirience } from "../../types/user";
import Experience from "../../components/user/profileComponents/experience/Experience";

interface DeleteExperienceModalProps {
  exp: WorkExpirience | null;
  show: boolean;
  setHide: () => void;
  onConfirm: () => void;
}

const DeleteExperienceModal = ({
  exp,
  show,
  setHide,
  onConfirm,
}: DeleteExperienceModalProps) => {
  return (
    <ConfirmModal
      show={show}
      setHide={setHide}
      onConfirm={onConfirm}
      confirmString="Удалить выбранный элемент?"
    >
      {exp ? <Experience exp={exp} /> : <></>}
    </ConfirmModal>
  );
};

export default DeleteExperienceModal;
