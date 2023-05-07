import React, { useCallback, useState } from "react";
import { Badge, IconButton, InputBase, Stack } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import useEventListener from "../../hooks/utils/useEventListener";

interface DialogFooterProps {
    filesCount: number;
    onSubmit: (message: string) => void;
    onOpenFilesModal: () => void;
}

const DialogFooter = ({ filesCount, onSubmit, onOpenFilesModal }: DialogFooterProps) => {
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
            <IconButton onClick={onOpenFilesModal}>
                <Badge badgeContent={filesCount} color="primary" sx={{ display: filesCount ? "block" : "contents" }}>
                    <AttachFileIcon />
                </Badge>
            </IconButton>
            <InputBase
                autoFocus={true}
                placeholder="Введите сообщение..."
                fullWidth
                multiline
                value={value}
                onChange={ev => setValue(ev.target.value)}
            />
            <IconButton onClick={submit}>
                <SendIcon />
            </IconButton>
        </Stack>
    );
};

export default DialogFooter;
