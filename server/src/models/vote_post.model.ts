const mongoose = require('mongoose')
const { Schema } = mongoose;

const vote_postSchema = new Schema({
    userId: {
        type: Schema.ObjectId,
        require: true,
        ref: "user"
    },
    postId: {
        type: Schema.ObjectId,
        require: true,

        ref: "post"
    },
    type: {
        type: String,
        enum: ["Upvote", "Downvote"],
        require: true,
    }

}, {
    timestamps: {
        createdAt: 'created_at', // Use `created_at` to store the created date
        updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    }
}, {
    collection: "vote_post"
});

export const VotePostModel = mongoose.model('vote_post', vote_postSchema)
