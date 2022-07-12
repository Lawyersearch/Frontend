import React from "react";
import { WorkExpirience } from "../../../../types/user";
import Item from "../generic/Item";

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
}: ExperienceProps) => (
  <Item
    item={exp}
    topText={exp.position}
    middleText={exp.workPlace}
    showActions={isMyPage}
    openUpdateModal={openUpdateModal}
    openRemoveModal={openRemoveModal}
  />
);

export default Experience;
