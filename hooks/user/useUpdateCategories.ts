import { UpdateUserCategoriesResponse, useUpdateUserCategoriesMutation } from "../../services/user";
import useConfirmModal from "../useConfirmModal";

const useUpdateCategories = (cb: (updatedInfo: UpdateUserCategoriesResponse) => void) =>
    useConfirmModal<number[], UpdateUserCategoriesResponse>({
        onSuccessMessage: "Информация о пользователе успешно обновлена",
        modalDataToMutation: (modalData: number[]) => modalData,
        useMutation: useUpdateUserCategoriesMutation,
        onResponse: cb,
    });

export default useUpdateCategories;
