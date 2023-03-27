import { useRemoveRespondMutation } from "../../services/offer";
import useConfirmModal from "../useConfirmModal";

const useRecallOrderOffer = (getMyOfferId: { current: string }, onResponse: () => void) =>
    useConfirmModal<void, void, string>({
        onSuccessMessage: "Отклик успешно отозван",
        modalDataToMutation: () => getMyOfferId.current,
        useMutation: useRemoveRespondMutation,
        onResponse,
    });

export default useRecallOrderOffer;
