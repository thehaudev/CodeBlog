import { ObjectId } from "mongoose";

export default interface Notification {
    _id: ObjectId
    userId: ObjectId
    link: string
    sender: ObjectId
    isRead: boolean
    title: string
}