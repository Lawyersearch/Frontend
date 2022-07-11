import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { WorkExpirience } from "../types/user";

export const workExperienceApi = createApi({
  reducerPath: "workExperienceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.BACK_SERVER}/workExpirience`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", "Bearer " + token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    addWorkExperience: builder.mutation<
      WorkExpirience,
      Partial<WorkExpirience>
    >({
      query: (workExp: WorkExpirience) => ({
        url: "/add",
        method: "POST",
        body: workExp,
      }),
      transformResponse: (data: { value: WorkExpirience }) => data.value,
    }),
    removeWorkExperience: builder.mutation<void, string>({
      query: (workExpId: string) => ({
        url: `/delete/${workExpId}`,
        method: "DELETE",
      }),
    }),
    updateWorkExperience: builder.mutation<
      WorkExpirience,
      Partial<WorkExpirience>
    >({
      query: (workExp: WorkExpirience) => ({
        url: "/update",
        method: "PUT",
        body: workExp,
      }),
      transformResponse: (data: { value: WorkExpirience }) => data.value,
    }),
  }),
});

export const {
  useAddWorkExperienceMutation,
  useRemoveWorkExperienceMutation,
  useUpdateWorkExperienceMutation,
} = workExperienceApi;
