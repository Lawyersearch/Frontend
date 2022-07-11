import React, { useState } from "react";
import { Button, FormControl, Stack } from "@mui/material";
import ValidInput from "../../../ui/ValidInput";
import { isNotEmpty } from "../../../utils/validation";
import { notEmptyVerifyText } from "../../../ui/strings";
import { DatePicker } from "@mui/x-date-pickers";
import { Education } from "../../../types/user";
import { isBefore } from "date-fns";
import renderDateInput from "../../../utils/renderDateInput";

interface QualificationFormProps {
  qualification?: Education;
  onSubmit: (qualification: Partial<Education>) => void;
}
const QualificationForm = ({
  qualification,
  onSubmit,
}: QualificationFormProps) => {
  const [direction, setDirection] = useState<string>(
    qualification?.direction ?? ""
  );
  const [studyPlace, setStudyPlace] = useState<string>(
    qualification?.studyPlace ?? ""
  );
  const [startYear, setStartYear] = useState<Date | null>(
    qualification?.startYear ? new Date(qualification.startYear) : null
  );
  const [endYear, setEndYear] = useState<Date | null>(
    qualification?.endYear ? new Date(qualification.endYear) : null
  );
  const [submited, setSubmited] = useState(false);

  const submit = () => {
    if (
      !isNotEmpty(direction) ||
      !isNotEmpty(studyPlace) ||
      isNaN(+(startYear ?? NaN)) ||
      isNaN(+(endYear ?? NaN)) ||
      !isBefore(startYear!, endYear!)
    ) {
      setSubmited(true);
      return;
    }
    onSubmit({
      id: qualification?.id ?? undefined,
      direction,
      studyPlace,
      startYear: startYear!.toISOString(),
      endYear: endYear!.toISOString(),
    });
  };

  return (
    <FormControl fullWidth>
      <Stack spacing={4}>
        <ValidInput
          variant="standard"
          label="Направление"
          value={direction}
          bindChange={setDirection}
          valid={isNotEmpty}
          showError={submited}
          invalidText={notEmptyVerifyText}
        />
        <ValidInput
          variant="standard"
          label="Место обучения"
          value={studyPlace}
          bindChange={setStudyPlace}
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
          {qualification ? "Сохранить" : "Добавить"}
        </Button>
      </Stack>
    </FormControl>
  );
};

export default QualificationForm;
