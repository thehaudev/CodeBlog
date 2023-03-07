
const mongoose = require('mongoose');
const { Schema } = mongoose;

const post_tagSchema = new Schema({
    postId: {
        type: String,
        required: true,
        ref: 'post'
    },
    tagId: {
        type: String,
        required: true,
        ref: 'tag'
    }
}, {
    timestamps: {
        createdAt: 'created_at', // Use `created_at` to store the created date
        updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    }
}, {
    collection: "post_tag"
});

export const PostTagModel = mongoose.model('post_tag', post_tagSchema)

