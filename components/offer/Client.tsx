import { Box, Button, Stack } from "@mui/material";
import useChooseOrderPerformer from "../../hooks/order/useChooseOrderPerformer";
import { Offer } from "../../types/offer";
import { Order } from "../../types/order";
import ChoosePerformerModal from "../../ui/modal/order/ChoosePerformer";
import GenericOfferCard from "./Generic";

interface ClientOfferCardProps {
    offer: Offer;
    onPick: (newOrder: Order) => void;
}

const ClientOfferCard = ({ offer, onPick }: ClientOfferCardProps) => {
    const [showChooseModal, openChooseModal, closeChooseModal, choose] = useChooseOrderPerformer(onPick);

    return (
        <Box px={2} pt={1}>
            <GenericOfferCard offer={offer}>
                <Stack
                    spacing={2}
                    direction="row"
                    flexWrap="wrap"
                    alignItems="center"
                    justifyContent="end"
                    pb={2}
                    mt={-5}
                >
                    <Button variant="contained" onClick={openChooseModal}>
                        Принять отклик
                    </Button>
                </Stack>
            </GenericOfferCard>
            <ChoosePerformerModal offer={offer} open={showChooseModal} onClose={closeChooseModal} choose={choose} />
        </Box>
    );
};

export default ClientOfferCard;
