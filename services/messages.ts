import { createApi } from "@reduxjs/toolkit/query/react";
import { MessageResponse } from "../types/message";
import { mkAuthenticatedBaseQuery, getData } from "./utils";

export const messageApi = createApi({
    reducerPath: "messageApi",
    baseQuery: mkAuthenticatedBaseQuery("message"),
    endpoints: builder => ({
        getMessages: builder.query<MessageResponse[], string>({
            query: dialogId => ({
                url: `/${dialogId}`,
                method: "GET",
            }),
            transformResponse: getData<MessageResponse[]>,
        })
    }),
});

export const { useGetMessagesQuery } = messageApi;
