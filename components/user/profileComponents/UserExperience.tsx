import React, { useState } from "react";
import { Card, SxProps, Typography } from "@mui/material";
import { WorkExpirience } from "../../../types/user";
import Gallery from "../../../ui/Gallery";
import AddWorkExperience from "./experience/AddWorkExperience";
import DeleteExperienceModal from "../../../ui/modal/DeleteExperienceModal";
import Experience from "./experience/Experience";
import useRemoveWorkExp from "../../../hooks/user/useRemoveWorkExp";
import useUpdateWorkExp from "../../../hooks/user/useUpdateWorkExp";
import UpdateWorkExp from "./experience/UpdateWorkExp";

interface UserExperienceProps {
  isMyPage: boolean;
  workExpiriences: WorkExpirience[];
}

const UserExperience = ({
  workExpiriences,
  isMyPage,
  ...rest
}: UserExperienceProps & SxProps) => {
  const [workExp, setWorkExp] = useState(workExpiriences);
  const {
    removingItem,
    showConfirm,
    setHideConfirm,
    onConfirmDelete,
    openRemoveModal,
  } = useRemoveWorkExp(setWorkExp);
  const { updateRef, openUpdateModal, onUpdate } = useUpdateWorkExp(setWorkExp);

  return (
    <Card sx={{ ...rest, p: 1 }}>
      <Typography gutterBottom variant="h4" component="h3">
        Опыт работы
      </Typography>
      <DeleteExperienceModal
        exp={removingItem}
        show={showConfirm}
        setHide={setHideConfirm}
        onConfirm={onConfirmDelete}
      />
      <Gallery height={250} spacing={2} pxPerClick={366}>
        <>
          {workExp.map((exp) => (
            <Experience
              key={exp.id}
              exp={exp}
              isMyPage={isMyPage}
              openRemoveModal={openRemoveModal}
              openUpdateModal={openUpdateModal}
            />
          ))}
          {isMyPage && <AddWorkExperience setWorkExp={setWorkExp} />}
          {isMyPage && (
            <UpdateWorkExp ref={updateRef} updateWorkExp={onUpdate} />
          )}
        </>
      </Gallery>
    </Card>
  );
};

export default UserExperience;
