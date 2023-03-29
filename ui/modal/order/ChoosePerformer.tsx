import React, { useState } from "react";
import { Typography, FormControl, Stack, Button, InputAdornment, Box, Card, IconButton } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import useEnterPress from "../../../hooks/utils/useEnterPress";
import { isNotEmpty, isNumberLike } from "../../../utils/validation";
import { invalidEmptyMessageTest, invalidPriceText } from "../../strings";
import ValidInput from "../../components/ValidInput";
import GenericModal from "../Generic";
import { Offer } from "../../../types/offer";
import GenericOfferCard from "../../../components/offer/Generic";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";

interface ChoosePerformerModalProps {
    offer: Offer;
    open: boolean;
    onClose: () => void;
    choose: (offer: Offer) => void;
}

const ChoosePerformerModal = ({ offer, open, onClose, choose }: ChoosePerformerModalProps) => {
    const submit = () => open && choose(offer);

    useEnterPress(submit);

    return (
        <GenericModal open={open} onClose={onClose}>
            <Stack spacing={2}>
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="h5" component="h2" gutterBottom>
                        Выбор исполнителя
                    </Typography>
                    <IconButton color="error">
                        <ClearIcon />
                    </IconButton>
                </Stack>

                <Typography gutterBottom>Вы точно хотите выбрать это предложение?</Typography>
                <Card sx={{ p: 2, borderRadius: 4 }}>
                    <GenericOfferCard offer={offer} />
                </Card>
                <Button variant="outlined" startIcon={<CheckIcon />} onClick={submit}>
                    Выбрать
                </Button>
            </Stack>
        </GenericModal>
    );
};

export default ChoosePerformerModal;
