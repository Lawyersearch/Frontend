import { createApi } from "@reduxjs/toolkit/query/react";
import { MyOffer, Offer } from "../types/offer";
import { getData, mkAuthenticatedBaseQuery } from "./utils";

export const offerApi = createApi({
    reducerPath: "offerApi",
    baseQuery: mkAuthenticatedBaseQuery("offer"),
    endpoints: builder => ({
        getResponds: builder.query<Offer[], string>({
            query: orderId => ({
                url: `orderId/${orderId}`,
                method: "GET",
            }),
            transformResponse: getData<Offer[]>,
        }),
        respondOrder: builder.mutation<Offer, { orderId: string; message: string; price: number }>({
            query: ({ orderId, message, price }) => ({
                url: `/orderId/${orderId}`,
                method: "POST",
                body: { message, price },
            }),
            transformResponse: getData<Offer>,
        }),
        removeRespond: builder.mutation<void, string>({
            query: offerId => ({
                url: `/offerId/${offerId}`,
                method: "DELETE",
            }),
        }),
        updateRespond: builder.mutation<MyOffer, MyOffer>({
            query: ({ id, ...rest }) => ({
                url: `/offerId/${id}`,
                method: "PUT",
                body: rest,
            }),
            transformResponse: getData<Offer>,
        }),
    }),
});

export const { useGetRespondsQuery, useRespondOrderMutation, useRemoveRespondMutation, useUpdateRespondMutation } =
    offerApi;
