import React from "react";
import { Card, Stack, Box, Typography, SxProps } from "@mui/material";
import fnsFormat from "date-fns/format";
import { Order } from "../../../types/order";
import ProfileLink from "../../../ui/components/ProfileLink";

interface GenericOrderCardProps {
    order: Order;
    children?: React.ReactNode | React.ReactNode[];
    sx?: SxProps;
}

const GenericOrderCard = ({ order, sx, children, ...rest }: GenericOrderCardProps) => (
    <Card sx={{ borderRadius: 4, ...sx }} {...rest}>
        <Stack p={2} spacing={3}>
            <Stack direction="row" justifyContent="space-between">
                <Typography variant="h3">{order.title}</Typography>
                <Typography>{fnsFormat(new Date(order.createdDate), "dd.MM.yyyy")}</Typography>
            </Stack>
            <Box display="grid" gridTemplateColumns="auto 1fr" gap={2}>
                <Typography fontWeight={550}>Заказчик</Typography>
                <ProfileLink id={order.userId} userName={order.creatorName} src={order.avatar} />
                {Boolean(order.offerCount) && (
                    <>
                        <Typography fontWeight={550}>Отклики</Typography>
                        <Typography>{order.offerCount}</Typography>
                    </>
                )}
                {Boolean(order.description) && (
                    <>
                        <Typography fontWeight={550}>Описание</Typography>
                        <Typography>{order.description}</Typography>
                    </>
                )}
                {Boolean(order.price) && (
                    <>
                        <Typography fontWeight={550}>Цена</Typography>
                        <Typography fontWeight={600}>{order.price} ₽</Typography>
                    </>
                )}
            </Box>
        </Stack>
        {children}
    </Card>
);

export default GenericOrderCard;
