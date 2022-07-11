import React from "react";
import { WorkExpirience } from "../../types/user";
import useRemoveItem from "./useRemoveItem";
import { useRemoveWorkExperienceMutation } from "../../services/workExperience";

const useRemoveWorkExp = (
  setEds: React.Dispatch<React.SetStateAction<WorkExpirience[]>>
) =>
  useRemoveItem<WorkExpirience>(useRemoveWorkExperienceMutation as any, setEds);

export default useRemoveWorkExp;
