import { createApi } from "@reduxjs/toolkit/query/react";
import { Order, OrderStatus } from "../types/order";
import { getData, mkAuthenticatedBaseQuery } from "./utils";

type OrderPost = Pick<Order, "performerId" | "price" | "description" | "title" | "categoryId">;

export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: mkAuthenticatedBaseQuery("order"),
    endpoints: builder => ({
        createOrder: builder.mutation<Order, OrderPost>({
            query: (order: OrderPost) => ({
                url: "/",
                method: "POST",
                body: order,
            }),
            transformResponse: getData<Order>,
        }),
        changeOrderStatus: builder.mutation<Order, { orderId: string; orderStatus: OrderStatus }>({
            query: ({ orderId, orderStatus }: { orderId: string; orderStatus: OrderStatus }) => ({
                url: `/changeStatus/${orderId}`,
                method: "POST",
                params: { orderStatus },
            }),
            transformResponse: getData<Order>,
        }),
        acceptOrder: builder.mutation<Order, string>({
            query: (orderId: string) => ({
                url: `/accept/${orderId}`,
                method: "POST",
            }),
            transformResponse: getData<Order>,
        }),
        chooseOrderPerformer: builder.mutation<Order, { orderId: string; offerId: string }>({
            query: ({ orderId, offerId }: { orderId: string; offerId: string }) => ({
                url: `/choose/${orderId}`,
                method: "POST",
                params: { offerId },
            }),
            transformResponse: getData<Order>,
        }),
    }),
});

export const {
    useCreateOrderMutation,
    useChangeOrderStatusMutation,
    useAcceptOrderMutation,
    useChooseOrderPerformerMutation,
} = orderApi;
