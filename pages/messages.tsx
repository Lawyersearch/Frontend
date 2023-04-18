import { GetServerSideProps } from "next";
import { wrapper } from "../store";
import { useState } from "react";
import { Dialog } from "../types/message";
import { queryDialogs } from "../utils/query";
import { Grid, Stack, Typography } from "@mui/material";
import DialogCard from "../components/message/gialogCard";
import DialogExtended from "../components/message/gialogExtended";

interface MessagesPageProps {
    dialogs: Dialog[];
}

const fakeDialog: Dialog = {
    id: "dialogId",
    userId: "userId",
    memberId: "memberId",
    createdDate: new Date().toString(),
    orderId: "orderId",
    isClosed: false,
    senderName: "senderName",
    avatar: "",
};

const fakeDialogs = Array(20).fill(fakeDialog);

const MessagesPage = ({ dialogs }: MessagesPageProps) => {
    const [dialogId, setDialogId] = useState<string | null>(null);

    return (
        <Grid container height="calc(100vh - 72px)">
            <Grid item xs={3} height="inherit" overflow="scroll">
                <Stack>
                    {dialogs.map(dialog => (
                        <DialogCard key={dialog.id} dialog={dialog} onDialogClick={setDialogId} />
                    ))}
                </Stack>
            </Grid>
            <Grid item xs={9} height="inherit" overflow="scroll">
                {dialogId ? (
                    <DialogExtended dialogId={dialogId} />
                ) : (
                    <Stack height="inherit" justifyContent="center" alignItems="center">
                        <Typography>Выберите диалог</Typography>
                    </Stack>
                )}
            </Grid>
        </Grid>
    );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async context => {
    const { token } = context.req.cookies;

    const dialogs = (await queryDialogs(token)) ?? fakeDialogs;

    return {
        props: {
            dialogs,
        },
    };
});

export default MessagesPage;
