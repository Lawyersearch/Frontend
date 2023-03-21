import React from "react";
import { WorkExpirience } from "../../../../types/user";
import ItemForm from "../generic/ItemForm";

interface ExperienceFormProps {
    workExp?: WorkExpirience;
    onSubmit: (workExp: Partial<WorkExpirience>) => void;
}

const ExperienceForm = ({ workExp, onSubmit }: ExperienceFormProps) => (
    <ItemForm
        topTitle="Должность"
        middleTitle="Место работы"
        onSubmit={item =>
            onSubmit({
                id: item.id,
                position: item.topText,
                workPlace: item.middleText,
                startYear: item.startYear,
                endYear: item.endYear,
            })
        }
        initial={
            workExp
                ? {
                      id: workExp.id,
                      topText: workExp.position,
                      middleText: workExp.workPlace,
                      startYear: workExp.startYear,
                      endYear: workExp.endYear,
                  }
                : undefined
        }
    />
);

export default ExperienceForm;
