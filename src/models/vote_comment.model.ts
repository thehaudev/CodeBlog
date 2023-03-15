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
        enum: ['Upvote', 'Downvote'],
        require: true,
    }

}, {
    timestamps: true
}, {
    collection: "vote_comment"
});

export const VoteCommentModel = mongoose.model('vote_comment', vote_commentSchema)
