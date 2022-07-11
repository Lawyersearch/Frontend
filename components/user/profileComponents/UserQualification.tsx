import React, { useState } from "react";
import { Card, SxProps, Typography } from "@mui/material";
import { Education } from "../../../types/user";
import Gallery from "../../../ui/Gallery";
import AddQualification from "./AddQualification";
import Qualification from "./Qualification";
import DeleteQualificationModal from "../../../ui/modal/DeleteQualificationModal";
import UpdateQualification from "./UpdateQualification";
import useRemoveQualification from "../../../hooks/user/useRemoveQualification";
import useUpdateQualification from "../../../hooks/user/useUpdateQualification";

interface UserQualificationProps {
  educations: Education[];
  isMyPage: boolean;
}

const UserQualification = ({
  educations,
  isMyPage,
  ...rest
}: UserQualificationProps & SxProps) => {
  const [eds, setEds] = useState(educations);
  const {
    removingItem,
    showConfirm,
    setHideConfirm,
    onConfirmDelete,
    openRemoveModal,
  } = useRemoveQualification(setEds);
  const { updateRef, openUpdateModal, onUpdate } =
    useUpdateQualification(setEds);

  return (
    <Card sx={{ ...rest, p: 1 }}>
      <Typography gutterBottom variant="h4" component="h3">
        Квалификация
      </Typography>
      <DeleteQualificationModal
        ed={removingItem}
        show={showConfirm}
        setHide={setHideConfirm}
        onConfirm={onConfirmDelete}
      />
      <Gallery height={250} spacing={2} pxPerClick={366}>
        <>
          {eds.map((ed) => (
            <Qualification
              key={ed.id}
              ed={ed}
              isMyPage={isMyPage}
              openRemoveModal={openRemoveModal}
              openUpdateModal={openUpdateModal}
            />
          ))}
          {isMyPage && <AddQualification setEds={setEds} />}
          {isMyPage && (
            <UpdateQualification
              ref={updateRef}
              updateQualification={onUpdate}
            />
          )}
        </>
      </Gallery>
    </Card>
  );
};

export default UserQualification;
