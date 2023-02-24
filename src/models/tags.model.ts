
const mongoose = require('mongoose');
const { Schema } = mongoose;

const tagSchema = new Schema({
    title: {
        type: String,
        required: true,
    }
}, {
    timestamps: {
        createdAt: 'created_at', // Use `created_at` to store the created date
        updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    }
}, {
    collection: "tag"
});

export const TagModel = mongoose.model('tag', tagSchema)

module.exports = TagModel