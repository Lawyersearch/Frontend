import { IconButton, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import GenericModal from "../../../../ui/modal/GenericModal";

interface AddCardProps {
    show: boolean;
    setShow: () => void;
    setHide: () => void;
    children: React.ReactElement | React.ReactElement[];
}

const AddItem = ({ show, setShow, setHide, children }: AddCardProps) => {
    return (
        <Stack
            key={0}
            width={350}
            bgcolor="background.paper"
            borderRadius="10px"
            p={1}
            justifyContent="center"
            alignItems="center"
        >
            <IconButton onClick={setShow}>
                <AddIcon color="success" sx={{ width: 100, height: 100 }} />
            </IconButton>

            <GenericModal open={show} onClose={setHide}>
                <>{children}</>
            </GenericModal>
        </Stack>
    );
};

export default AddItem;
