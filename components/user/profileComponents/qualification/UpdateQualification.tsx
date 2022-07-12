import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { Typography } from "@mui/material";
import { useUpdateEducationMutation } from "../../../../services/education";
import { Education } from "../../../../types/user";
import QualificationForm from "./QualificationForm";
import { useBoolean } from "../../../../hooks/useBoolean";
import GenericModal from "../../../../ui/modal/GenericModal";

export type UpdateQualificationRef =
  | {
      open: (qualification: Education) => void;
    }
  | undefined;

interface UpdateQualificationProps {
  updateQualification: (qualification: Education) => void;
}

const UpdateQualification = forwardRef<
  UpdateQualificationRef,
  UpdateQualificationProps
>(({ updateQualification }, ref) => {
  const [show, setShow, setHide] = useBoolean(false);
  const qualificationRef = useRef<Education>();
  const [updateEducation, { isSuccess, data: education }] =
    useUpdateEducationMutation();
  useImperativeHandle(
    ref,
    () => ({
      open: (qualification: Education) => {
        qualificationRef.current = qualification;
        setShow();
      },
    }),
    [setShow]
  );

  useEffect(() => {
    if (isSuccess) {
      setHide();
      updateQualification(education!);
    }
  }, [isSuccess]);

  return (
    <GenericModal open={show} onClose={setHide}>
      <>
        <Typography variant="h5" component="h2" mb={4}>
          Изменение квалификации
        </Typography>
        <QualificationForm
          qualification={qualificationRef.current}
          onSubmit={updateEducation}
        />
      </>
    </GenericModal>
  );
});

export default UpdateQualification;
