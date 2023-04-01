
const mongoose = require('mongoose');
const { Schema } = mongoose;

const imageSchema = new Schema({
    userId: {
        type: String, require: true
    },
    name: {
        type: String, require: true
    },
    basename: {
        type: String, require: true
    },
    path: {
        type: String, require: true
    }
}, {
    timestamps: {
        createdAt: 'created_at', // Use `created_at` to store the created date
        updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    }
}, {
    collection: "image"
});

export const ImageModel = mongoose.model('image', imageSchema)
