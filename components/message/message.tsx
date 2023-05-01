import { CircularProgress, Stack, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import fnsFormat from "date-fns/format";
import fnsSameDay from "date-fns/isSameDay";
import { Dialog, MessageExtended } from "../../types/message";
import Avatar from "../../ui/components/Avatar";
import NextLink from "../../ui/components/NextLink";
import { User } from "../../types/user";
import { mkUserName } from "../../utils/user";

interface MessageProps {
    dialog: Dialog;
    message: MessageExtended;
    self: User;
}

const createDateString = (dateTime: string) => {
    const date = new Date(dateTime);
    const now = new Date();
    const formatString = fnsSameDay(date, now) ? "HH:mm:ss" : "HH:mm dd.MM.yyyy";

    return fnsFormat(date, formatString);
};

const Message = ({ message, dialog, self }: MessageProps) => (
    <Stack>
        <Stack direction="row" justifyContent="space-between">
            <NextLink href={`/userProfile/${message.senderId}`}>
                <Typography color="primary.main" fontWeight={500}>
                    {message.senderId === self.id ? mkUserName(self, { middleName: false }) : dialog.memberName}
                </Typography>
            </NextLink>
            {message.status === "pending" && <CircularProgress size={30} />}
            {message.status === "error" && <ErrorIcon sx={{ height: 30, width: 30 }} color="error" />}
            {Boolean(message.dateTime) && <Typography color="gray">{createDateString(message.dateTime!)}</Typography>}
        </Stack>
        <Stack direction="row" spacing={2}>
            <NextLink href={`/userProfile/${message.senderId}`} sx={{ flexShrink: 0 }}>
                <Avatar width={40} height={40} src={message.senderId === self.id ? self.avatar : dialog.avatar} />
            </NextLink>
            <Typography whiteSpace="pre-line">{message.text}</Typography>
        </Stack>
    </Stack>
);

export default Message;
