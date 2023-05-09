import { Typography, FormControl, Stack, Button, Rating } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, { useCallback, useState } from "react";
import useEnterPress from "../../../hooks/utils/useEnterPress";
import { LeaveReviewRequest } from "../../../services/review";
import { isNotEmpty } from "../../../utils/validation";
import { invalidEmptyText } from "../../strings";
import ValidInput from "../../components/ValidInput";
import GenericModal from "../Generic";

export type LeaveReviewModalData = Omit<LeaveReviewRequest, "userId">;

interface UpdateUserGeneralModalProps {
    open: boolean;
    onClose: () => void;
    confirm: (data: LeaveReviewModalData) => void;
}

const LeaveReviewModal = ({ open, onClose, confirm }: UpdateUserGeneralModalProps) => {
    const [submited, setSubmited] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const updateRating = useCallback(
        (_: React.SyntheticEvent<Element, Event>, newRating: number | null) => {
            if (newRating) {
                setRating(newRating);
            }
        },
        [setRating],
    );

    const submit = () => {
        if (!open) {
            return;
        }

        setSubmited(true);

        if (rating !== 0 && isNotEmpty(comment)) {
            confirm({ rating, comment });
        }
    };

    useEnterPress(submit);

    return (
        <GenericModal open={open} onClose={onClose}>
            <Typography variant="h5" component="h2" gutterBottom>
                Оставление отзыва
            </Typography>
            <FormControl fullWidth>
                <Stack spacing={2}>
                    <Rating precision={1} value={rating} onChange={updateRating} />
                    <ValidInput
                        label="Комментарий"
                        value={comment}
                        bindChange={setComment}
                        valid={isNotEmpty}
                        invalidText={invalidEmptyText}
                        showError={submited}
                    />
                    <Button variant="outlined" onClick={submit} startIcon={<SendIcon />}>
                        Отправить
                    </Button>
                </Stack>
            </FormControl>
        </GenericModal>
    );
};

export default LeaveReviewModal;
