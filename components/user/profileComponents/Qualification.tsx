import React from "react";
import { IconButton, Stack, Typography } from "@mui/material";
import { experienceString } from "../../../utils/wordsEndings";
import { Education } from "../../../types/user";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

interface QualificationProps {
  ed: Education;
  isMyPage?: boolean;
  openRemoveModal?: (ed: Education) => void;
  openUpdateModal?: (ed: Education) => void;
}

const Qualification = ({
  ed,
  isMyPage,
  openRemoveModal,
  openUpdateModal,
}: QualificationProps) => {
  return (
    <Stack
      width={350}
      justifyContent="space-evenly"
      bgcolor="background.paper"
      borderRadius="10px"
      p={1}
    >
      <Stack
        direction="row"
        spacing={{ xs: 2, sm: 1 }}
        display={isMyPage ? "flex" : "none"}
        mt="-32px"
        mb="-48px"
        mx="8px"
        justifyContent={{ xs: "center", sm: "flex-end" }}
      >
        <IconButton
          onClick={() => openUpdateModal && openUpdateModal(ed)}
          color="info"
        >
          <EditIcon />
        </IconButton>
        <IconButton
          onClick={() => openRemoveModal && openRemoveModal(ed)}
          color="error"
        >
          <ClearIcon />
        </IconButton>
      </Stack>
      <Typography variant="h5" color="text.primary">
        {ed.direction}
      </Typography>
      <Typography variant="body1" color="text.primary">
        {ed.studyPlace}
      </Typography>
      <Stack direction="row" spacing={1}>
        <Typography variant="body2" color="text.secondary">
          {format(new Date(ed.startYear), "dd MMMM uuuu", { locale: ru })} —{" "}
          {format(new Date(ed.endYear), "dd MMMM uuuu", { locale: ru })}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ({experienceString(ed.duration)})
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Qualification;
