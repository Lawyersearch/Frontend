import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import AddCard from "./AddCard";
import { useAddEducationMutation } from "../../../services/education";
import { Education } from "../../../types/user";
import { useBoolean } from "../../../hooks/useBoolean";
import QualificationForm from "./QualificationForm";

interface AddQualificationProps {
  setEds: React.Dispatch<React.SetStateAction<Education[]>>;
}

const AddQualification = ({ setEds }: AddQualificationProps) => {
  const [show, setShow, setHide] = useBoolean(false);
  const [addEducation, { isSuccess, data: education }] =
    useAddEducationMutation();

  useEffect(() => {
    if (isSuccess) {
      setHide();
      setEds((state) => [...state, education!]);
    }
  }, [isSuccess]);

  return (
    <AddCard show={show} setShow={setShow} setHide={setHide}>
      <Typography variant="h5" component="h2" mb={4}>
        Добавление квалификации
      </Typography>
      <QualificationForm onSubmit={addEducation} />
    </AddCard>
  );
};

export default AddQualification;
