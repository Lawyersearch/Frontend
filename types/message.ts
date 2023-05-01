export interface MessageResponse {
    id: string;
    senderId: string;
    text: string;
    dateTime?: string;
}

export type MessageExtended = MessageResponse & { status?: "pending" | "error" };

/*export interface MessageExtended extends MessageResponse {
    senderName: string;
    myId: string;
    avatar: string;
}*/

export interface Dialog {
    id: string;
    userId: string;
    memberId: string;
    createdDate: string;
    orderId: string;
    isClosed: boolean;
    memberName: string;
    avatar: string;
}
