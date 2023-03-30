import { useUpdateOrderMutation } from "../../services/order";
import { ClientOrder, Order } from "../../types/order";
import useConfirmModal from "../useConfirmModal";

type OrderData = Pick<Order, "price" | "description" | "title">;

const useUpdateOrder = (order: ClientOrder, onUpdate: (order: ClientOrder) => void) =>
    useConfirmModal<OrderData, ClientOrder, ClientOrder>({
        onSuccessMessage: "Заказ успешно изменен",
        modalDataToMutation: (modalData: OrderData) => ({ ...order, ...modalData }),
        useMutation: useUpdateOrderMutation,
        onResponse: onUpdate,
    });

export default useUpdateOrder;
