import Cookie from "js-cookie";
import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { AnyAction } from "redux";
import { HYDRATE } from "next-redux-wrapper";

export const getData = <T>(response: { data: T }) => response.data;

const setAuthHeader = (headers: Headers) => {
    const token = Cookie.get("token");

    if (token) {
        headers.set("Authorization", "Bearer " + token);
    }

    return headers;
};

export const mkAuthenticatedBaseQuery = (baseUrl: string) =>
    fetchBaseQuery({
        baseUrl: `${process.env.BACK_SERVER_API}/${baseUrl}`,
        prepareHeaders: setAuthHeader,
        credentials: "include",
    });

export const mkExtractRehydrationInfo = (reducerPath: string) => (action: AnyAction) => {
    if (action.type === HYDRATE) {
        return action.payload[reducerPath];
    }
};
