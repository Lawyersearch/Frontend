export interface Order {
    id: string,
    creatorName: string,
    avatar: string,
    userId: string,
    performerId?: string,
    offerId?: string,
    price: number,
    description: string,
    title: string,
    categoryId: number,
    createdDate: string,
    orderStatus: number,
    orderType: OrderType
}

export enum OrderType {
    PRIVATE = 0,
    PUBLIC = 1
}
