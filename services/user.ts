import { createApi } from "@reduxjs/toolkit/query/react";
import { User } from "../types/user";
import { WebResponse } from "../types/webResponseBody";
import { authenticatedBaseQuery, getData } from "./utils";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: authenticatedBaseQuery("user"),
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
        getSelf: builder.query<User, void>({
            query: () => ({
                url: "/myself",
            }),
            transformResponse: getData<User>,
            providesTags: (result, error) => [{ type: "User", id: result?.id }],
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

export const { useGetUserQuery, useLazyGetSelfQuery, useGetSelfQuery, useLazyGetUsersByCategorIdQuery } = userApi;
