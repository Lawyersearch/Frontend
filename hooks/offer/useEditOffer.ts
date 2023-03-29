import { MutableRefObject } from "react";
import { useUpdateRespondMutation } from "../../services/offer";
import { MyOffer, Offer } from "../../types/offer";
import useConfirmModal from "../useConfirmModal";

type ModalData = Pick<Offer, "message" | "price">;

const useEditOffer = (myOffer: MyOffer | null, onResponse: (offer: MyOffer) => void) =>
    useConfirmModal<ModalData, MyOffer, MyOffer>({
        onSuccessMessage: "Отклик успешно изменен",
        modalDataToMutation: modalData => ({ ...myOffer!, ...modalData }),
        useMutation: useUpdateRespondMutation,
        onResponse,
    });

export default useEditOffer;
