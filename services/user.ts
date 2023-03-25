import Cookie from "js-cookie";
import { createApi } from "@reduxjs/toolkit/query/react";
import { User } from "../types/user";
import { WebResponse } from "../types/webResponseBody";
import { mkAuthenticatedBaseQuery, getData, mkExtractRehydrationInfo } from "./utils";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: mkAuthenticatedBaseQuery("user"),
    extractRehydrationInfo: mkExtractRehydrationInfo("userApi"),
    tagTypes: ["User"],
    endpoints: builder => ({
        getUser: builder.query<User, string>({
            query: (userId: string) => ({
                url: `/id/${userId}`,
            }),
            transformResponse: getData<User>,
            providesTags: (result, error, userId) => [{ type: "User", id: userId }],
        }),
        getUsersByCategorId: builder.query<User[], number>({
            query: (id: number) => ({
                url: `/search/id/${id}`,
            }),
            transformResponse: getData<User[]>,
        }),
        uploadAvatar: builder.mutation<WebResponse<null>, FormData>({
            query: (data: FormData) => ({
                url: "/uploadAvatar",
                method: "POST",
                credentials: "include",
                body: data,
            }),
        }),
    }),
});

export const {
    useGetUserQuery,
    useLazyGetUsersByCategorIdQuery,
    util: { getRunningQueriesThunk },
} = userApi;
