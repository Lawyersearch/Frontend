import { Typography, FormControl, Stack, Button, InputLabel, Select, MenuItem } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import React, { useState } from "react";
import useEnterPress from "../../../hooks/utils/useEnterPress";
import { UpdateUserGeneralRequest } from "../../../services/user";
import { isNotEmpty } from "../../../utils/validation";
import { invalidEmptyText } from "../../strings";
import ValidInput from "../../components/ValidInput";
import GenericModal from "../Generic";
import { UserRole } from "../../../types/user";

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
    const [role, setRole] = useState(userData.role ?? UserRole.CLIENT);

    const submit = () => {
        if (!open) {
            return;
        }

        setSubmited(true);

        if ([lastName, firstName].every(isNotEmpty)) {
            confirm({ lastName, firstName, middleName, description, role });
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
                            invalidText={invalidEmptyText}
                            showError={submited}
                        />
                        <ValidInput
                            label="Имя"
                            value={firstName}
                            bindChange={setFirstName}
                            valid={isNotEmpty}
                            invalidText={invalidEmptyText}
                            showError={submited}
                        />
                        <ValidInput label="Отчество" value={middleName} bindChange={setMiddleName} />
                        <ValidInput label="Описание" value={description} bindChange={setDescription} multiline />
                        <FormControl>
                            <InputLabel id="user-role-label">Роль</InputLabel>
                            <Select
                                labelId="user-role-label"
                                value={role}
                                label="Роль"
                                onChange={event => setRole(+event.target.value)}
                            >
                                <MenuItem value={0}>Заказчик</MenuItem>
                                <MenuItem value={1}>Исполнитель</MenuItem>
                            </Select>
                        </FormControl>
                        <Button variant="outlined" onClick={submit} startIcon={<SaveIcon />}>
                            Сохранить
                        </Button>
                    </Stack>
                </FormControl>
            </>
        </GenericModal>
    );
};

export default UpdateUserGeneralModal;
