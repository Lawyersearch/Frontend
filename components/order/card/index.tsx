import { useAppSelector } from "../../../hooks/redux/useTypedRedux";
import { PerformerOrder, ClientOrder, OrderType } from "../../../types/order";
import { isUserPerformer } from "../../../utils/user";
import ClientOrderCard from "./Client";
import PerformerOrderCard from "./Performer";

interface OrderCardProps<T = PerformerOrder | ClientOrder> {
    order: T;
    orderType: OrderType;
}

const OrderCard = ({ order, orderType }: OrderCardProps) => {
    const isPerformer = useAppSelector(state => isUserPerformer(state.user?.self?.role));

    return isPerformer ? (
        <PerformerOrderCard order={order as PerformerOrder} orderType={orderType} />
    ) : (
        <ClientOrderCard order={order as ClientOrder} orderType={orderType} />
    );
};

export default OrderCard;
