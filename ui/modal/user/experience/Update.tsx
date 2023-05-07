import React, { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { Typography } from "@mui/material";
import { WorkExpirience } from "../../../../types/user";
import useBoolean from "../../../../hooks/utils/useBoolean";
import { useUpdateWorkExperienceMutation } from "../../../../services/workExperience";
import ExperienceForm from "../../../../components/user/profileComponents/experience/ExperienceForm";
import GenericModal from "../../Generic";

export type UpdateQualificationRef =
    | {
          open: (workExp: WorkExpirience) => void;
      }
    | undefined;

interface UpdateQualificationProps {
    updateWorkExp: (workExp: WorkExpirience) => void;
}

const UpdateQualification = forwardRef<UpdateQualificationRef, UpdateQualificationProps>(({ updateWorkExp }, ref) => {
    const [show, setShow, setHide] = useBoolean(false);
    const workExpRef = useRef<WorkExpirience>();
    const [updateEducation, { isSuccess, data: workExp }] = useUpdateWorkExperienceMutation();
    useImperativeHandle(
        ref,
        () => ({
            open: (workExp: WorkExpirience) => {
                workExpRef.current = workExp;
                setShow();
            },
        }),
        [setShow],
    );

    useEffect(() => {
        if (isSuccess) {
            setHide();
            updateWorkExp(workExp!);
        }
    }, [isSuccess]);

    return (
        <GenericModal open={show} onClose={setHide}>
            <Typography variant="h5" component="h2" mb={4}>
                Изменение места работы
            </Typography>
            <ExperienceForm workExp={workExpRef.current} onSubmit={updateEducation} />
        </GenericModal>
    );
});

export default UpdateQualification;
