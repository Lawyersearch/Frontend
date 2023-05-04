import React from "react";
import { Stack, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Dialog } from "../../types/message";
import Avatar from "../../ui/components/Avatar";
import { emptyUserText } from "../../ui/strings";

interface DialogHeaderProps {
    dialog: Dialog;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

const DialogHeader = ({ dialog, searchQuery, setSearchQuery }: DialogHeaderProps) => {
    return (
        <Stack
            direction="row"
            alignItems="center"
            px={3}
            borderBottom="1px solid"
            borderColor="primary.main"
            spacing={2}
        >
            <Avatar src={dialog.avatar} height={64} width={64} />
            <Stack justifyContent="space-around">
                <Typography fontWeight={600}>{dialog.memberName.trim() || emptyUserText}</Typography>
                <Typography>{dialog.memberName.trim() || emptyUserText}</Typography>
            </Stack>
            <Stack direction="row" ml="auto !important" spacing={2}>
                <SearchIcon fontSize="medium" />
                <MoreVertIcon />
            </Stack>
        </Stack>
    );
};

export default DialogHeader;
