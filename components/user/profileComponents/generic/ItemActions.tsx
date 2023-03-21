import React from "react";
import { IconButton, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";

interface ItemActionsProps {
    openUpdateModal?: () => void;
    openRemoveModal?: () => void;
}

const ItemActions = ({ openUpdateModal, openRemoveModal }: ItemActionsProps) => (
    <Stack
        direction="row"
        spacing={{ xs: 2, sm: 1 }}
        mt="-32px"
        mb="-48px"
        mx="8px"
        justifyContent={{ xs: "center", sm: "flex-end" }}
    >
        <IconButton onClick={openUpdateModal} color="info">
            <EditIcon />
        </IconButton>
        <IconButton onClick={openRemoveModal} color="error">
            <ClearIcon />
        </IconButton>
    </Stack>
);

export default ItemActions;
