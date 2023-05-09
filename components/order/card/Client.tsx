import { Box, Button, Divider, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ReviewsIcon from "@mui/icons-material/Reviews";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useAppSelector } from "../../../hooks/redux/useTypedRedux";
import { ClientOrder, Order, OrderType } from "../../../types/order";
import {
    shouldShowActiveOffer,
    shouldShowEditOrder,
    shouldShowLeaveReview,
    shouldShowMarkClosed,
    shouldShowMarkDismiss,
    shouldShowMarkDisput,
    shouldShowOffers,
} from "../../../utils/order";
import ClientOfferCard from "../../offer/Client";
import GenericOrderCard from "./Generic";
import useUpdateOrder from "../../../hooks/order/useUpdateOrder";
import { useCallback, useState } from "react";
import UpdateOrderModal from "../../../ui/modal/order/Update";
import { useMarkOrderClosed, useMarkOrderDismiss, useMarkOrderDisput } from "../../../hooks/order/useMarkOrder";
import {
    ChangeStatusClosedModal,
    ChangeStatusDismissModal,
    ChangeStatusDisputModal,
} from "../../../ui/modal/order/ChangeStatus";
import NextLink from "../../../ui/components/NextLink";
import { mkUserProfileLink } from "../../../ui/utils";
import GenericOfferCard from "../../offer/Generic";

interface ClientOrderCardProps {
    order: ClientOrder;
    orderType: OrderType;
}

const ClientOrderCard = ({ order: orderProp }: ClientOrderCardProps) => {
    const user = useAppSelector(state => state.user.self);
    const [order, setOrder] = useState(orderProp);

    const onOrderUpdate = useCallback(
        (newOrder: Order | ClientOrder) => {
            setOrder(order => ({ ...order, ...newOrder }));
        },
        [setOrder],
    );

    const [showUpdateModal, openUpdateModal, closeUpdateModal, update] = useUpdateOrder(order, onOrderUpdate);
    const [showDismissModal, openDismissModal, closeDismissModal, dismiss] = useMarkOrderDismiss(
        order.id,
        onOrderUpdate,
    );
    const [showDisputModal, openDisputModal, closeDisputModal, disput] = useMarkOrderDisput(order.id, onOrderUpdate);
    const [showClosedModal, openClosedModal, closeClosedModal, close] = useMarkOrderClosed(order.id, onOrderUpdate);

    const showOffers = shouldShowOffers(user, order);
    const showActiveOffer = shouldShowActiveOffer(user, order);
    const showUpdateOrder = shouldShowEditOrder(user, order);
    const showMarkDismiss = shouldShowMarkDismiss(user, order);
    const showMarkDisput = shouldShowMarkDisput(user, order);
    const showMarkClosed = shouldShowMarkClosed(user, order);
    const showLeaveReview = shouldShowLeaveReview(user, order);
    const showControls = [showUpdateOrder, showMarkClosed, showMarkDismiss, showMarkDisput, showLeaveReview].some(
        Boolean,
    );

    return (
        <GenericOrderCard order={order} user={user}>
            {showControls && (
                <>
                    <Divider>Действия с заказом</Divider>
                    <Stack spacing={2} direction="row" flexWrap="wrap" alignItems="center" justifyContent="end" p={1}>
                        {showUpdateOrder && (
                            <Button variant="contained" color="info" startIcon={<EditIcon />} onClick={openUpdateModal}>
                                Изменить
                            </Button>
                        )}
                        {showMarkDismiss && (
                            <Button
                                variant="contained"
                                color="error"
                                startIcon={<ClearIcon />}
                                onClick={openDismissModal}
                            >
                                Отменить
                            </Button>
                        )}
                        {showMarkDisput && (
                            <Button
                                variant="contained"
                                color="error"
                                startIcon={<ErrorOutlineIcon />}
                                onClick={openDisputModal}
                            >
                                Оспорить
                            </Button>
                        )}
                        {showMarkClosed && (
                            <Button variant="contained" startIcon={<DoneAllIcon />} onClick={openClosedModal}>
                                Закрыть
                            </Button>
                        )}
                        {showLeaveReview && (
                            <NextLink href={mkUserProfileLink(order.performerId) + "#reviews"}>
                                <Button variant="contained" startIcon={<ReviewsIcon />}>
                                    Оставить отзыв
                                </Button>
                            </NextLink>
                        )}
                    </Stack>
                </>
            )}
            {showActiveOffer && (
                <>
                    <Divider>Выбранный отклик</Divider>
                    <Box p={2}>
                        <GenericOfferCard offer={order.offers.find(offer => offer.userId === order.performerId)!} />
                    </Box>
                </>
            )}
            {showOffers && (
                <>
                    <Divider>Отклики</Divider>
                    {order.offers.map(offer => (
                        <Box key={offer.id} mt={1}>
                            <ClientOfferCard offer={offer} onPick={onOrderUpdate} />
                            <Divider />
                        </Box>
                    ))}
                </>
            )}
            <UpdateOrderModal order={order} open={showUpdateModal} onClose={closeUpdateModal} update={update} />
            <ChangeStatusDismissModal open={showDismissModal} onClose={closeDismissModal} change={dismiss} />
            <ChangeStatusDisputModal open={showDisputModal} onClose={closeDisputModal} change={disput} />
            <ChangeStatusClosedModal open={showClosedModal} onClose={closeClosedModal} change={close} />
        </GenericOrderCard>
    );
};

export default ClientOrderCard;
