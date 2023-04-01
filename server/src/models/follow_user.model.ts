const mongoose = require('mongoose')
const { Schema } = mongoose

const followUserSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    follower: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
}, {
    timestamps: {
        createdAt: 'created_at', // Use `created_at` to store the created date
        updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    }
}, { collection: 'follow_user' })

export const FollowUserModel = mongoose.model('follow_user', followUserSchema)
