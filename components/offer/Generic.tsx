import React from "react";
import { Box, Typography } from "@mui/material";
import { Offer } from "../../types/offer";
import ProfileLink from "../../ui/components/ProfileLink";

interface GenericOfferCardProps {
    offer: Offer;
    children?: React.ReactNode | React.ReactNode[];
}

const GenericOfferCard = ({ offer, children }: GenericOfferCardProps) => (
    <>
        <Box display="grid" gridTemplateColumns="auto 1fr" gap={2}>
            <Typography fontWeight={550}>Исполнитель</Typography>
            <ProfileLink id={offer.userId} userName={offer.creatorName} src={offer.avatar} />
            <Typography fontWeight={550}>Сообщение</Typography>
            <Typography>{offer.message}</Typography>
            <Typography fontWeight={550}>Цена</Typography>
            <Typography fontWeight={600}>{offer.price} ₽</Typography>
        </Box>
        {children}
    </>
);

export default GenericOfferCard;
