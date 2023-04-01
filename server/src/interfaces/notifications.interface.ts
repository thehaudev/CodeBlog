import { ObjectId } from "mongoose";

export default interface Notification {
    _id: ObjectId
    sender: ObjectId
    link: string
    recipient: ObjectId
    isRead: boolean
    content: string
    createdAt: Date
    updatedAt: Date
}