import React from "react";
import { Education } from "../../../../types/user";
import Item from "../generic/Item";

interface QualificationProps {
    ed: Education;
    isMyPage?: boolean;
    openRemoveModal?: (ed: Education) => void;
    openUpdateModal?: (ed: Education) => void;
}

const Qualification = ({ ed, isMyPage, openRemoveModal, openUpdateModal }: QualificationProps) => (
    <Item
        item={ed}
        topText={ed.direction}
        middleText={ed.studyPlace}
        showActions={isMyPage}
        openUpdateModal={openUpdateModal}
        openRemoveModal={openRemoveModal}
    />
);
export default Qualification;
