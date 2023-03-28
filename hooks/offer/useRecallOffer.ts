import { MutableRefObject } from "react";
import { useRemoveRespondMutation } from "../../services/offer";
import { Offer } from "../../types/offer";
import useConfirmModal from "../useConfirmModal";

const useRecallOffer = (myOfferRef: MutableRefObject<Offer | null>, onResponse: () => void) =>
    useConfirmModal<void, void, string>({
        onSuccessMessage: "Отклик успешно отозван",
        modalDataToMutation: () => myOfferRef.current?.id!,
        useMutation: useRemoveRespondMutation,
        onResponse,
    });

export default useRecallOffer;
