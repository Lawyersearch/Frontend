import { useCallback, useEffect, useRef, useState } from "react";
import { Box, Stack } from "@mui/material";
import Cookie from "js-cookie";
import { Dialog, MessageExtended } from "../../types/message";
import DialogHeader from "./header";
import { useAppSelector } from "../../hooks/redux/useTypedRedux";
import { useGetMessagesQuery } from "../../services/messages";
import NetHandler from "../../ui/components/NetHandler";
import DialogFooter from "./footer";
import * as crypto from "../../utils/crypto";
import Message from "./message";
import { hideScrollbars } from "../../ui/utils";
import AttachDocumentModal from "../../ui/modal/message/AttachDocument";
import useBoolean from "../../hooks/utils/useBoolean";

interface DialogExtendedProps {
    dialog: Dialog;
}

const createMessageFormData = (files: File[] = []) => {
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
        formData.append("uploadedFiles", files[i]);
    }

    return formData;
};

const sendMessage = (dialogId: string, text: string, files: File[]) =>
    fetch(`${process.env.BACK_SERVER_API}/message/${dialogId}?text=${text}`, {
        method: "POST",
        headers: {
            Authorization: "Bearer " + Cookie.get("token"),
        },
        body: createMessageFormData(files),
    }).then(res => res.json());

const DialogExtended = ({ dialog }: DialogExtendedProps) => {
    const self = useAppSelector(state => state.user.self!);
    const { data, isLoading, isSuccess, error } = useGetMessagesQuery(dialog.id);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [filesModalOpen, openFilesModal, closeFilesModal] = useBoolean(false);
    const [files, setFiles] = useState<File[]>([]);
    const [messages, setMessages] = useState([] as Array<MessageExtended>);
    const [searchQuery, setSearchQuery] = useState("");
    const onMessageSent = useCallback(
        (message: string) => {
            const sendingFiles = files;
            const pendingFiles = sendingFiles.map(file => ({ name: file.name, url: URL.createObjectURL(file) }));
            const newMessage: MessageExtended = {
                id: crypto.randomKey(),
                text: message,
                files: pendingFiles,
                senderId: self.id,
                status: "pending",
            };
            setMessages(messages => [...messages, newMessage]);
            setFiles([]);
            scrollRef.current?.scrollIntoView();
            sendMessage(dialog.id, message, sendingFiles)
                .then(() => {
                    delete newMessage.status;
                    newMessage.dateTime = String(new Date());
                })
                .catch(() => {
                    newMessage.status = "error";
                })
                .finally(() =>
                    setMessages(messages => {
                        const deletingIndex = messages.findIndex(message => message === newMessage);

                        return [...messages.slice(0, deletingIndex), newMessage, ...messages.slice(deletingIndex + 1)];
                    }),
                );
        },
        [setMessages, files, setFiles],
    );

    useEffect(() => {
        if (isSuccess) {
            setMessages(data);
        }
    }, [isSuccess]);

    return (
        <Stack height="inherit">
            <DialogHeader dialog={dialog} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <NetHandler isLoading={isLoading} isSuccess={isSuccess} error={error} h="50vh - 177px" w="9 / 12 * 100vw">
                <Stack px={2} sx={{ overflowY: "scroll", ...hideScrollbars }}>
                    {messages.map(message => (
                        <Message key={message.id} message={message} dialog={dialog} self={self} />
                    ))}
                    <Box key={0} ref={scrollRef} />
                </Stack>
            </NetHandler>
            <DialogFooter filesCount={files.length} onOpenFilesModal={openFilesModal} onSubmit={onMessageSent} />
            <AttachDocumentModal files={files} setFiles={setFiles} open={filesModalOpen} onClose={closeFilesModal} />
        </Stack>
    );
};

export default DialogExtended;
