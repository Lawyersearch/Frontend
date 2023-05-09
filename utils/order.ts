import { ClientOrder, Order, OrderStatus, OrderType, PerformerOrder } from "../types/order";
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

export const shouldShowOffers = (user: User | null, order: ClientOrder) =>
    isUserClient(user?.role) &&
    isOrderOpen(order.orderStatus) &&
    order.userId === user?.id &&
    Boolean(order.offers?.length);
export const shouldShowActiveOffer = (user: User | null, order: ClientOrder) =>
    isUserClient(user?.role) &&
    Boolean(order.performerId) &&
    Boolean(order.offers.find(offer => offer.userId === order.performerId));
export const shouldShowEditOrder = (user: User | null, order: ClientOrder) =>
    isUserClient(user?.role) &&
    isOrderOpen(order.orderStatus) &&
    order.userId === user?.id &&
    Boolean(!order.offers?.length);

export const shouldShowMarkCompleted = (user: User | null, order: PerformerOrder) =>
    isUserPerformer(user?.role) && isOrderInWork(order.orderStatus) && order.performerId === user?.id;
export const shouldShowMarkClosed = (user: User | null, order: ClientOrder) =>
    isUserClient(user?.role) && isOrderCompleted(order.orderStatus) && order.userId === user?.id;
export const shouldShowMarkDismiss = (user: User | null, order: ClientOrder) =>
    isUserClient(user?.role) && isOrderOpen(order.orderStatus) && order.userId === user?.id;
export const shouldShowMarkDisput = (user: User | null, order: ClientOrder) =>
    isUserClient(user?.role) && isOrderCompleted(order.orderStatus) && order.userId === user?.id;
export const shouldShowLeaveReview = (user: User | null, order: ClientOrder) =>
    isUserClient(user?.role) && isOrderClosed(order.orderStatus);
