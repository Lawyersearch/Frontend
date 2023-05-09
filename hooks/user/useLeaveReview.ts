import { LeaveReviewRequest, useLeaveReviewMutation } from "../../services/review";
import { Review } from "../../types/user";
import { LeaveReviewModalData } from "../../ui/modal/user/LeaveReview";
import useConfirmModal from "../useConfirmModal";

const useLeaveReview = (userId: string, cb: (review: Review) => void) =>
    useConfirmModal<LeaveReviewModalData, Review, LeaveReviewRequest>({
        onSuccessMessage: "Отзыв успешно оставлен",
        modalDataToMutation: (review: LeaveReviewModalData) => ({ ...review, userId }),
        useMutation: useLeaveReviewMutation,
        onResponse: cb,
    });

export default useLeaveReview;
