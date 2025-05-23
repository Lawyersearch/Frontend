import React, { useCallback, useState } from "react";
import { Button, Divider, Stack } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import CommentIcon from "@mui/icons-material/Comment";
import { Order, OrderType, PerformerOrder } from "../../../types/order";
import GenericOrderCard from "./Generic";
import { useAppSelector } from "../../../hooks/redux/useTypedRedux";
import { MyOffer } from "../../../types/offer";
import { shouldShowRespond, shouldShowMarkCompleted, shouldShowTakeInWork } from "../../../utils/order";
import RespondOrderModal from "../../../ui/modal/order/Respond";
import useRespondOrder from "../../../hooks/order/useRespondOrder";
import PerformerOfferCard from "../../offer/Performer";
import { useMarkOrderCompleted } from "../../../hooks/order/useMarkOrder";
import { ChangeStatusCompletedModal } from "../../../ui/modal/order/ChangeStatus";
import useAcceptOrder from "../../../hooks/order/useAcceptOrder";

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

    const accept = useAcceptOrder(order, onOrderUpdate);
    const [showRespondModal, openRespondModal, closeRespondModal, respond] = useRespondOrder(order, onRespond);
    const [showCompletedModal, openCompletedModal, closeCompletedModal, complete] = useMarkOrderCompleted(
        order.id,
        onOrderUpdate,
    );

    const showRespond = shouldShowRespond(user, order);
    const showTakeInWork = shouldShowTakeInWork(user, order);
    const showMarkComplete = shouldShowMarkCompleted(user, order);
    const showControls = [showRespond, showTakeInWork, showMarkComplete].some(Boolean);

    return (
        <GenericOrderCard order={order} user={user}>
            {Boolean(order.myOffer) && (
                <>
                    <Divider>Мой отклик</Divider>
                    <PerformerOfferCard order={order} onEdit={onEdit} onRecall={onRecall} />
                </>
            )}
            {showControls && (
                <>
                    <Divider />
                    <Stack spacing={2} direction="row" flexWrap="wrap" alignItems="center" justifyContent="end" p={1}>
                        {showMarkComplete && (
                            <Button variant="contained" startIcon={<DoneAllIcon />} onClick={openCompletedModal}>
                                Отметить как выполненный
                            </Button>
                        )}
                        {showRespond && (
                            <Button variant="contained" startIcon={<CommentIcon />} onClick={openRespondModal}>
                                Оставить отклик
                            </Button>
                        )}
                        {showTakeInWork && (
                            <Button variant="contained" startIcon={<CheckIcon />} onClick={accept}>
                                Взять в работу
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
