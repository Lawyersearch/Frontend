import { MyOffer, Offer } from "./offer";

export interface Order {
    id: string;
    creatorName: string;
    avatar: string;
    userId: string;
    performerId?: string;
    offerId?: string;
    offerCount?: number;
    price?: number;
    description: string;
    title: string;
    categoryId?: number;
    createdDate: string;
    orderStatus: OrderStatus;
    orderType: OrderType;
    performerName?: string; // Client
    performerAvatar?: string; // Client
}

export type PerformerOrder = Order & { offerCount: number; myOffer: MyOffer | null };

export type ClientOrder = Order & { offers: Offer[] };

export enum OrderType {
    PRIVATE = 0,
    PUBLIC = 1,
}

export enum OrderStatus {
    OPEN = 0,
    IN_WORK = 1,
    COMPLETED = 2,
    CLOSED = 3,
    DISMISS = 4,
    DISPUT = 5,
}
