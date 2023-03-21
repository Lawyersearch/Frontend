import React from "react";
import { Stack, Typography } from "@mui/material";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { experienceString } from "../../../../utils/wordsEndings";
import ItemActions from "./ItemActions";

interface DatesWithDuration {
    startYear: string;
    endYear: string;
    duration: number;
}

interface ItemProps<T extends DatesWithDuration> {
    item: T;
    topText: string;
    middleText: string;
    showActions?: boolean;
    openRemoveModal?: (item: T) => void;
    openUpdateModal?: (item: T) => void;
}

const Item = ({ item, topText, middleText, showActions, openRemoveModal, openUpdateModal }: ItemProps<any>) => (
    <Stack width={350} justifyContent="space-evenly" bgcolor="background.paper" borderRadius="10px" p={1}>
        {showActions && (
            <ItemActions
                openUpdateModal={() => openUpdateModal && openUpdateModal(item)}
                openRemoveModal={() => openRemoveModal && openRemoveModal(item)}
            />
        )}
        <Typography variant="h5" color="text.primary">
            {topText}
        </Typography>
        <Typography variant="body1" color="text.primary">
            {middleText}
        </Typography>
        <Stack direction="row" spacing={1}>
            <Typography variant="body2" color="text.secondary">
                {format(new Date(item.startYear), "dd MMMM uuuu", { locale: ru })} —{" "}
                {format(new Date(item.endYear), "dd MMMM uuuu", { locale: ru })}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                ({experienceString(item.duration)})
            </Typography>
        </Stack>
    </Stack>
);

export default Item;
