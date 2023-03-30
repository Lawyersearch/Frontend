import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { createApi } from "@reduxjs/toolkit/query/react";
import { ClientOrder, Order, OrderStatus } from "../types/order";
import { getData, mkAuthenticatedBaseQuery } from "./utils";

type OrderPost = Pick<Order, "performerId" | "price" | "description" | "title" | "categoryId">;

const mkChangeOrderStatusMutation = (
    builder: EndpointBuilder<ReturnType<typeof mkAuthenticatedBaseQuery>, string, "orderApi">,
    orderStatus: OrderStatus,
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
        createOrder: builder.mutation<Order, OrderPost>({
            query: (order: OrderPost) => ({
                url: "/",
                method: "POST",
                body: order as unknown as typeof builder,
            }),
            transformResponse: getData<Order>,
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

        markOrderCompleted: mkChangeOrderStatusMutation(builder, OrderStatus.COMPLETED),
        markOrderClosed: mkChangeOrderStatusMutation(builder, OrderStatus.CLOSED),
        markOrderDismiss: mkChangeOrderStatusMutation(builder, OrderStatus.DISMISS),
        markOrderDisput: mkChangeOrderStatusMutation(builder, OrderStatus.DISPUT),

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
