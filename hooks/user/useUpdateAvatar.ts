import { UpdateUserAvatarResponse, useUpdateAvatarMutation } from "../../services/user";
import useConfirmModal from "../useConfirmModal";

const useUpdateAvatar = (cb: (updatedInfo: UpdateUserAvatarResponse) => void) =>
    useConfirmModal<File, UpdateUserAvatarResponse>({
        onSuccessMessage: "Фотография успешно обновлена",
        modalDataToMutation: (avatar: File) => avatar,
        useMutation: useUpdateAvatarMutation,
        onResponse: cb,
    });

export default useUpdateAvatar;
