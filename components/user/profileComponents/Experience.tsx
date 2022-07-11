import React from "react";
import { IconButton, Stack, Typography } from "@mui/material";
import { experienceString } from "../../../utils/wordsEndings";
import { WorkExpirience } from "../../../types/user";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

interface ExperienceProps {
  exp: WorkExpirience;
  isMyPage?: boolean;
  openRemoveModal?: (exp: WorkExpirience) => void;
  openUpdateModal?: (exp: WorkExpirience) => void;
}

const Experience = ({
  exp,
  isMyPage,
  openRemoveModal,
  openUpdateModal,
}: ExperienceProps) => {
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
          onClick={() => openUpdateModal && openUpdateModal(exp)}
          color="info"
        >
          <EditIcon />
        </IconButton>
        <IconButton
          onClick={() => openRemoveModal && openRemoveModal(exp)}
          color="error"
        >
          <ClearIcon />
        </IconButton>
      </Stack>
      <Typography variant="h5" color="text.primary">
        {exp.position}
      </Typography>
      <Typography variant="body1" color="text.primary">
        {exp.workPlace}
      </Typography>
      <Stack direction="row" spacing={1}>
        <Typography variant="body2" color="text.secondary">
          {format(new Date(exp.startYear), "dd MMMM uuuu", { locale: ru })} —{" "}
          {format(new Date(exp.endYear), "dd MMMM uuuu", { locale: ru })}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ({experienceString(exp.duration)})
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Experience;
