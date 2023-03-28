import { Button, Stack, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import React from "react";
import GenericModal from "./Generic";

export interface DeleteConfirmModalProps {
    show: boolean;
    setHide: () => void;
    onConfirm: () => void;
    confirmString: string;
    children?: JSX.Element | JSX.Element[];
}

const DeleteConfirmModal = ({ show, setHide, onConfirm, confirmString, children }: DeleteConfirmModalProps) => {
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
                <Button fullWidth startIcon={<ClearIcon />} variant="contained" color="error" onClick={onConfirmClick}>
                    Удалить
                </Button>
            </Stack>
        </GenericModal>
    );
};

export default DeleteConfirmModal;
