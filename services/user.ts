import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../types/user";
import { WebResponse } from "../types/webResponseBody";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.BACK_SERVER}/user`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", "Bearer " + token);
      }
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUser: builder.query<User, string>({
      query: (userId: string) => ({
        url: `/getUser/${userId}`,
      }),
      transformResponse: (data: { value: User }) => data.value,
      providesTags: (result, error, userId) => [{ type: "User", id: userId }],
    }),
    getSelf: builder.query<User, void>({
      query: () => ({
        url: "/getMySelf",
      }),
      transformResponse: (data: { value: User }) => data.value,
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

export const { useGetUserQuery, useLazyGetSelfQuery, useGetSelfQuery } =
  userApi;
