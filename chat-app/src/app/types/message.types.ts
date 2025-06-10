export interface MessageSend {
    senderId: string;
    receiverId: string;
    content: string;
}

export interface MessageModel {
    id: string;
    senderName:string;
    senderEmail: string;
    receiverEmail: string;
    content: string;
    timestamp: Date;
}

export interface GroupMessageModel {
    groupId: string;
    id: string;
    senderName:string;
    senderEmail: string;
    content: string;
    timestamp: Date;
}
