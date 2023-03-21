import React from "react";
import { Education } from "../../types/user";
import useUpdateItem from "./useUpdateItem";

const useUpdateQualification = (setEds: React.Dispatch<React.SetStateAction<Education[]>>) => useUpdateItem(setEds);

export default useUpdateQualification;
