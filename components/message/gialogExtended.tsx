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

interface DialogExtendedProps {
    dialog: Dialog;
}

const sendMessage = (dialogId: string, message: string) =>
    fetch(`${process.env.BACK_SERVER_API}/message/${dialogId}`, {
        method: "POST",
        headers: {
            Authorization: "Bearer " + Cookie.get("token"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: message }),
    }).then(res => res.json());

const DialogExtended = ({ dialog }: DialogExtendedProps) => {
    const self = useAppSelector(state => state.user.self!);
    const { data, isLoading, isSuccess, error } = useGetMessagesQuery(dialog.id);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState([] as Array<MessageExtended>);
    const [searchQuery, setSearchQuery] = useState("");
    const onMessageSent = useCallback(
        (message: string) => {
            const newMessage: MessageExtended = {
                id: crypto.randomKey(),
                text: message,
                senderId: self.id,
                status: "pending",
            };
            setMessages(messages => [...messages, newMessage]);
            scrollRef.current?.scrollIntoView();
            sendMessage(dialog.id, message)
                .then(() => {
                    delete newMessage.status;
                    newMessage.dateTime = String(new Date());
                })
                .catch(() => {
                    newMessage.status = "error";
                })
                .finally(() => {
                    setMessages(messages => {
                        const deletingIndex = messages.findIndex(message => message === newMessage);

                        return [...messages.slice(0, deletingIndex), newMessage, ...messages.slice(deletingIndex + 1)];
                    });
                });
        },
        [setMessages],
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
                <Stack px={2} overflow="scroll">
                    {messages.map(message => (
                        <Message key={message.id} message={message} dialog={dialog} self={self} />
                    ))}
                    <Box key={0} ref={scrollRef} />
                </Stack>
            </NetHandler>
            <DialogFooter onSubmit={onMessageSent} />
        </Stack>
    );
};

export default DialogExtended;
