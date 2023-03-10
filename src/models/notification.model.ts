const mongoose = require('mongoose')
const { Schema } = mongoose
import { ObjectId } from "mongodb";

const notificationSchema = new Schema({
    userId: {
        type: ObjectId,
        ref: 'user'
    },
    link: {
        type: String,
        require: true
    },
    sender: {
        type: ObjectId,
        ref: 'user'
    },
    isRead: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        require: true
    }
}, {
    timestamps: {
        createdAt: 'created_at', // Use `created_at` to store the created date
        updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    }
})

export const NotificationModel = mongoose.model('notification', notificationSchema)