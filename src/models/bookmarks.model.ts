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
}, { id: false }, {
    timestamps: {
        createdAt: 'created_at', // Use `created_at` to store the created date
        updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    }
}, { collection: "bookmark" }
);
bookmarkSchema.set('toObject', { virtuals: true });
bookmarkSchema.set('toJSON', { virtuals: true });
bookmarkSchema.virtual("user", {
    ref: "user",
    localField: "userId",
    foreignField: "_id",
    justOne: true

});

export const BookmarkModel = mongoose.model('bookmark', bookmarkSchema)


