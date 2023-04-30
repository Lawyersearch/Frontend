import React from "react";
import { Typography, Stack, Button, IconButton } from "@mui/material";
import useEnterPress from "../../../hooks/utils/useEnterPress";
import GenericModal from "../Generic";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";

interface ChangeStatusModalProps {
    open: boolean;
    onClose: () => void;
    change: () => void;
}

const mkChangeStatusModal =
    (newStatus: string) =>
    ({ open, onClose, change }: ChangeStatusModalProps) => {
        const submit = () => open && change();

        useEnterPress(submit);

        return (
            <GenericModal open={open} onClose={onClose}>
                <Stack spacing={2}>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography variant="h5" component="h2" gutterBottom>
                            Смена статуса
                        </Typography>
                        <IconButton color="error">
                            <ClearIcon />
                        </IconButton>
                    </Stack>
                    <Typography gutterBottom>
                        Вы точно хотите сменить статс заказа на{" "}
                        <Typography component="span" fontWeight={600}>
                            "{newStatus}"
                        </Typography>
                        ?
                    </Typography>
                    <Button variant="outlined" startIcon={<CheckIcon />} onClick={submit}>
                        Подтвердить
                    </Button>
                </Stack>
            </GenericModal>
        );
    };

export const ChangeStatusCompletedModal = mkChangeStatusModal("Завершен");
export const ChangeStatusClosedModal = mkChangeStatusModal("Закрыт");
export const ChangeStatusDismissModal = mkChangeStatusModal("Отменен");
export const ChangeStatusDisputModal = mkChangeStatusModal("Спор");
