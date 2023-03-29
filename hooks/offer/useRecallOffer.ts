import { useRemoveRespondMutation } from "../../services/offer";
import { MyOffer } from "../../types/offer";
import useConfirmModal from "../useConfirmModal";

const useRecallOffer = (myOffer: MyOffer | null, onResponse: () => void) =>
    useConfirmModal<void, void, string>({
        onSuccessMessage: "Отклик успешно отозван",
        modalDataToMutation: () => myOffer?.id!,
        useMutation: useRemoveRespondMutation,
        onResponse,
    });

export default useRecallOffer;
