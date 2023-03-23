import Cookie from "js-cookie";
import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const getData = <T>(response: { data: T }) => response.data;

const setAuthHeader = (headers: Headers) => {
    const token = Cookie.get("token");

    if (token) {
        headers.set("Authorization", "Bearer " + token);
    }

    return headers;
};

export const authenticatedBaseQuery = (baseUrl: string) =>
    fetchBaseQuery({
        baseUrl: `${process.env.BACK_SERVER_API}/${baseUrl}`,
        prepareHeaders: setAuthHeader,
        credentials: "include",
    });
