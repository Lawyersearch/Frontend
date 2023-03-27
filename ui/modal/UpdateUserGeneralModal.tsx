import { Typography, FormControl, Stack, Button } from "@mui/material";
import React, { useState } from "react";
import useEnterPress from "../../hooks/useEnterPress";
import { UpdateUserGeneralRequest } from "../../services/user";
import { isNotEmpty } from "../../utils/validation";
import { invalidFirstNameText, invalidLastNameText } from "../strings";
import ValidInput from "../ValidInput";
import GenericModal from "./GenericModal";

interface UpdateUserGeneralModalProps {
    userData: Partial<UpdateUserGeneralRequest>;
    open: boolean;
    onClose: () => void;
    confirm: (data: UpdateUserGeneralRequest) => void;
}

const UpdateUserGeneralModal = ({ userData, open, onClose, confirm }: UpdateUserGeneralModalProps) => {
    const [submited, setSubmited] = useState(false);
    const [lastName, setLastName] = useState(userData.lastName ?? "");
    const [firstName, setFirstName] = useState(userData.firstName ?? "");
    const [middleName, setMiddleName] = useState(userData.middleName ?? "");
    const [description, setDescription] = useState(userData.description ?? "");

    const submit = () => {
        setSubmited(true);

        if ([lastName, firstName].every(isNotEmpty)) {
            confirm({ lastName, firstName, middleName, description });
        }
    };

    useEnterPress(submit);

    return (
        <GenericModal open={open} onClose={onClose}>
            <>
                <Typography variant="h5" component="h2" gutterBottom>
                    Обновление информации о профиле
                </Typography>
                <FormControl fullWidth>
                    <Stack spacing={2}>
                        <ValidInput
                            label="Фамилия"
                            value={lastName}
                            bindChange={setLastName}
                            valid={isNotEmpty}
                            invalidText={invalidLastNameText}
                            showError={submited}
                        />
                        <ValidInput
                            label="Имя"
                            value={firstName}
                            bindChange={setFirstName}
                            valid={isNotEmpty}
                            invalidText={invalidFirstNameText}
                            showError={submited}
                        />
                        <ValidInput label="Отчество" value={middleName} bindChange={setMiddleName} />
                        <ValidInput label="Описание" value={middleName} bindChange={setDescription} multiline />
                        <Button variant="outlined" onClick={submit}>
                            Сохранить
                        </Button>
                    </Stack>
                </FormControl>
            </>
        </GenericModal>
    );
};

export default UpdateUserGeneralModal;
