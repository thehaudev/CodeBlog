
const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    userId: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    title: {
        type: String,
        required: true,
        min: 15
    },
    content: {
        type: String,
        required: true,
        min: 15
    },
    status: {
        type: Boolean,
        default: true,
    },
    views: { type: Number, default: 0 },
    votes: { type: Number, default: 0 }
}, {
    timestamps: {
        createdAt: 'created_at', // Use `created_at` to store the created date
        updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    }
}, {
    collection: "post"
});

export const PostModel = mongoose.model('post', postSchema)

