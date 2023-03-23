export interface Order {
    id: string,
    userId: string,
    performerId?: string,
    offerId?: string,
    price: number,
    description: string,
    title: string,
    categoryId: number,
    createdDate: string,
    orderStatus: number,
    orderType: number
}
