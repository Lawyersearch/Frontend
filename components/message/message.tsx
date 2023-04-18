import { Stack, Typography } from "@mui/material";
import fnsFormat from "date-fns/format";
import fnsSameDay from "date-fns/isSameDay";
import { MessageExtended } from "../../types/message";
import Avatar from "../../ui/components/Avatar";
import NextLink from "../../ui/components/NextLink";

interface MessageProps {
    message: MessageExtended;
}

const createDateString = (dateTime: string) => {
    const date = new Date(dateTime);
    const now = new Date();
    const formatString = fnsSameDay(date, now) ? "HH:mm:ss" : "HH:mm dd.MM.yyyy";

    return fnsFormat(date, formatString);
};

const Message = ({ message }: MessageProps) => (
    <Stack>
        <Stack direction="row" justifyContent="space-between">
            <NextLink href={`/userProfile/${message.senderId}`}>
                <Typography color="primary.main" fontWeight={500}>
                    {message.senderName}
                </Typography>
            </NextLink>
            <Typography color="gray">{createDateString(message.dateTime)}</Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
            <NextLink href={`/userProfile/${message.senderId}`}>
                <Avatar src={message.avatar} width={20} height={20} />
            </NextLink>
            <Typography>{message.text}</Typography>
        </Stack>
    </Stack>
);

export default Message;
