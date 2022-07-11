import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import GenericModal from "./GenericModal";

export interface ConfirmModalProps {
  show: boolean;
  setHide: () => void;
  onConfirm: () => void;
  confirmString: string;
  children: JSX.Element | JSX.Element[];
}

const ConfirmModal = ({
  show,
  setHide,
  onConfirm,
  confirmString,
  children,
}: ConfirmModalProps) => {
  const onConfirmClick = () => {
    onConfirm();
    setHide();
  };

  return (
    <GenericModal open={show} onClose={setHide}>
      <Stack spacing={3} alignItems="center">
        <Typography variant="h3" gutterBottom>
          Подтверждение
        </Typography>
        <Typography variant="h5">{confirmString} </Typography>
        {children}
        <Button
          variant="contained"
          color="error"
          onClick={onConfirmClick}
          fullWidth
        >
          Удалить
        </Button>
      </Stack>
    </GenericModal>
  );
};

export default ConfirmModal;
