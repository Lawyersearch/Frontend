import { Order, OrderStatus } from "../types/order";
import { User } from "../types/user";
import { isUserClient, isUserPerformer } from "./user";

export const isOrderOpen = (status: OrderStatus) => status === OrderStatus.OPEN;
export const isOrderInWork = (status: OrderStatus) => status === OrderStatus.IN_WORK;
export const isOrderCompleted = (status: OrderStatus) => status === OrderStatus.COMPLETED;
export const isOrderClosed = (status: OrderStatus) => status === OrderStatus.CLOSED;
export const isOrderDismissed = (status: OrderStatus) => status === OrderStatus.DISMISS;
export const isOrderDisputed = (status: OrderStatus) => status === OrderStatus.DISPUT;

export const shouldShowRespond = (user: User | null, order: Order) =>
    isUserPerformer(user?.role) && isOrderOpen(order.orderStatus);
export const shouldShowCancell = (user: User | null, order: Order) =>
    isUserClient(user?.role) && isOrderOpen(order.orderStatus) && order.userId === user?.id;
