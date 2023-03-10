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
    role: {
        type: String,
        default: 0 //0 user 1 admin
    },
    display_name: {
        type: String,
        required: true,
        max: 255
    },
    bio: {
        type: String,
        enum: ['Male', 'Female'],
    },
    avatar: {
        type: String,
        default: "https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg"
    },
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

UserModel.update({ email: 'admin@gmail.com' }, { role: 1 })