const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookmarkSchema = new Schema({
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
    }
}, {
    timestamps: {
        createdAt: 'created_at', // Use `created_at` to store the created date
        updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    }
}, { collection: "bookmark" }
);

export const BookmarkModel = mongoose.model('bookmark', bookmarkSchema)


