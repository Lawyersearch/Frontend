import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { createApi } from "@reduxjs/toolkit/query/react";
import { ClientOrder, Order, OrderStatus } from "../types/order";
import { getData, mkAuthenticatedBaseQuery } from "./utils";

export type OrderPost = Pick<Order, "performerId" | "price" | "description" | "title" | "categoryId">;

enum OrderStatusRequest {
    COMPLETE = 3,
    DISMISS = 4,
    DISPUT = 5
};

const mkChangeOrderStatusMutation = (
    builder: EndpointBuilder<ReturnType<typeof mkAuthenticatedBaseQuery>, string, "orderApi">,
    orderStatus: OrderStatusRequest,
) =>
    builder.mutation<Order, string>({
        query: (orderId: string) => ({
            url: `/changeStatus/${orderId}`,
            method: "POST",
            params: { orderStatus },
        }),
        transformResponse: getData<Order>,
    });

export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: mkAuthenticatedBaseQuery("order"),
    endpoints: builder => ({
        createOrder: builder.mutation<ClientOrder, OrderPost>({
            query: (order: OrderPost) => ({
                url: "/",
                method: "POST",
                body: order as unknown as typeof builder,
            }),
            transformResponse: getData<ClientOrder>,
        }),
        updateOrder: builder.mutation<ClientOrder, ClientOrder>({
            query: (order: ClientOrder) => ({
                url: "/",
                method: "PUT",
                body: order,
                params: { orderId: order.id },
            }),
            transformResponse: getData<ClientOrder>,
        }),

        markOrderCompleted: mkChangeOrderStatusMutation(builder, OrderStatusRequest.COMPLETE),
        markOrderClosed: mkChangeOrderStatusMutation(builder, OrderStatusRequest.COMPLETE),
        markOrderDismiss: mkChangeOrderStatusMutation(builder, OrderStatusRequest.DISMISS),
        markOrderDisput: mkChangeOrderStatusMutation(builder, OrderStatusRequest.DISPUT),

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
    useUpdateOrderMutation,
    useMarkOrderCompletedMutation,
    useMarkOrderClosedMutation,
    useMarkOrderDismissMutation,
    useMarkOrderDisputMutation,
    useAcceptOrderMutation,
    useChooseOrderPerformerMutation,
} = orderApi;
