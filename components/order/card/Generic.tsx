import React from "react";
import { Card, Stack, Box, Typography, SxProps } from "@mui/material";
import fnsFormat from "date-fns/format";
import { ClientOrder, Order, OrderStatus, OrderType } from "../../../types/order";
import ProfileLink from "../../../ui/components/ProfileLink";
import { mkUserName } from "../../../utils/user";
import { User } from "../../../types/user";

interface GenericOrderCardProps {
    order: Order | ClientOrder;
    user: User | null;
    children?: React.ReactNode | React.ReactNode[];
    sx?: SxProps;
}

const statusReverseMap: { [key: number]: string } = {
    [OrderStatus.OPEN]: "Открыт",
    [OrderStatus.IN_WORK]: "В работе",
    [OrderStatus.COMPLETED]: "Выполнен исполнителем",
    [OrderStatus.CLOSED]: "Закрыт",
    [OrderStatus.DISMISS]: "Отменен",
    [OrderStatus.DISPUT]: "Оспаривается",
};

const typeReverseMap: { [key: number]: string } = {
    [OrderType.PRIVATE]: "Приватный",
    [OrderType.PUBLIC]: "Публичный",
};

const GenericOrderCard = ({ order, user, sx, children, ...rest }: GenericOrderCardProps) => (
    <Card sx={{ borderRadius: 4, ...sx }} {...rest}>
        <Stack p={2} spacing={3}>
            <Stack direction="row" justifyContent="space-between">
                <Typography variant="h3">{order.title}</Typography>
                <Typography>{fnsFormat(new Date(order.createdDate), "dd.MM.yyyy")}</Typography>
            </Stack>
            <Box display="grid" gridTemplateColumns="auto 1fr" gap={2}>
                <Typography fontWeight={550}>Заказчик</Typography>
                <ProfileLink
                    id={order.userId}
                    userName={order.userId === user?.id ? mkUserName(user, { middleName: false }) : order.creatorName}
                    src={order.userId === user?.id ? user?.avatar : order.avatar}
                />
                {order.performerId && (
                    <>
                        <Typography fontWeight={550}>Исполнитель</Typography>
                        <ProfileLink
                            id={order.performerId}
                            userName={
                                order.performerId === user?.id
                                    ? mkUserName(user, { middleName: false })
                                    : order.performerName!
                            }
                            src={order.performerId === user?.id ? user!.avatar : order.performerAvatar!}
                        />
                    </>
                )}
                <Typography fontWeight={550}>Статус</Typography>
                <Typography fontWeight={600}>{statusReverseMap[order.orderStatus]}</Typography>
                <Typography fontWeight={550}>Тип</Typography>
                <Typography fontWeight={600}>{typeReverseMap[order.orderType]}</Typography>
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
