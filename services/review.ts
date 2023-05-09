import { createApi } from "@reduxjs/toolkit/query/react";
import { Review } from "../types/user";
import { mkAuthenticatedBaseQuery, getData, mkExtractRehydrationInfo } from "./utils";

export type LeaveReviewRequest = { rating: number; comment: string; userId: string };

export const reviewApi = createApi({
    reducerPath: "reviewApi",
    baseQuery: mkAuthenticatedBaseQuery("review"),
    extractRehydrationInfo: mkExtractRehydrationInfo("reviewApi"),
    endpoints: builder => ({
        leaveReview: builder.mutation<Review, LeaveReviewRequest>({
            query: data => ({
                url: `/${data.userId}`,
                method: "POST",
                credentials: "include",
                body: { rating: data.rating, comment: data.comment },
            }),
            transformResponse: getData<Review>,
        }),
    }),
});

export const { useLeaveReviewMutation } = reviewApi;
