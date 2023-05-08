import { useState } from "react";
import { Typography, FormControl, Stack, InputAdornment, Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import useEnterPress from "../../../hooks/utils/useEnterPress";
import { getProfileId, isNotEmpty, isNumberLike } from "../../../utils/validation";
import ValidInput from "../../components/ValidInput";
import { invalidEmptyText, invalidPriceText, invalidProfileId } from "../../strings";
import GenericModal from "../Generic";
import { OrderPost } from "../../../services/order";

interface CreateOrderModalProps {
    open: boolean;
    onClose: () => void;
    create: (orderData: OrderPost) => void;
}

const CreateOrderModal = ({ open, onClose, create }: CreateOrderModalProps) => {
    const [submited, setSubmited] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [performerProfile, setPerformerProfile] = useState("");
    const [price, setPrice] = useState("");

    const submit = () => {
        if (!open) {
            return;
        }

        setSubmited(true);

        const performerId = getProfileId(performerProfile);
        if (isNotEmpty(title) && isNotEmpty(description) && isNumberLike(price) && performerId) {
            create({ title, description, price: +price, performerId });
        }
    };

    useEnterPress(submit);

    return (
        <GenericModal open={open} onClose={onClose}>
            <Typography variant="h5" component="h2" gutterBottom>
                Добавление заказа
            </Typography>
            <FormControl fullWidth sx={{ width: 600 }}>
                <Stack spacing={2}>
                    <ValidInput
                        label="Заголовок"
                        value={title}
                        bindChange={setTitle}
                        valid={isNotEmpty}
                        invalidText={invalidEmptyText}
                        showError={submited}
                    />
                    <ValidInput
                        label="Описание"
                        value={description}
                        multiline
                        bindChange={setDescription}
                        valid={isNotEmpty}
                        invalidText={invalidEmptyText}
                        showError={submited}
                    />
                    <ValidInput
                        label="Профиль исполнителя (не обязательно)"
                        value={performerProfile}
                        bindChange={setPerformerProfile}
                        valid={getProfileId}
                        invalidText={invalidProfileId}
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
                        Добавить
                    </Button>
                </Stack>
            </FormControl>
        </GenericModal>
    );
};

export default CreateOrderModal;
