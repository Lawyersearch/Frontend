import React from "react";
import { useRemoveEducationMutation } from "../../services/education";
import { Education } from "../../types/user";
import useRemoveItem from "./useRemoveItem";

const useRemoveQualification = (setEds: React.Dispatch<React.SetStateAction<Education[]>>) =>
    useRemoveItem<Education>(useRemoveEducationMutation, setEds);

export default useRemoveQualification;
