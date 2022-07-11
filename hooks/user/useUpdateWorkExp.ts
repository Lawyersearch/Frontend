import React from "react";
import { WorkExpirience } from "../../types/user";
import useUpdateItem from "./useUpdateItem";

const useUpdateWorkExp = (
  setWorkExp: React.Dispatch<React.SetStateAction<WorkExpirience[]>>
) => useUpdateItem(setWorkExp);

export default useUpdateWorkExp;
