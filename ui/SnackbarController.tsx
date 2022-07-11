import React, { useCallback } from "react";
import Slide from "@mui/material/Slide";
import { SnackbarProvider, useSnackbar } from "notistack";
import { useAppDispatch } from "../hooks/redux/useTypedRedux";
import { setPushSnack } from "../store/reducers/uiSlice";
import { Snack } from "../types/snack";

interface SnackbarProps {
  children: JSX.Element | JSX.Element[];
}

const SnackbarHandler = ({ children }: SnackbarProps) => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const pushSnack = useCallback(
    (snack: Snack) =>
      enqueueSnackbar(snack.message, { variant: snack.variant }),
    []
  );
  dispatch(setPushSnack(pushSnack));
  return <>{children}</>;
};

const SnackbarController = ({ children }: SnackbarProps) => (
  <SnackbarProvider
    maxSnack={3}
    anchorOrigin={{ vertical: "top", horizontal: "right" }}
    TransitionComponent={Slide}
    autoHideDuration={2000}
  >
    <SnackbarHandler>{children}</SnackbarHandler>
  </SnackbarProvider>
);

export default SnackbarController;
