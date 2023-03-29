import React, { useCallback, useRef, useState } from "react";
import { Button, Divider, Stack } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import { OrderType, PerformerOrder } from "../../../types/order";
import GenericOrderCard from "./Generic";
import { useAppSelector } from "../../../hooks/redux/useTypedRedux";
import { MyOffer } from "../../../types/offer";
import { shouldShowRespond, isOrderPrivate } from "../../../utils/order";
import RespondOrderModal from "../../../ui/modal/order/Respond";
import useRespondOrder from "../../../hooks/order/useRespondOrder";
import PerformerOfferCard from "../../offer/Performer";

interface PerformerOrderCardProps {
    order: PerformerOrder;
    orderType: OrderType;
}

const PerformerOrderCard = ({ order: orderProp, orderType }: PerformerOrderCardProps) => {
    const user = useAppSelector(store => store.user.self);
    const [order, setOrder] = useState(orderProp);
    const myOfferRef = useRef(order.myOffer);

    const onRecall = useCallback(() => {
        setOrder(order => {
            myOfferRef.current = null;
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
                myOfferRef.current = myOffer;
                const newOfferCount = (order.offerCount ?? 0) + 1;
                const newOrder = { ...order, myOffer, offerCount: newOfferCount };

                return newOrder;
            });
        },
        [setOrder],
    );

    const [showRespondModal, openRespondModal, closeRespondModal, respond] = useRespondOrder(order, onRespond);

    return (
        <GenericOrderCard order={order} sx={isOrderPrivate(orderType) && !order.myOffer ? { opacity: 0.4 } : {}}>
            {order.myOffer ? (
                <>
                    <Divider>Мой отклик</Divider>
                    <PerformerOfferCard offer={order.myOffer} onEdit={onEdit} onRecall={onRecall} />
                </>
            ) : (
                <>
                    <Divider />
                    <Stack spacing={2} direction="row" flexWrap="wrap" alignItems="center" justifyContent="end" p={1}>
                        {shouldShowRespond(user, order) && (
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
        </GenericOrderCard>
    );
};

export default PerformerOrderCard;
