import { Divider } from "@mui/material";
import { ClientOrder, OrderType } from "../../../types/order";
import ClientOfferCard from "../../offer/Client";
import GenericOrderCard from "./Generic";

interface ClientOrderCardProps {
    order: ClientOrder;
    orderType: OrderType;
}

const ClientOrderCard = ({ order }: ClientOrderCardProps) => {
    return (
        <GenericOrderCard order={order}>
            {Boolean(order.offers?.length) && (
                <>
                    <Divider>Отклики</Divider>
                    {order.offers.map(offer => (
                        <ClientOfferCard key={offer.id} offer={offer} onPick={() => {}} />
                    ))}
                </>
            )}
        </GenericOrderCard>
    );
};

export default ClientOrderCard;
