import { useChooseOrderPerformerMutation } from "../../services/order";
import { Offer } from "../../types/offer";
import { Order } from "../../types/order";
import useConfirmModal from "../useConfirmModal";

const useChooseOrderPerformer = (onPick?: (newOrder: Order) => void) =>
    useConfirmModal<Offer, Order, { orderId: string; offerId: string }>({
        onSuccessMessage: "Исполнитель успешно выбран",
        modalDataToMutation: offer => ({ orderId: offer.orderId, offerId: offer.id }),
        useMutation: useChooseOrderPerformerMutation,
        onResponse: onPick ? onPick : () => {},
    });

export default useChooseOrderPerformer;
