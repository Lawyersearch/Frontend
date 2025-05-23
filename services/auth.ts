import { createApi } from "@reduxjs/toolkit/query/react";
import { UserCredentials } from "../types/userCredentials";
import { WebResponse } from "../types/webResponseBody";
import { mkAuthenticatedBaseQuery } from "./utils";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: mkAuthenticatedBaseQuery("auth"),
    endpoints: builder => ({
        loginFromCreds: builder.mutation<WebResponse<string>, UserCredentials>({
            query: credentials => ({
                url: "/login",
                method: "POST",
                body: credentials,
            }),
        }),
        loginFromVerification: builder.mutation<WebResponse<string>, string>({
            query: token => ({
                url: "/mailverify",
                method: "POST",
                body: token,
                headers: {
                    "Content-Type": "application/json",
                },
            }),
        }),
        register: builder.mutation<WebResponse<null>, UserCredentials>({
            query: credentials => ({
                url: "/registration",
                method: "POST",
                body: credentials,
            }),
        }),
        restore: builder.mutation<WebResponse<string>, UserCredentials>({
            query: restoreCredentials => ({
                url: "/restore",
                method: "POST",
                body: restoreCredentials,
            }),
        }),
        forgetPassword: builder.mutation<WebResponse<null>, UserCredentials>({
            query: userCredentials => ({
                url: "/forget",
                method: "POST",
                body: userCredentials,
            }),
        }),
    }),
});

export const {
    useLoginFromCredsMutation,
    useLoginFromVerificationMutation,
    useRegisterMutation,
    useRestoreMutation,
    useForgetPasswordMutation,
} = authApi;
