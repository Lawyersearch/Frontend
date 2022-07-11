import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../types/user";

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.BACK_SERVER}/search`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", "Bearer " + token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUsersById: builder.query<User[], number>({
      query: (id: number) => ({
        url: `/id/${id}`,
      }),
      transformResponse: (data: { value: User[] }) => data.value,
    }),
  }),
});

export const { useLazyGetUsersByIdQuery } = searchApi;
