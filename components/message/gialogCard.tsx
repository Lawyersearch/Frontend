import { Card, Stack, Typography } from "@mui/material";
import { Dialog } from "../../types/message";
import NextLink from "../../ui/components/NextLink";
import Avatar from "../../ui/components/Avatar";
import { emptyUserText } from "../../ui/strings";
import { mkUserProfileLink } from "../../ui/utils";

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
            ":hover": { bgcolor: "#aaa8", cursor: "pointer" },
            transition: ".25s background-color ease-out",
        }}
    >
        <Stack direction="row" spacing={1}>
            <NextLink href={mkUserProfileLink(dialog.memberId)}>
                <Avatar src={dialog.avatar} height={70} width={70} />
            </NextLink>
            <Stack justifyContent="space-around">
                <Typography fontWeight={600}>{dialog.memberName.trim() || emptyUserText}</Typography>
                <Typography>{dialog.memberName.trim() || emptyUserText}</Typography>
            </Stack>
        </Stack>
    </Card>
);

export default DialogCard;
