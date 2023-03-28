import { Typography, FormControl, Stack, Button, Autocomplete, Checkbox, TextField } from "@mui/material";
import React, { HTMLAttributes, useCallback, useMemo, useState } from "react";
import _last from "lodash/last";
import { useAppSelector } from "../../../hooks/redux/useTypedRedux";
import useEnterPress from "../../../hooks/utils/useEnterPress";
import { Category } from "../../../types/category";
import GenericModal from "../Generic";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

interface UpdateUserGeneralModalProps {
    pickedCategories: Category[];
    open: boolean;
    onClose: () => void;
    confirm: (data: number[]) => void;
}

const UpdateUserCategoriesModal = ({ pickedCategories, open, onClose, confirm }: UpdateUserGeneralModalProps) => {
    const allCategories = useAppSelector(state => state.ui.categoryView ?? []);
    const options = useMemo(
        () => allCategories.map(({ id: value, label, parents }) => ({ label, value, parent: _last(parents)?.label })),
        [allCategories],
    );
    const [value, setValue] = useState(pickedCategories.map(({ id: value, name: label }) => ({ label, value })));

    const renderOption = useCallback(
        (props: HTMLAttributes<HTMLLIElement>, option: { label: string }, { selected }: { selected: boolean }) => (
            <li {...props}>
                <Checkbox
                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                    style={{ marginRight: 0 }}
                    checked={selected}
                />
                {option.label}
            </li>
        ),
        [],
    );

    const submit = () => {
        open && confirm(value.map(category => category.value));
    };

    useEnterPress(submit);

    return (
        <GenericModal open={open} onClose={onClose}>
            <>
                <Typography variant="h5" component="h2" gutterBottom>
                    Обновление категорий
                </Typography>
                <FormControl fullWidth>
                    <Stack spacing={2} width={{ xs: "min(80vw, 100%)", md: "min(80vw, 1100px)" }}>
                        <Autocomplete
                            multiple
                            value={value}
                            onChange={(_, newValue) => setValue(newValue)}
                            options={options}
                            groupBy={(option: any) => option.parent ?? ""}
                            disableCloseOnSelect
                            getOptionLabel={option => option.label}
                            isOptionEqualToValue={(option, { value }) => option.value === value}
                            renderOption={renderOption}
                            renderInput={params => <TextField {...params} label="Категори" />}
                        />
                        <Button variant="outlined" onClick={submit}>
                            Сохранить
                        </Button>
                    </Stack>
                </FormControl>
            </>
        </GenericModal>
    );
};

export default UpdateUserCategoriesModal;
