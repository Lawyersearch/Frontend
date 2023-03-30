import { MutationDefinition } from "@reduxjs/toolkit/dist/query/react";
import { UseMutation } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import {
    useMarkOrderClosedMutation,
    useMarkOrderCompletedMutation,
    useMarkOrderDismissMutation,
    useMarkOrderDisputMutation,
} from "../../services/order";
import { mkAuthenticatedBaseQuery } from "../../services/utils";
import { Order } from "../../types/order";
import useConfirmModal from "../useConfirmModal";

type useMarkOrderMutation = UseMutation<
    MutationDefinition<string, ReturnType<typeof mkAuthenticatedBaseQuery>, string, Order>
>;

const mkMarkOrderHook = (useMutation: useMarkOrderMutation) => (orderId: string, onResponse: (order: Order) => void) =>
    useConfirmModal<void, Order, string>({
        useMutation,
        onResponse,
        onSuccessMessage: "Статус заказа успешно изменен",
        modalDataToMutation: () => orderId,
    });

export const useMarkOrderCompleted = mkMarkOrderHook(useMarkOrderCompletedMutation);
export const useMarkOrderClosed = mkMarkOrderHook(useMarkOrderClosedMutation);
export const useMarkOrderDismiss = mkMarkOrderHook(useMarkOrderDismissMutation);
export const useMarkOrderDisput = mkMarkOrderHook(useMarkOrderDisputMutation);
