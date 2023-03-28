import { MutableRefObject } from "react";
import { useUpdateRespondMutation } from "../../services/offer";
import { Offer } from "../../types/offer";
import useConfirmModal from "../useConfirmModal";

type ModalData = Pick<Offer, "message" | "price">;

const useEditOffer = (myOfferRef: MutableRefObject<Offer | null>, onResponse: (offer: Offer) => void) =>
    useConfirmModal<ModalData, Offer, Offer>({
        onSuccessMessage: "Отклик успешно изменен",
        modalDataToMutation: modalData => ({ ...myOfferRef.current!, ...modalData }),
        useMutation: useUpdateRespondMutation,
        onResponse,
    });

export default useEditOffer;
