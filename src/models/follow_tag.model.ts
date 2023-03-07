const mongoose = require('mongoose')
const { Schema } = mongoose

const followTagSchema = new Schema({
    tagId: {
        type: Schema.Types.ObjectId,
        ref: "tag"
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
}, { collection: 'follow_tag' })

export const FollowTagModel = mongoose.model('follow_tag', followTagSchema)
