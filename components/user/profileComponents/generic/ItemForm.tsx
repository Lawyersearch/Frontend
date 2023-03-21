import React, { useState } from "react";
import { Button, FormControl, Stack } from "@mui/material";
import ValidInput from "../../../../ui/ValidInput";
import { isNotEmpty } from "../../../../utils/validation";
import { notEmptyVerifyText } from "../../../../ui/strings";
import { DatePicker } from "@mui/x-date-pickers";
import renderDateInput from "../../../../utils/renderDateInput";
import { isBefore } from "date-fns";
import { GenericItem } from "../../../../types/genericItem";

interface ItemFormProps {
    initial?: GenericItem;
    topTitle: string;
    middleTitle: string;
    onSubmit: (item: GenericItem) => void;
}

const ItemForm = ({ initial, onSubmit, topTitle, middleTitle }: ItemFormProps) => {
    const [top, setTop] = useState<string>(initial?.topText ?? "");
    const [middle, setMiddle] = useState<string>(initial?.middleText ?? "");
    const [startYear, setStartYear] = useState<Date | null>(initial?.startYear ? new Date(initial.startYear) : null);
    const [endYear, setEndYear] = useState<Date | null>(initial?.endYear ? new Date(initial.endYear) : null);
    const [submited, setSubmited] = useState(false);

    const submit = () => {
        if (
            !isNotEmpty(top) ||
            !isNotEmpty(middle) ||
            isNaN(+(startYear ?? NaN)) ||
            isNaN(+(endYear ?? NaN)) ||
            !isBefore(startYear!, endYear!)
        ) {
            setSubmited(true);
            return;
        }
        onSubmit({
            id: initial?.id ?? undefined,
            topText: top,
            middleText: middle,
            startYear: startYear!.toISOString(),
            endYear: endYear!.toISOString(),
        });
    };

    return (
        <FormControl fullWidth>
            <Stack spacing={4}>
                <ValidInput
                    variant="standard"
                    label={topTitle}
                    value={top}
                    bindChange={setTop}
                    valid={isNotEmpty}
                    showError={submited}
                    invalidText={notEmptyVerifyText}
                />
                <ValidInput
                    variant="standard"
                    label={middleTitle}
                    value={middle}
                    bindChange={setMiddle}
                    valid={isNotEmpty}
                    showError={submited}
                    invalidText={notEmptyVerifyText}
                />
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={{ xs: 2, sm: 1 }}
                    sx={{
                        "> div": { width: { xs: 1, sm: 0.5 } },
                    }}
                >
                    <DatePicker
                        label="Дата начала"
                        value={startYear}
                        disableFuture={true}
                        maxDate={endYear ?? undefined}
                        desktopModeMediaQuery="@media screen and (min-width: 900px)"
                        onChange={setStartYear}
                        renderInput={renderDateInput}
                    />
                    <DatePicker
                        label="Дата конца"
                        value={endYear}
                        disableFuture={true}
                        minDate={startYear ?? undefined}
                        desktopModeMediaQuery="@media screen and (min-width: 900px)"
                        onChange={setEndYear}
                        renderInput={renderDateInput}
                    />
                </Stack>
                <Button variant="contained" onClick={submit}>
                    {initial ? "Сохранить" : "Добавить"}
                </Button>
            </Stack>
        </FormControl>
    );
};

export default ItemForm;
