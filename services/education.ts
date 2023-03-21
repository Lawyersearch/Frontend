import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Education } from "../types/user";
import { getData } from "./utils";

export const educationApi = createApi({
  reducerPath: "educationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.BACK_SERVER_API}/education`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", "Bearer " + token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    addEducation: builder.mutation<Education, Partial<Education>>({
      query: (education: Partial<Education>) => ({
        url: "/",
        method: "POST",
        body: education,
      }),
      transformResponse: getData<Education>,
    }),
    removeEducation: builder.mutation<void, string>({
      query: (educationId: string) => ({
        url: `/${educationId}`,
        method: "DELETE",
      }),
    }),
    updateEducation: builder.mutation<Education, Partial<Education>>({
      query: (education: Partial<Education>) => ({
        url: `/${education.id}`,
        method: "PUT",
        body: education,
      }),
      transformResponse: getData<Education>,
    }),
  }),
});

export const {
  useAddEducationMutation,
  useRemoveEducationMutation,
  useUpdateEducationMutation,
} = educationApi;
