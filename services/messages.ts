import { createApi } from "@reduxjs/toolkit/query/react";
import { Education } from "../types/user";
import { mkAuthenticatedBaseQuery, getData } from "./utils";

export const messageApi = createApi({
    reducerPath: "messageApi",
    baseQuery: mkAuthenticatedBaseQuery("message"),
    endpoints: builder => ({
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

export const { useAddEducationMutation, useRemoveEducationMutation, useUpdateEducationMutation } = messageApi;
