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
    inReplyToComment: {
        type: String,
        default: null
    },
    inReplyToUser: {
        type: String,
        default: null
    }
}, { id: false }, {
    timestamps: {
        createdAt: 'created_at', // Use `created_at` to store the created date
        updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    }
}, { collection: "comment" }
);


commentSchema.set('toObject', { virtuals: true });
commentSchema.set('toJSON', { virtuals: true });
commentSchema.virtual("user", {
    ref: "user",
    localField: "userId",
    foreignField: "_id",
    justOne: true

});

export const CommentModel = mongoose.model('comment', commentSchema)

