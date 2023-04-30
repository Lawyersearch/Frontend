import { UpdateUserGeneralRequest, useUpdateUserGeneralMutation } from "../../services/user";
import { User } from "../../types/user";
import useConfirmModal from "../useConfirmModal";

const useUpdateRole = (cb: (response: User) => void) =>
    useConfirmModal<UpdateUserGeneralRequest, User>({
        onSuccessMessage: "Информация о пользователе успешно обновлена",
        modalDataToMutation: (modalData: UpdateUserGeneralRequest) => modalData,
        useMutation: useUpdateUserGeneralMutation,
        onResponse: cb,
    });

export default useUpdateRole;
