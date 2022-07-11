import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import AddCard from "./AddCard";
import { useAddWorkExperienceMutation } from "../../../services/workExperience";
import { WorkExpirience } from "../../../types/user";
import { useBoolean } from "../../../hooks/useBoolean";
import ExperienceForm from "./ExperienceForm";

interface AddWorkExperienceProps {
  setWorkExp: React.Dispatch<React.SetStateAction<WorkExpirience[]>>;
}

const AddWorkExperience = ({ setWorkExp }: AddWorkExperienceProps) => {
  const [show, setShow, setHide] = useBoolean(false);
  const [addWorkExperience, { isSuccess, data: workExp }] =
    useAddWorkExperienceMutation();

  useEffect(() => {
    if (isSuccess) {
      setHide();
      setWorkExp((state) => [...state, workExp!]);
    }
  }, [isSuccess]);

  return (
    <AddCard show={show} setShow={setShow} setHide={setHide}>
      <Typography variant="h5" component="h2" mb={4}>
        Добавление опыта работы
      </Typography>
      <ExperienceForm onSubmit={addWorkExperience} />
    </AddCard>
  );
};

export default AddWorkExperience;
