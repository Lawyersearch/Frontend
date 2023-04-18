import { Card, Stack, Typography } from "@mui/material";
import { Dialog } from "../../types/message";
import NextLink from "../../ui/components/NextLink";
import Avatar from "../../ui/components/Avatar";

interface DialogProps {
    dialog: Dialog;
    onDialogClick: (dialogId: string) => void;
}

const DialogCard = ({ dialog, onDialogClick }: DialogProps) => (
    <Card
        onClick={() => onDialogClick(dialog.id)}
        sx={{
            p: 1,
            borderBottom: "1px solid black",
            ":hover": { bgcolor: "#aaa8" },
            transition: ".25s background-color ease-out",
        }}
    >
        <Stack direction="row" spacing={1}>
            <NextLink href={`/userProfile/${dialog.memberId}`}>
                <Avatar src={dialog.avatar} height={70} width={70} />
            </NextLink>
            <Stack justifyContent="space-around">
                <Typography fontWeight={600}>{dialog.senderName}</Typography>
                <Typography>{dialog.senderName}</Typography>
            </Stack>
        </Stack>
    </Card>
);

export default DialogCard;
