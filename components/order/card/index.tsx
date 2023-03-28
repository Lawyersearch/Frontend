import { useAppSelector } from "../../../hooks/redux/useTypedRedux";
import { Order, PerformerOrder, ClientOrder } from "../../../types/order";
import { isUserPerformer } from "../../../utils/user";
import ClientOrderCard from "./Client";
import PerformerOrderCard from "./Performer";

interface OrderCardProps<T extends Order = Order> {
    order: T;
}

const OrderCard = ({ order }: OrderCardProps) => {
    const isPerformer = useAppSelector(state => isUserPerformer(state.user?.self?.role));

    return isPerformer ? (
        <PerformerOrderCard order={order as PerformerOrder} />
    ) : (
        <ClientOrderCard order={order as ClientOrder} />
    );
};

export default OrderCard;
