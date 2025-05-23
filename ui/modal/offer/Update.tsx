import { Typography, FormControl, Stack, Button, InputAdornment } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import React, { useState } from "react";
import useEnterPress from "../../../hooks/utils/useEnterPress";
import { isNotEmpty, isNumberLike } from "../../../utils/validation";
import { invalidEmptyText, invalidPriceText } from "../../strings";
import ValidInput from "../../components/ValidInput";
import GenericModal from "../Generic";
import { MyOffer, Offer } from "../../../types/offer";

interface UpdateOfferModalProps {
    offer: Offer | MyOffer | null;
    open: boolean;
    onClose: () => void;
    edit: ({ message, price }: { message: string; price: number }) => void;
}

const UpdateOfferModal = ({ offer, open, onClose, edit }: UpdateOfferModalProps) => {
    const [submited, setSubmited] = useState(false);
    const [message, setMessage] = useState(offer?.message ?? "");
    const [price, setPrice] = useState(offer?.price ? String(offer.price) : "");

    const submit = () => {
        if (!open) {
            return;
        }

        setSubmited(true);

        if (isNotEmpty(message) && isNumberLike(price)) {
            edit({ message, price: +price });
        }
    };

    useEnterPress(submit);

    return (
        <GenericModal open={open} onClose={onClose}>
            <Typography variant="h5" component="h2" gutterBottom>
                Изменение отклика
            </Typography>
            <FormControl fullWidth sx={{ width: 600 }}>
                <Stack spacing={2}>
                    <ValidInput
                        label="Сообщение"
                        value={message}
                        multiline
                        bindChange={setMessage}
                        valid={isNotEmpty}
                        invalidText={invalidEmptyText}
                        showError={submited}
                    />
                    <ValidInput
                        label="Цена"
                        value={price}
                        InputProps={{ endAdornment: <InputAdornment position="end">₽</InputAdornment> }}
                        bindChange={setPrice}
                        valid={isNumberLike}
                        invalidText={invalidPriceText}
                        showError={submited}
                    />
                    <Button variant="outlined" startIcon={<SaveIcon />} onClick={submit}>
                        Сохранить
                    </Button>
                </Stack>
            </FormControl>
        </GenericModal>
    );
};

export default UpdateOfferModal;
