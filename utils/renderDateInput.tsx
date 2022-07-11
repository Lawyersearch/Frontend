import { TextFieldProps } from "@mui/material/TextField/TextField";
import { TextField } from "@mui/material";
import React from "react";

const renderDateInput = (params: TextFieldProps) => {
  params.inputProps!.placeholder = "дд/мм/гггг";
  return <TextField {...params} />;
};

export default renderDateInput;
