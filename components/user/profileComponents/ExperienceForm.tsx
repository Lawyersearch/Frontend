import React, { useState } from "react";
import { Button, FormControl, Stack } from "@mui/material";
import ValidInput from "../../../ui/ValidInput";
import { isNotEmpty } from "../../../utils/validation";
import { notEmptyVerifyText } from "../../../ui/strings";
import { DatePicker } from "@mui/x-date-pickers";
import renderDateInput from "../../../utils/renderDateInput";
import { WorkExpirience } from "../../../types/user";
import { isBefore } from "date-fns";

interface ExperienceFormProps {
  workExp?: WorkExpirience;
  onSubmit: (workExp: Partial<WorkExpirience>) => void;
}

const ExperienceForm = ({ workExp, onSubmit }: ExperienceFormProps) => {
  const [position, setPosition] = useState<string>(workExp?.position ?? "");
  const [workPlace, setWorkPlace] = useState<string>(workExp?.workPlace ?? "");
  const [startYear, setStartYear] = useState<Date | null>(
    workExp?.startYear ? new Date(workExp.startYear) : null
  );
  const [endYear, setEndYear] = useState<Date | null>(
    workExp?.endYear ? new Date(workExp.endYear) : null
  );
  const [submited, setSubmited] = useState(false);

  const submit = () => {
    if (
      !isNotEmpty(position) ||
      !isNotEmpty(workPlace) ||
      isNaN(+(startYear ?? NaN)) ||
      isNaN(+(endYear ?? NaN)) ||
      !isBefore(startYear!, endYear!)
    ) {
      setSubmited(true);
      return;
    }
    onSubmit({
      id: workExp?.id ?? undefined,
      position,
      workPlace,
      startYear: startYear!.toISOString(),
      endYear: endYear!.toISOString(),
    });
  };

  return (
    <FormControl fullWidth>
      <Stack spacing={4}>
        <ValidInput
          variant="standard"
          label="Должность"
          value={position}
          bindChange={setPosition}
          valid={isNotEmpty}
          showError={submited}
          invalidText={notEmptyVerifyText}
        />
        <ValidInput
          variant="standard"
          label="Место работы"
          value={workPlace}
          bindChange={setWorkPlace}
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
            inputFormat="dd/MM/yyyy"
            value={startYear}
            disableFuture={true}
            maxDate={endYear ?? undefined}
            desktopModeMediaQuery="@media screen and (min-width: 900px)"
            onChange={setStartYear}
            renderInput={renderDateInput}
          />
          <DatePicker
            label="Дата конца"
            inputFormat="dd/MM/yyyy"
            value={endYear}
            disableFuture={true}
            minDate={startYear ?? undefined}
            desktopModeMediaQuery="@media screen and (min-width: 900px)"
            onChange={setEndYear}
            renderInput={renderDateInput}
          />
        </Stack>
        <Button variant="contained" onClick={submit}>
          {workExp ? "Сохранить" : "Добавить"}
        </Button>
      </Stack>
    </FormControl>
  );
};

export default ExperienceForm;
