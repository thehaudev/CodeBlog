const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    display_name: {
        type: String,
        required: true,
        max: 255
    },
    bio: String,
    avatar: String,
    location: String,
    about: String
},
    {
        toObject: {
            transform: function (doc: any, ret: any) { },
        },
        toJSON: {
            transform: function (doc: any, ret: any) {
                delete ret.password
            },
        },
    }, {
    timestamps: {
        createdAt: 'created_at', // Use `created_at` to store the created date
        updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    }
}, {
    collection: "user"
});

export const UserModel = mongoose.model('user', userSchema)
