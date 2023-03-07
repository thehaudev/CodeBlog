const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
    userId: {
        type: String,
        required: true,
        min: 6,
        max: 255,
        ref: 'user'
    },
    postId: {
        type: String,
        required: true,
        min: 6,
        max: 255,
        ref: 'post'

    },
    content: {
        type: String,
        required: true,
        min: 15
    },
    status: { type: Boolean, default: true },
    votes: { type: Number, default: 0 },
}, {
    timestamps: {
        createdAt: 'created_at', // Use `created_at` to store the created date
        updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    }
}, { collection: "comment" }
);


export const CommentModel = mongoose.model('comment', commentSchema)

