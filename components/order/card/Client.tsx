import { ClientOrder } from "../../../types/order";
import GenericOrderCard from "./Generic";

interface ClientOrderCardProps {
    order: ClientOrder;
}

const ClientOrderCard = ({ order }: ClientOrderCardProps) => {
    return (
        <GenericOrderCard order={order}>
            <></>
        </GenericOrderCard>
    );
};

export default ClientOrderCard;
