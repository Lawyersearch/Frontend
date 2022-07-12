import React from "react";
import { Education } from "../../../../types/user";
import ItemForm from "../generic/ItemForm";

interface QualificationFormProps {
  qualification?: Education;
  onSubmit: (qualification: Partial<Education>) => void;
}
const QualificationForm = ({
  qualification,
  onSubmit,
}: QualificationFormProps) => (
  <ItemForm
    topTitle="Направление"
    middleTitle="Место обучения"
    onSubmit={(item) =>
      onSubmit({
        id: item.id,
        direction: item.topText,
        studyPlace: item.middleText,
        startYear: item.startYear,
        endYear: item.endYear,
      })
    }
    initial={
      qualification
        ? {
            id: qualification.id,
            topText: qualification.direction,
            middleText: qualification.studyPlace,
            startYear: qualification.startYear,
            endYear: qualification.endYear,
          }
        : undefined
    }
  />
);

export default QualificationForm;
