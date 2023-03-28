import React, { useState } from "react";
import { Typography, FormControl, Stack, Button, InputAdornment } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import useEnterPress from "../../../hooks/useEnterPress";
import { isNotEmpty, isNumberLike } from "../../../utils/validation";
import { invalidEmptyMessageTest, invalidPriceText } from "../../strings";
import ValidInput from "../../components/ValidInput";
import GenericModal from "../Generic";

interface RespondOrderModalProps {
    startingPrice?: number;
    open: boolean;
    onClose: () => void;
    respond: ({ message, price }: { message: string; price: number }) => void;
}

const RespondOrderModal = ({ startingPrice, open, onClose, respond }: RespondOrderModalProps) => {
    const [submited, setSubmited] = useState(false);
    const [message, setMessage] = useState("");
    const [price, setPrice] = useState(startingPrice ? String(startingPrice) : "");

    const submit = () => {
        if (!open) {
            return;
        }

        setSubmited(true);

        if (isNotEmpty(message) && isNumberLike(price)) {
            respond({ message, price: +price });
        }
    };

    useEnterPress(submit);

    return (
        <GenericModal open={open} onClose={onClose}>
            <>
                <Typography variant="h5" component="h2" gutterBottom>
                    Оставление отклика
                </Typography>
                <FormControl fullWidth sx={{ width: 600 }}>
                    <Stack spacing={2}>
                        <ValidInput
                            label="Сообщение"
                            value={message}
                            multiline
                            bindChange={setMessage}
                            valid={isNotEmpty}
                            invalidText={invalidEmptyMessageTest}
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
                        <Button variant="outlined" startIcon={<CommentIcon />} onClick={submit}>
                            Откликнуться
                        </Button>
                    </Stack>
                </FormControl>
            </>
        </GenericModal>
    );
};

export default RespondOrderModal;
