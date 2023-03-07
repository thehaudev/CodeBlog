import { Schema } from "mongoose";


export interface Follow_User {
    _id: Schema.Types.ObjectId
    userId: Schema.Types.ObjectId
    follower: Schema.Types.ObjectId
}