import { MutationDefinition } from "@reduxjs/toolkit/dist/query/react";
import { UseMutation } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { useCallback, useEffect } from "react";
import { mkAuthenticatedBaseQuery } from "../services/utils";
import { pushSnack } from "../store/reducers/uiSlice";
import { useAppDispatch } from "./redux/useTypedRedux";
import useBoolean from "./useBoolean";

interface UseConfirmModalArgs<ModalData, MutationResult, MutationData> {
    onSuccessMessage?: string;
    modalDataToMutation: (modalData: ModalData) => MutationData;
    useMutation: UseMutation<
        MutationDefinition<MutationData, ReturnType<typeof mkAuthenticatedBaseQuery>, string, MutationResult>
    >;
    onResponse?: (mutationResult: MutationResult) => void;
}

const useConfirmModal = <ModalData, MutationResult = void, MutationData = ModalData>({
    onSuccessMessage,
    onResponse,
    modalDataToMutation,
    useMutation,
}: UseConfirmModalArgs<ModalData, MutationResult, MutationData>): [
    boolean,
    () => void,
    () => void,
    (data: ModalData) => void,
] => {
    const dispatch = useAppDispatch();
    const [trigger, { data: responseData, isSuccess }] = useMutation();
    const [showConfirmModal, openConfirmModal, closeConfirmModal] = useBoolean(false);

    useEffect(() => {
        if (isSuccess) {
            onSuccessMessage && dispatch(pushSnack({ variant: "success", message: onSuccessMessage }));
            onResponse && onResponse(responseData!);
        }
    }, [isSuccess]);

    const confirm = useCallback(
        (modalData: ModalData) => {
            trigger(modalDataToMutation(modalData));
            closeConfirmModal();
        },
        [trigger],
    );

    return [showConfirmModal, openConfirmModal, closeConfirmModal, confirm];
};

export default useConfirmModal;
