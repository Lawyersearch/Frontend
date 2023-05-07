import { Typography, FormControl, Stack, Button, Grid, IconButton } from "@mui/material";
import { isEmpty, uniqBy } from "lodash";
import FileIcon from "@mui/icons-material/InsertDriveFile";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import React, { useCallback, useEffect, useState } from "react";
import useEnterPress from "../../../hooks/utils/useEnterPress";
import GenericModal from "../Generic";
import mime from "../../../utils/mime";

interface UploadDocumentModalProps {
    files: File[];
    setFiles: React.Dispatch<React.SetStateAction<File[]>>;
    open: boolean;
    onClose: () => void;
}

const UploadDocumentModal = ({ files, setFiles, open, onClose }: UploadDocumentModalProps) => {
    const addFiles = useCallback(
        (ev: React.ChangeEvent<HTMLInputElement>) => {
            if (isEmpty(ev.target.files)) {
                return;
            }

            const newFiles = Array.from(ev.target.files!);

            setFiles(files => uniqBy(files.concat(newFiles), "name"));
            onClose();
        },
        [setFiles],
    );

    const removeFile = useCallback(
        (fileName: string) => {
            setFiles(files => files.filter(file => file.name !== fileName));
        },
        [setFiles],
    );

    return (
        <GenericModal open={open} onClose={onClose}>
            <Typography variant="h5" component="h2" gutterBottom>
                Прикрепление файлов
            </Typography>
            <FormControl fullWidth>
                <Stack spacing={1.5}>
                    {files.map(file => (
                        <Grid key={file.name} container spacing={0.5} alignItems="center">
                            <Grid item xs={2}>
                                <FileIcon color="primary" />
                            </Grid>
                            <Grid item xs={8} p={0}>
                                <Typography>{file.name}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <IconButton onClick={() => removeFile(file.name)}>
                                    <DeleteIcon color="error" />
                                </IconButton>
                            </Grid>
                        </Grid>
                    ))}
                </Stack>
                <Stack direction="row" spacing={1}>
                    <Button fullWidth component="label" startIcon={<AddIcon />} variant="outlined">
                        Добавить
                        <input type="file" multiple accept={mime.document} hidden onChange={addFiles} />
                    </Button>
                </Stack>
            </FormControl>
        </GenericModal>
    );
};

export default UploadDocumentModal;
