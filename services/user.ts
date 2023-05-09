import { createApi } from "@reduxjs/toolkit/query/react";
import { User, UserShort } from "../types/user";
import { mkAuthenticatedBaseQuery, getData, mkExtractRehydrationInfo } from "./utils";

export type UpdateUserGeneralRequest = Omit<UserShort, "id" | "avatar">;
export type UpdateUserCategoriesResponse = Pick<User, "id" | "categories">;
export type UpdateUserAvatarResponse = Pick<User, "id" | "avatar">;

const createAvatarFormData = (avatar: File) => {
    const formData = new FormData();
    formData.append("uploadedFile", avatar);

    return formData;
};

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: mkAuthenticatedBaseQuery("user"),
    extractRehydrationInfo: mkExtractRehydrationInfo("userApi"),
    tagTypes: ["User"],
    endpoints: builder => ({
        getUser: builder.query<User, string>({
            query: userId => ({
                url: `/id/${userId}`,
            }),
            transformResponse: getData<User>,
            providesTags: (result, error, userId) => [{ type: "User", id: userId }],
        }),
        getUsersByCategorId: builder.query<User[], number>({
            query: id => ({
                url: `/search/id/${id}`,
            }),
            transformResponse: getData<User[]>,
            providesTags: result => result?.map(user => ({ type: "User", id: user.id })) ?? [],
        }),
        updateUserGeneral: builder.mutation<User, UpdateUserGeneralRequest>({
            query: data => ({
                url: "/",
                method: "PUT",
                body: data,
            }),
            transformResponse: getData<User>,
        }),
        updateUserCategories: builder.mutation<UpdateUserCategoriesResponse, number[]>({
            query: categories => ({
                url: "/category",
                method: "PUT",
                body: { categories },
            }),
            transformResponse: getData<UpdateUserCategoriesResponse>,
        }),
        updateAvatar: builder.mutation<UpdateUserAvatarResponse, File>({
            query: avatar => ({
                url: "/avatar",
                method: "PUT",
                credentials: "include",
                body: createAvatarFormData(avatar),
            }),
            transformResponse: getData<UpdateUserAvatarResponse>,
        }),
    }),
});

export const {
    useGetUserQuery,
    useLazyGetUsersByCategorIdQuery,
    useUpdateUserGeneralMutation,
    useUpdateUserCategoriesMutation,
    useUpdateAvatarMutation,
    util: { getRunningQueriesThunk },
} = userApi;
