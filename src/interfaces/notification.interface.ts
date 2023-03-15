import { ObjectId } from "mongodb";
export interface Notification {
    _id: ObjectId;
    userId: ObjectId;
    link: string;
    recipient: ObjectId;
    content: string;
    isRead: Boolean;
}