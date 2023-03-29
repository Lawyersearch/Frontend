export interface Offer {
    id: string;
    userId: string;
    orderId: string;
    price: number;
    message: string;
    rating: number;
    avatar: string;
    creatorName: string;
}

export type MyOffer = Omit<Offer, "creatorName" | "avatar">;
