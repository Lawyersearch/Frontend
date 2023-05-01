import { GetServerSideProps } from "next";
import { wrapper } from "../store";
import { useMemo, useState } from "react";
import { Dialog } from "../types/message";
import { queryDialogs } from "../utils/query";
import { Grid, Stack, Typography } from "@mui/material";
import DialogCard from "../components/message/gialogCard";
import DialogExtended from "../components/message/gialogExtended";

interface MessagesPageProps {
    dialogs: Dialog[];
}

const MessagesPage = ({ dialogs }: MessagesPageProps) => {
    const [dialogId, setDialogId] = useState<string | null>(null);
    const currentDialog = useMemo(() => dialogs?.find(dialog => dialog.id === dialogId) || null, [dialogId]);

    return (
        <Grid container height="calc(100vh - 72px)">
            <Grid
                item
                xs={3}
                height="inherit"
                overflow="scroll"
                sx={{ border: "1px solid", borderColor: "primary.main" }}
            >
                <Stack>
                    {dialogs.map(dialog => (
                        <DialogCard key={dialog.id} dialog={dialog} onDialogClick={setDialogId} />
                    ))}
                </Stack>
            </Grid>
            <Grid
                item
                xs={9}
                height="inherit"
                sx={{ border: "1px solid", borderColor: "primary.main", borderLeft: "none" }}
            >
                {currentDialog ? (
                    <DialogExtended dialog={currentDialog} />
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
    const { self } = store.getState().user;

    if (!token || !self) {
        context.res.setHeader("Set-Cookie", "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT");
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    const dialogs = await queryDialogs(token);

    dialogs.sort((a, b) => {
        if (a.isClosed !== b.isClosed) {
            return +a.isClosed - +b.isClosed;
        }

        return a.createdDate < b.createdDate ? -1 : 1;
    });

    return {
        props: {
            dialogs,
        },
    };
});

export default MessagesPage;
