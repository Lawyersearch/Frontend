import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserCredentials } from "../types/userCredentials";
import { WebResponse } from "../types/webResponseBody";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.BACK_SERVER}/auth`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", "Bearer " + token);
      }
      return headers;
    },
    credentials: "include",
  }),
  endpoints: (builder) => ({
    loginFromCreds: builder.mutation<WebResponse<string>, UserCredentials>({
      query: (credentials: UserCredentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    loginFromVerification: builder.mutation<WebResponse<string>, string>({
      query: (token: string) => ({
        url: "/mailverify",
        method: "POST",
        body: token,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    register: builder.mutation<WebResponse<null>, UserCredentials>({
      query: (credentials: UserCredentials) => ({
        url: "/register",
        method: "POST",
        body: credentials,
      }),
    }),
    restore: builder.mutation<WebResponse<string>, UserCredentials>({
      query: (restoreCredentials: UserCredentials) => ({
        url: "/restore",
        method: "POST",
        body: restoreCredentials,
      }),
    }),
    forgetPassword: builder.mutation<WebResponse<null>, UserCredentials>({
      query: (userCredentials: UserCredentials) => ({
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
