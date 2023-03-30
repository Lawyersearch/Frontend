import React, { useCallback, useState } from "react";
import { Button, Divider, Stack } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CommentIcon from "@mui/icons-material/Comment";
import { Order, OrderType, PerformerOrder } from "../../../types/order";
import GenericOrderCard from "./Generic";
import { useAppSelector } from "../../../hooks/redux/useTypedRedux";
import { MyOffer } from "../../../types/offer";
import { shouldShowRespond, isOrderPrivate, shouldShowMarkCompleted } from "../../../utils/order";
import RespondOrderModal from "../../../ui/modal/order/Respond";
import useRespondOrder from "../../../hooks/order/useRespondOrder";
import PerformerOfferCard from "../../offer/Performer";
import { useMarkOrderCompleted } from "../../../hooks/order/useMarkOrder";
import { ChangeStatusCompletedModal } from "../../../ui/modal/order/ChangeStatus";

interface PerformerOrderCardProps {
    order: PerformerOrder;
    orderType: OrderType;
}

const PerformerOrderCard = ({ order: orderProp, orderType }: PerformerOrderCardProps) => {
    const user = useAppSelector(store => store.user.self);
    const [order, setOrder] = useState(orderProp);

    const onOrderUpdate = useCallback(
        (newOrder: Order) => {
            setOrder(order => ({ ...order, ...newOrder }));
        },
        [setOrder],
    );

    const onRecall = useCallback(() => {
        setOrder(order => {
            const newOfferCount = (order.offerCount ?? 1) - 1;
            const newOrder = { ...order, myOffer: null, offerCount: newOfferCount };

            return newOrder;
        });
    }, [setOrder]);

    const onEdit = useCallback(
        (newOffer: MyOffer) => {
            setOrder(order => ({ ...order, myOffer: newOffer }));
        },
        [setOrder],
    );

    const onRespond = useCallback(
        (myOffer: MyOffer) => {
            setOrder(order => {
                const newOfferCount = (order.offerCount ?? 0) + 1;
                const newOrder = { ...order, myOffer, offerCount: newOfferCount };

                return newOrder;
            });
        },
        [setOrder],
    );

    const [showRespondModal, openRespondModal, closeRespondModal, respond] = useRespondOrder(order, onRespond);
    const [showCompletedModal, openCompletedModal, closeCompletedModal, complete] = useMarkOrderCompleted(
        order.id,
        onOrderUpdate,
    );

    const showRespond = shouldShowRespond(user, order);
    const showMarkComplete = shouldShowMarkCompleted(user, order);
    const showControls = [showRespond, showMarkComplete].some(Boolean);

    return (
        <GenericOrderCard order={order} sx={isOrderPrivate(orderType) && !order.myOffer ? { opacity: 0.4 } : {}}>
            {Boolean(order.myOffer) && (
                <>
                    <Divider>Мой отклик</Divider>
                    <PerformerOfferCard offer={order.myOffer!} onEdit={onEdit} onRecall={onRecall} />
                </>
            )}
            {showControls && (
                <>
                    <Divider />
                    <Stack spacing={2} direction="row" flexWrap="wrap" alignItems="center" justifyContent="end" p={1}>
                        {showMarkComplete && (
                            <Button variant="contained" startIcon={<CheckIcon />} onClick={openCompletedModal}>
                                Отметить как выполненный
                            </Button>
                        )}
                        {showRespond && (
                            <Button variant="contained" startIcon={<CommentIcon />} onClick={openRespondModal}>
                                Оставить отклик
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
            <ChangeStatusCompletedModal open={showCompletedModal} onClose={closeCompletedModal} change={complete} />
        </GenericOrderCard>
    );
};

export default PerformerOrderCard;
