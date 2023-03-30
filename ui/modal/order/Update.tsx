import { useState } from "react";
import { Typography, FormControl, Stack, InputAdornment, Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import useEnterPress from "../../../hooks/utils/useEnterPress";
import { Order } from "../../../types/order";
import { isNotEmpty, isNumberLike } from "../../../utils/validation";
import ValidInput from "../../components/ValidInput";
import { invalidEmptyText, invalidPriceText } from "../../strings";
import GenericModal from "../Generic";

type OrderData = Pick<Order, "price" | "description" | "title">;

interface UpdateOrderModalProps {
    order: OrderData;
    open: boolean;
    onClose: () => void;
    update: (orderData: OrderData) => void;
}

const UpdateOrderModal = ({ order, open, onClose, update }: UpdateOrderModalProps) => {
    const [submited, setSubmited] = useState(false);
    const [title, setTitle] = useState(order.title);
    const [description, setDescription] = useState(order.description);
    const [price, setPrice] = useState(String(order.price));

    const submit = () => {
        if (!open) {
            return;
        }

        setSubmited(true);

        if (isNotEmpty(title) && isNotEmpty(description) && isNumberLike(price)) {
            update({ title, description, price: +price });
        }
    };

    useEnterPress(submit);

    return (
        <GenericModal open={open} onClose={onClose}>
            <>
                <Typography variant="h5" component="h2" gutterBottom>
                    Изменение заказа
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
            </>
        </GenericModal>
    );
};

export default UpdateOrderModal;
