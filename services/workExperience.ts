import { createApi } from "@reduxjs/toolkit/query/react";
import { WorkExpirience } from "../types/user";
import { authenticatedBaseQuery, getData } from "./utils";

export const workExperienceApi = createApi({
    reducerPath: "workExperienceApi",
    baseQuery: authenticatedBaseQuery("workExpirience"),
    endpoints: builder => ({
        addWorkExperience: builder.mutation<WorkExpirience, Partial<WorkExpirience>>({
            query: (workExp: WorkExpirience) => ({
                url: "/",
                method: "POST",
                body: workExp,
            }),
            transformResponse: getData<WorkExpirience>,
        }),
        removeWorkExperience: builder.mutation<void, string>({
            query: (workExpId: string) => ({
                url: `/${workExpId}`,
                method: "DELETE",
            }),
        }),
        updateWorkExperience: builder.mutation<WorkExpirience, Partial<WorkExpirience>>({
            query: (workExp: WorkExpirience) => ({
                url: `/${workExp.id}`,
                method: "PUT",
                body: workExp,
            }),
            transformResponse: getData<WorkExpirience>,
        }),
    }),
});

export const { useAddWorkExperienceMutation, useRemoveWorkExperienceMutation, useUpdateWorkExperienceMutation } =
    workExperienceApi;
