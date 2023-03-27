import { useRespondOrderMutation } from "../../services/offer";
import { Offer } from "../../types/offer";
import { Order } from "../../types/order";
import useConfirmModal from "../useConfirmModal";

type ModalData = Pick<Offer, "message" | "price">;
type MutationData = ModalData & { orderId: string };

const useRespondOrder = ({ id: orderId }: Order, onResponse: (offer: Offer) => void) =>
    useConfirmModal<ModalData, Offer, MutationData>({
        onSuccessMessage: "Отклик успешно отправлен",
        modalDataToMutation: modalData => ({ ...modalData, orderId }),
        useMutation: useRespondOrderMutation,
        onResponse,
    });

export default useRespondOrder;
