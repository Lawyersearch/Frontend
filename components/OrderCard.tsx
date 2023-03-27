import { Card, Stack, Box, Typography, Divider, Button } from "@mui/material";
import fnsFormat from "date-fns/format";
import _identity from "lodash/identity";
import { useCallback, useEffect, useRef, useState } from "react";
import useRecallOrderOffer from "../hooks/order/useRecallOrderOffer";
import useRespondOrder from "../hooks/order/useRespondOrder";
import { useAppSelector } from "../hooks/redux/useTypedRedux";
import { useChangeOrderStatusMutation } from "../services/order";
import { Offer } from "../types/offer";
import { Order, PrivateOrder, PublicOrder } from "../types/order";
import ConfirmModal from "../ui/modal/ConfirmModal";
import RespondOrderModal from "../ui/modal/RespondOrderModal";
import ProfileLink from "../ui/ProfileLink";
import { shouldShowCancellOffer, shouldShowCancellOrder, shouldShowRespond } from "../utils/order";

interface OrderCardProps {
    order: Order | PrivateOrder | PublicOrder;
}

const OrderCard = ({ order: orderProp }: OrderCardProps) => {
    const user = useAppSelector(store => store.user.self);
    const [order, setOrder] = useState(orderProp);
    const myOfferRef = useRef((order as PublicOrder).myOfferId!);

    useEffect(() => {
        myOfferRef.current = (order as PublicOrder).myOfferId!;
    }, [order]);

    const onRespond = useCallback(
        ({ id }: Offer) => {
            setOrder(order => {
                const newOfferCount = ((order as PublicOrder).offerCount ?? 0) + 1;
                const newOrder: PublicOrder = { ...order, myOfferId: id, offerCount: newOfferCount };

                return newOrder;
            });
        },
        [setOrder],
    );

    const onRecall = useCallback(() => {
        setOrder(order => {
            const newOfferCount = ((order as PublicOrder).offerCount ?? 1) - 1;
            const newOrder: PublicOrder = { ...order, myOfferId: null, offerCount: newOfferCount };

            return newOrder;
        });
    }, [setOrder]);

    const [showRespondModal, openRespondModal, closeRespondModal, respond] = useRespondOrder(order, onRespond);
    const [showRecallModal, openRecallModal, closeRecallModal, recall] = useRecallOrderOffer(myOfferRef, onRecall);
    const [changeStatus, { data: updatedStatusOrder, isSuccess: isChangeStatusSuccess }] =
        useChangeOrderStatusMutation();

    const showRespond = shouldShowRespond(user, order);
    const showCancellOffer = shouldShowCancellOffer(user, order);
    const showCancellOrder = shouldShowCancellOrder(user, order);
    const showControls = [showRespond, showCancellOffer, showCancellOrder].some(_identity);

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
                    {Boolean((order as PublicOrder).offerCount) && (
                        <>
                            <Typography fontWeight={550}>Количество откликов</Typography>
                            <Typography>{(order as PublicOrder).offerCount}</Typography>
                        </>
                    )}
                    {order.description && (
                        <>
                            <Typography fontWeight={550}>Описание</Typography>
                            <Typography>{order.description}</Typography>
                        </>
                    )}
                    {order.price && (
                        <>
                            <Typography fontWeight={550}>Цена</Typography>
                            <Typography fontWeight={600}>{order.price} ₽</Typography>
                        </>
                    )}
                </Box>
            </Stack>
            {showControls && (
                <>
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
                        {showRespond && (
                            <Button variant="contained" onClick={openRespondModal}>
                                Оставить отклик
                            </Button>
                        )}
                        {showCancellOrder && (
                            <Button variant="contained" color="error">
                                Отменить заказ
                            </Button>
                        )}
                        {showCancellOffer && (
                            <Button variant="contained" color="error" onClick={openRecallModal}>
                                Отменить заявку
                            </Button>
                        )}
                    </Stack>
                </>
            )}
            <RespondOrderModal
                startingPrice={order.price}
                open={showRespondModal}
                onClose={closeRespondModal}
                respond={respond}
            />
            <ConfirmModal
                show={showRecallModal}
                setHide={closeRecallModal}
                onConfirm={recall}
                confirmString="Отменить отклик?"
            />
        </Card>
    );
};

export default OrderCard;
