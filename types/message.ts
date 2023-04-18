export interface MessageResponse {
    id: string;
    senderId: string;
    text: string;
    dateTime: string;
}

export interface MessageExtended extends MessageResponse {
    senderName: string;
    myId: string;
    avatar: string;
}

export interface Dialog {
    id: string;
    userId: string;
    memberId: string;
    createdDate: string;
    orderId: string;
    isClosed: boolean;
    senderName: string;
    avatar: string;
}
