import { OrderPost, useCreateOrderMutation } from "../../services/order";
import { ClientOrder } from "../../types/order";
import useConfirmModal from "../useConfirmModal";

const useCreateOrder = (onCreate: (order: ClientOrder) => void) =>
    useConfirmModal<OrderPost, ClientOrder, OrderPost>({
        onSuccessMessage: "Заказ успешно изменен",
        modalDataToMutation: (modalData: OrderPost) => modalData,
        useMutation: useCreateOrderMutation,
        onResponse: onCreate,
    });

export default useCreateOrder;
