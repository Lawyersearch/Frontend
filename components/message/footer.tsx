import React, { useCallback, useState } from "react";
import { InputBase, Stack } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import useEventListener from "../../hooks/utils/useEventListener";

interface DialogFooterProps {
    onSubmit: (message: string) => void;
}

const DialogFooter = ({ onSubmit }: DialogFooterProps) => {
    const [value, setValue] = useState("");
    const submit = useCallback(() => {
        onSubmit(value);
        setValue("");
    }, [value]);

    useEventListener("keydown", ev => {
        if (ev.key === "Enter" && (ev.metaKey || ev.ctrlKey || ev.altKey)) {
            submit();
        }
    });

    return (
        <Stack
            direction="row"
            alignItems="end"
            spacing={2}
            mt="auto"
            px={3}
            py={1}
            borderTop="1px solid"
            borderColor="primary.main"
        >
            <AttachFileIcon sx={{ mb: "4px !important" }} />
            <InputBase
                autoFocus={true}
                placeholder="Введите сообщение..."
                fullWidth
                multiline
                value={value}
                onChange={ev => setValue(ev.target.value)}
            />
            <SendIcon sx={{ mb: "4px !important" }} />
        </Stack>
    );
};

export default DialogFooter;
