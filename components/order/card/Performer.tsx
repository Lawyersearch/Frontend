import React, { useCallback, useRef, useState } from "react";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import CommentIcon from "@mui/icons-material/Comment";
import { PerformerOrder } from "../../../types/order";
import GenericOrderCard from "./Generic";
import { useAppSelector } from "../../../hooks/redux/useTypedRedux";
import { Offer } from "../../../types/offer";
import { shouldShowRespond, shouldShowCancellOffer, shouldShowEditOffer } from "../../../utils/order";
import DeleteConfirmModal from "../../../ui/modal/DeleteConfirm";
import RespondOrderModal from "../../../ui/modal/order/Respond";
import useRecallOffer from "../../../hooks/offer/useRecallOffer";
import useRespondOrder from "../../../hooks/order/useRespondOrder";
import useEditOffer from "../../../hooks/offer/useEditOffer";
import EditOfferModal from "../../../ui/modal/offer/Edit";

interface PerformerOrderCardProps {
    order: PerformerOrder;
}

const PerformerOrderCard = ({ order: orderProp }: PerformerOrderCardProps) => {
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
        (newOffer: Offer) => {
            setOrder(order => ({ ...order, myOffer: newOffer }));
        },
        [setOrder],
    );

    const onRespond = useCallback(
        (myOffer: Offer) => {
            setOrder(order => {
                myOfferRef.current = myOffer;
                const newOfferCount = (order.offerCount ?? 0) + 1;
                const newOrder = { ...order, myOffer, offerCount: newOfferCount };

                return newOrder;
            });
        },
        [setOrder],
    );

    const [showRecallModal, openRecallModal, closeRecallModal, recall] = useRecallOffer(myOfferRef, onRecall);
    const [showEditModal, openEditModal, closeEditModal, edit] = useEditOffer(myOfferRef, onEdit);
    const [showRespondModal, openRespondModal, closeRespondModal, respond] = useRespondOrder(order, onRespond);

    const showCancellOffer = shouldShowCancellOffer(user, order);
    const showEditOffer = shouldShowEditOffer(user, order);
    const showRespond = shouldShowRespond(user, order);
    const showControls = [showRespond, showCancellOffer].some(Boolean);

    return (
        <GenericOrderCard order={order} showControls={showControls} sx={!order.myOffer ? {opacity: 0.4} : {}}>
            {showEditOffer && (
                <Button variant="contained" startIcon={<EditIcon />} color="info" onClick={openEditModal}>
                    Изменить отклик
                </Button>
            )}
            {showCancellOffer && (
                <Button variant="contained" color="error" startIcon={<ClearIcon />} onClick={openRecallModal}>
                    Отменить заявку
                </Button>
            )}
            {showRespond && (
                <Button variant="contained" startIcon={<CommentIcon />} onClick={openRespondModal}>
                    Оставить отклик
                </Button>
            )}
            <RespondOrderModal
                startingPrice={order.price}
                open={showRespondModal}
                onClose={closeRespondModal}
                respond={respond}
            />
            <EditOfferModal offer={order.myOffer} open={showEditModal} onClose={closeEditModal} edit={edit} />
            <DeleteConfirmModal
                show={showRecallModal}
                setHide={closeRecallModal}
                onConfirm={recall}
                confirmString="Отменить отклик?"
            />
        </GenericOrderCard>
    );
};

export default PerformerOrderCard;
