const mongoose = require('mongoose')
const { Schema } = mongoose;

const vote_commentSchema = new Schema({
    userId: {
        type: Schema.ObjectId,
        require: true,
        ref: "user"
    },
    commentId: {
        type: Schema.ObjectId,
        require: true,
        ref: "comment"
    },
    type: {
        type: String,
        require: true,
    }

}, {
    timestamps: {
        createdAt: 'created_at', // Use `created_at` to store the created date
        updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    }
}, {
    collection: "vote_comment"
});

export const VoteCommentModel = mongoose.model('vote_comment', vote_commentSchema)
