import { Order, OrderStatus, OrderType, PerformerOrder } from "../types/order";
import { User } from "../types/user";
import { isUserClient, isUserPerformer } from "./user";

export const isOrderOpen = (status: OrderStatus) => status === OrderStatus.OPEN;
export const isOrderInWork = (status: OrderStatus) => status === OrderStatus.IN_WORK;
export const isOrderCompleted = (status: OrderStatus) => status === OrderStatus.COMPLETED;
export const isOrderClosed = (status: OrderStatus) => status === OrderStatus.CLOSED;
export const isOrderDismissed = (status: OrderStatus) => status === OrderStatus.DISMISS;
export const isOrderDisputed = (status: OrderStatus) => status === OrderStatus.DISPUT;

export const isOrderPrivate = (order: OrderType) => order === OrderType.PRIVATE;
export const isOrderPublic = (order: OrderType) => order === OrderType.PUBLIC;

export const shouldShowRespond = (user: User | null, order: Order) =>
    isUserPerformer(user?.role) && isOrderOpen(order.orderStatus) && !(order as PerformerOrder).myOffer;
export const shouldShowCancellOffer = (user: User | null, order: Order) =>
    isUserPerformer(user?.role) && isOrderOpen(order.orderStatus) && (order as PerformerOrder).myOffer;
export const shouldShowEditOffer = (user: User | null, order: Order) =>
    isUserPerformer(user?.role) && isOrderOpen(order.orderStatus) && (order as PerformerOrder).myOffer;
export const shouldShowCancellOrder = (user: User | null, order: Order) =>
    isUserClient(user?.role) && isOrderOpen(order.orderStatus) && order.userId === user?.id;
