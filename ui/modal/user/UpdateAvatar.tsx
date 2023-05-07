import { Typography, FormControl, Stack, Button, Autocomplete, TextField, Box, SxProps } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/Upload";
import FolderIcon from "@mui/icons-material/Folder";
import React, { useEffect, useMemo, useState } from "react";
import _last from "lodash/last";
import useEnterPress from "../../../hooks/utils/useEnterPress";
import GenericModal from "../Generic";

interface UpdateUserGeneralModalProps {
    open: boolean;
    onClose: () => void;
    confirm: (image: File) => void;
}

const commonImageStyles: SxProps = {
    maxWidth: "100%",
    maxHeight: "min(500px, 100vh - 200px)",
    objectFit: "contain",
    backgroundColor: "black",
    aspectRatio: "1",
};

const UpdateAvatarModal = ({ open, onClose, confirm }: UpdateUserGeneralModalProps) => {
    const [file, setFile] = useState<File | undefined>(undefined);
    const fileUrl = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);

    useEffect(() => {
        console.log(file);
    }, [file]);
    const submit = () => open && file && confirm(file);

    useEnterPress(submit);

    return (
        <GenericModal open={open} onClose={onClose}>
            <Typography variant="h5" component="h2" gutterBottom>
                Обновление фотографии
            </Typography>
            <FormControl fullWidth>
                <Stack spacing={2}>
                    {Boolean(file?.name) && <Typography>Выбран файл: {file!.name}</Typography>}
                    {fileUrl && (
                        <Box textAlign="center">
                            <Box
                                component="img"
                                src={fileUrl}
                                sx={{
                                    ...commonImageStyles,
                                    borderRadius: "50%",
                                    position: "absolute",
                                    zIndex: 1,
                                }}
                            />
                            <Box
                                component="img"
                                src={fileUrl}
                                sx={{
                                    ...commonImageStyles,
                                    filter: "blur(2px) opacity(0.3)",
                                }}
                            />
                        </Box>
                    )}
                    <Stack direction="row" spacing={1}>
                        <Button fullWidth component="label" startIcon={<FolderIcon />} variant="outlined">
                            Выбрать
                            <input
                                type="file"
                                accept="image/png, image/jpeg"
                                hidden
                                onChange={e => setFile(e.target.files?.[0])}
                            />
                        </Button>
                        <Button fullWidth variant="outlined" startIcon={<UploadFileIcon />} onClick={submit}>
                            Загрузить
                        </Button>
                    </Stack>
                </Stack>
            </FormControl>
        </GenericModal>
    );
};

export default UpdateAvatarModal;
