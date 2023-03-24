import { Card, Stack, Box, Typography, Divider, Button } from "@mui/material";
import fnsFormat from "date-fns/format";
import { useGetSelfQuery } from "../services/user";
import { Order } from "../types/order";
import ProfileLink from "../ui/ProfileLink";
import { isOrderOpen } from "../utils/order";
import { isUserPerformer } from "../utils/user";

const OrderCard = (order: Order) => {
    const { data: user, isSuccess } = useGetSelfQuery(undefined);

    const shouldShowRespond = isUserPerformer(user?.role) && isOrderOpen(order.orderStatus);

    return (
        <Card sx={{ borderRadius: 4 }}>
            <Stack p={2} spacing={3}>
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="h3">{order.title}</Typography>
                    <Typography>{fnsFormat(new Date(order.createdDate), "dd.MM.yyyy")}</Typography>
                </Stack>
                <Box display="grid" gridTemplateColumns="auto 1fr" gap={2}>
                    <Typography fontWeight={550}>Автор</Typography>
                    <ProfileLink id={order.userId} userName={order.creatorName} src={order.avatar} />
                    <Typography fontWeight={550}>Описание</Typography>
                    <Typography>{order.description}</Typography>
                    <Typography fontWeight={550}>Цена</Typography>
                    <Typography fontWeight={600}>{order.price} ₽</Typography>
                </Box>
            </Stack>
            <Divider />
            <Stack
                direction="row"
                flexWrap="wrap"
                alignItems="center"
                justifyContent="end"
                bgcolor="background.default"
                px={3}
                py={1}
            >
                <Button variant="contained">Откликнуться</Button>
            </Stack>
        </Card>
    );
};

export default OrderCard;
