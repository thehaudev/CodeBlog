const mongoose = require('mongoose')
const { Schema } = mongoose
import { ObjectId } from "mongodb";

const notificationSchema = new Schema({
    sender: {
        type: ObjectId,
        require: true,
        ref: 'user'
    },
    link: {
        type: String,
        require: true
    },
    recipient: {
        type: ObjectId,
        require: true,
        ref: 'user'
    },
    content: {
        type: String,
        require: true
    },
    isRead: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

export const NotificationModel = mongoose.model('notification', notificationSchema)